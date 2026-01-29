// src/pages/ChatRoomPage.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import InternalHeader from "../components/InternalHeader";
import ChatRoom from "../components/ChatRoom";

export default function ChatRoomPage({ chatRoomId, token }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar سمت چپ */}
      <Sidebar />

      {/* بخش اصلی */}
      <div className="flex-1 flex flex-col">
        {/* هدر داخلی با دکمه بازگشت */}
        <InternalHeader title="چت با دوستان" />

        {/* فضای چت */}
        <main className="flex-1 p-4 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 overflow-hidden">
          <ChatRoom chatRoomId={chatRoomId} token={token} />
        </main>
      </div>
    </div>
  );
}