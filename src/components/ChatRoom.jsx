import { useEffect, useState, useRef, useMemo } from "react";
import { Send } from "lucide-react";
import { fetchMessages } from "../services/chatService";
import { jwtDecode } from "jwt-decode";

export default function ChatRoom({ chatRoomId, token }) {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  /* ===============================
     تشخیص current user از JWT
  =============================== */
  const currentUserId = useMemo(() => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.user_id || decoded.id || null;
    } catch {
      return null;
    }
  }, [token]);

  /* ===============================
     لود پیام‌های قبلی (REST)
  =============================== */
  useEffect(() => {
    if (!chatRoomId || !token) return;

    const loadMessages = async () => {
      try {
        const data = await fetchMessages(chatRoomId);

        const normalized = data.map((msg) => ({
          id: msg.id,
          text: msg.text,
          created_at: msg.created_at,
          sender: {
            id: msg.sender.id,
            username: msg.sender.username,
          },
        }));

        setMessages(normalized);
      } catch (err) {
        console.error("خطا در دریافت پیام‌ها", err);
      }
    };

    loadMessages();
  }, [chatRoomId, token]);

  /* ===============================
     WebSocket
  =============================== */
  useEffect(() => {
    if (!token || !chatRoomId) return;

    const socket = new WebSocket(
      `ws://127.0.0.1:8000/chat/${chatRoomId}/?token=${token}`
    );

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type !== "chat_message") return;

        const normalized = {
          id: data.id,
          text: data.message,
          created_at: data.created_at,
          sender: {
            id: data.sender.id,
            username: data.sender.username,
          },
        };

        setMessages((prev) => [...prev, normalized]);
      } catch (e) {
        console.error("WS invalid data", e);
      }
    };

    socket.onclose = () => {
      console.log("⚠️ WebSocket disconnected");
    };

    setWs(socket);
    return () => socket.close();
  }, [chatRoomId, token]);

  /* ===============================
     اسکرول خودکار
  =============================== */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ===============================
     ارسال پیام
  =============================== */
  const sendMessage = () => {
    if (!ws || !input.trim()) return;

    ws.send(
      JSON.stringify({
        message: input,
      })
    );

    setInput("");
  };



  /* ===============================
     UI
  =============================== */
  return (
    <div className="flex flex-col h-full p-4 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">

      {/* لیست پیام‌ها */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg) => {
          const isMe = msg.sender.id === currentUserId;

          return (
            <div
              key={msg.id}
              className={`max-w-xs p-3 rounded-2xl shadow-md break-words
                ${isMe
                  ? "bg-indigo-500 text-white ml-auto"
                  : "bg-white text-gray-800 mr-auto"
                }`}
            >
              {!isMe && (
                <div className="text-xs text-gray-500 mb-1">
                  {msg.sender.username}
                </div>
              )}

              <div>{msg.text}</div>

              <div className="text-[10px] opacity-60 mt-1">
                {new Date(msg.created_at).toLocaleTimeString()}
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* فرم ارسال */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="پیام خود را بنویسید…"
          className="flex-1 rounded-2xl p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={sendMessage}
          className="rounded-2xl p-3 bg-indigo-500 text-white hover:bg-indigo-600 transition flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}