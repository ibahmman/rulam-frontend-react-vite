import { useState } from "react";
import Login from "./components/Login.jsx";
import ChatRoom from "./components/ChatRoom.jsx";

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <div>
      {!token ? (
        <Login onLogin={setToken} />
      ) : (
        <ChatRoom chatRoomId={1} token={token} />
      )}
    </div>
  );
}