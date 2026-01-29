import { useEffect, useState } from "react";

export default function ChatRoom({ chatRoomId, token }) {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!token) return;

    // ساخت WebSocket با JWT
    const socket = new WebSocket(
      `ws://127.0.0.1:8000/chat/${chatRoomId}/?token=${token}`
    );

    // اتصال موفق
    socket.onopen = () => console.log("✅ WebSocket connected");

    // دریافت پیام از سرور
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      } catch (e) {
        console.error("Invalid JSON from server", event.data);
      }
    };

    // قطع اتصال
    socket.onclose = () => console.log("⚠️ WebSocket disconnected");

    setWs(socket);

    // Cleanup هنگام unmount شدن
    return () => socket.close();
  }, [chatRoomId, token]);

  const sendMessage = () => {
    if (ws && input.trim() !== "") {
      ws.send(JSON.stringify({ message: input }));
      setInput("");
    }
  };

  return (
    <div>
      <div className="messages" style={{ maxHeight: "300px", overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender}: </strong> {msg.message}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="پیام خود را بنویسید"
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>ارسال</button>
    </div>
  );
}