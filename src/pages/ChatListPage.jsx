import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import InternalHeader from "../components/InternalHeader";
import { jwtDecode } from "jwt-decode";


export default function ChatListPage() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  
  /* ===============================
      تشخیص current user از JWT
  =============================== */
  const token = localStorage.getItem("access_token");
  const currentUserId = useMemo(() => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.user_id || decoded.id || null;
    } catch {
      return null;
    }
  }, [token]);


  useEffect(() => {
    axiosInstance
      .get("chelseru/chat/chatrooms/")
      .then((res) => setChats(res.data))
      .catch((err) => console.error(err));
  }, []);


  const getPartner = (chat) =>
    chat.users.find((u) => u.id !== currentUserId) || { username: "ناشناس" };


  return (
    <div className="flex flex-col h-full">      
      <div className="p-4 space-y-4">
        {chats.map((chat) => {
          const partner = getPartner(chat);
          return (
            <div
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="bg-white rounded-2xl shadow p-4 flex justify-between items-center cursor-pointer hover:bg-indigo-50 transition"
            >
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                  {partner.username[0]}
                </div>

                <div>
                  <div className="font-semibold">{chat.name || partner.username}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {chat.descriptions || "پیامی وجود ندارد"}
                  </div>
                </div>
              </div>

              <span className="text-xs text-gray-400">
                {new Date(chat.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}