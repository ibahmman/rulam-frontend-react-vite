// src/services/chatService.js
import axiosInstance from "../api/axiosInstance";

export const createOrGetChatRoom = (userId) => {
  return axiosInstance.post("chelseru/chat/chatrooms/", {
    user_id: userId,
  });
};



// گرفتن لیست چت‌روم‌ها
export const getChatRooms = async () => {
  try {
    const res = await axiosInstance.get("chelseru/chat/chatrooms/");
    return res.data; // آرایه چت‌روم‌ها
  } catch (err) {
    console.error("خطا در گرفتن چت‌روم‌ها:", err.response?.data || err.message);
    throw err;
  }
};

// گرفتن پیام‌های یک چت‌روم
export const getMessages = async (roomId) => {
  try {
    const res = await axiosInstance.get(`chelseru/chat/chatrooms/${roomId}/messages/`);
    return res.data;
  } catch (err) {
    console.error("خطا در گرفتن پیام‌ها:", err.response?.data || err.message);
    throw err;
  }
};

// ارسال پیام به یک چت‌روم
export const sendMessage = async (roomId, message) => {
  try {
    const res = await axiosInstance.post(`chelseru/chat/chatrooms/${roomId}/send/`, { message });
    return res.data;
  } catch (err) {
    console.error("خطا در فرستادن پیام:", err.response?.data || err.message);
    throw err;
  }
};



export const fetchMessages = async (chatRoomId) => {
  const res = await axiosInstance.get(
    `chelseru/chat/messages/?chat_room=${chatRoomId}`
  );
  return res.data.results;
};