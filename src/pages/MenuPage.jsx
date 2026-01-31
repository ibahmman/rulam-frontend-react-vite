import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { getProfile } from "../services/profileService";
import { createOrGetChatRoom } from "../services/chatService"
import axiosInstance from "../api/axiosInstance";
import {
  LogOut,
  Cake,
  FingerprintPattern,
  Rose,
  MessageCircle,
  UserMinus,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import defaultAvatar from '../assets/images/avatar.png'

dayjs.extend(jalaliday);

export default function MenuPage() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const currentUserId = token
    ? jwtDecode(token).user_id || jwtDecode(token).id
    : null;

  const profileAvatar = defaultAvatar;

  useEffect(() => {
    if (!currentUserId) return;

    getProfile(currentUserId)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, [currentUserId]);

  if (!profile) return <div className="p-4 text-center">در حال بارگذاری...</div>;

  const birthdayShamsi = profile.birthday
    ? dayjs(profile.birthday)
        .calendar("jalali")
        .locale("fa")
        .format("DD-MM-YYYY")
    : "-";

  /* ================= ACTIONS ================= */

  // 🗨️ ورود / ساخت چت
  const handleChat = (friendId) => {
    navigate(`/chat/${friendId}`);
  };

  // 👁️ add / remove show_for
  const toggleVisible = async (friend) => {
    const isShown = profile.show_for.some((u) => u.id === friend.id);
    const url = isShown
      ? "/f/profile/visible/remove/"
      : "/f/profile/visible/add/";

    try {
      await axiosInstance.post(url, { user_id: friend.id });

      setProfile((prev) => ({
        ...prev,
        show_for: isShown
          ? prev.show_for.filter((u) => u.id !== friend.id)
          : [...prev.show_for, friend],
      }));
    } catch (err) {
      console.error("Visible error:", err);
    }
  };

  // ❌ حذف دوست
  const handleRemoveFriend = async (friendId) => {
    const confirmed = window.confirm("این دوست حذف شود؟");
    if (!confirmed) return;

    try {
      await axiosInstance.post("/f/profile/friends/remove/", {
        user_id: friendId,
      });

      setProfile((prev) => ({
        ...prev,
        friends: prev.friends.filter((f) => f.id !== friendId),
        show_for: prev.show_for.filter((u) => u.id !== friendId),
      }));
    } catch (err) {
      console.error("Remove friend error:", err);
    }
  };


  const handleOpenChat = async (friendId) => {
    try {
      const res = await createOrGetChatRoom(friendId);

      const roomId = res.data.id;
      navigate(`/chat/${roomId}`);
    } catch (err) {
      console.error("Create/Get chat room error:", err);
      alert("خطا در ایجاد چت روم");
    }
  };



  return (
    <div className="h-full w-full flex flex-col">
      {/* ===== Header ===== */}
      <div className="w-full h-40 flex justify-between p-4 border-b ">
        <div className="flex flex-row">
          <img src={profileAvatar} alt="" className="rounded-full w-32 h-32"/>
          <div className="flex flex-col justify-end">
            <div className="flex items-center mb-1">
              <FingerprintPattern size={18} className="mr-2 text-purple-500" />
              <span>{profile.user.username}</span>
            </div>
            <div className="flex items-center">
              <Cake size={18} className="mr-2 text-purple-500" />
              <span>{birthdayShamsi}</span>
            </div>
          </div>
        </div>

        <button onClick={() => navigate("/login")}>
          <LogOut />
        </button>
      </div>

      {/* ===== Friends List ===== */}
      <div className="flex-1 p-4 space-y-2 bg-gradient-to-b from-purple-100 to-blue-100">
        <h2 className="text-end text-gray-700 font-semibold mb-2">
          دوستان شما
        </h2>

        {profile.friends.length ? (
          profile.friends.map((friend) => {
            const isShown = profile.show_for.some(
              (u) => u.id === friend.id
            );

            return (
              <div
                key={friend.id}
                className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm"
              >
                <div className="flex items-center space-x-2">
                  <span>{friend.username}</span>
                  {isShown && <Rose size={16} className="text-green-500" />}
                </div>

                <div className="flex items-center space-x-3">
                  {/* Chat */}
                  <button
                    onClick={() => handleOpenChat(friend.id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="چت"
                  >
                    <MessageCircle size={18} />
                  </button>


                  {/* Show for */}
                  <button onClick={() => toggleVisible(friend)}>
                    {isShown ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                  {/* Remove */}
                  <button onClick={() => handleRemoveFriend(friend.id)}>
                    <UserMinus size={18} className="text-red-500" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 text-center">
            هیچ دوستی یافت نشد
          </p>
        )}
      </div>
    </div>
  );
}
