import { useEffect, useState, useRef } from "react";
import { Send } from "lucide-react";

export default function ChatRoom({ chatRoomId, token }) {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Scroll خودکار به آخر پیام‌ها
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!token) return;

    // ساخت WebSocket با JWT
    const socket = new WebSocket(
      `ws://127.0.0.1:8000/chat/${chatRoomId}/?token=${token}`
    );

    socket.onopen = () => console.log("✅ WebSocket connected");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      } catch (e) {
        console.error("Invalid JSON from server", event.data);
      }
    };

    socket.onclose = () => console.log("⚠️ WebSocket disconnected");

    setWs(socket);

    return () => socket.close();
  }, [chatRoomId, token]);

  const sendMessage = () => {
    if (ws && input.trim() !== "") {
      ws.send(JSON.stringify({ message: input }));
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 rounded-2xl shadow-lg">
      
      {/* لیست پیام‌ها */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl shadow-md max-w-xs break-words 
              ${msg.sender === "self" ? "bg-indigo-500 text-white ml-auto" : "bg-white/90 text-gray-800"}`}
          >
            <strong className="block text-sm text-gray-500">{msg.sender}</strong>
            <span>{msg.message}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* فرم ارسال پیام */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="پیام خود را بنویسید..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="input flex-1 rounded-2xl p-3 border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none transition"
        />
        <button
          onClick={sendMessage}
          className="btn flex items-center justify-center rounded-2xl p-3"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}