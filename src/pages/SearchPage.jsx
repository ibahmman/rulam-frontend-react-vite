import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { searchProfiles } from "../services/profileService";
import axiosInstance from "../api/axiosInstance";
import { UserRoundPlus, Check, Loader2 } from "lucide-react";

export default function SearchPage() {
  const { query } = useOutletContext();

  const [results, setResults] = useState([]);
  const [loadingIds, setLoadingIds] = useState([]);
  const [addedIds, setAddedIds] = useState([]);

  // 🔍 سرچ با debounce
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const t = setTimeout(async () => {
      try {
        const res = await searchProfiles(query);
        setResults(res.data);
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 400);

    return () => clearTimeout(t);
  }, [query]);

  // ➕ Add Friend واقعی
  const handleAddFriend = async (userId) => {
    if (loadingIds.includes(userId) || addedIds.includes(userId)) return;

    try {
      setLoadingIds((prev) => [...prev, userId]);

      await axiosInstance.post("/f/profile/friends/add/", {
        user_id: userId,
      });

      // ✅ فقط بعد از پاسخ موفق
      setAddedIds((prev) => [...prev, userId]);
    } catch (err) {
      console.error("Add friend error:", err);
      alert("خطا در افزودن دوست");
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  return (
    <div className="p-3 space-y-2">
      {results.map((item) => {
        const userId = item.user.id;
        const isLoading = loadingIds.includes(userId);
        const isAdded = addedIds.includes(userId);

        return (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-purple-100"
          >
            <span className="text-gray-700 font-medium">
              {item.user.username}
            </span>

            <button
              onClick={() => handleAddFriend(userId)}
              disabled={isLoading || isAdded}
              className="p-2 rounded-full hover:bg-gray-100 transition disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin text-gray-400" />
              ) : isAdded ? (
                <Check size={20} className="text-green-500" />
              ) : (
                <UserRoundPlus size={20} />
              )}
            </button>
          </div>
        );
      })}

      {query.length >= 2 && results.length === 0 && (
        <p className="text-center text-gray-400 mt-6">
          نتیجه‌ای یافت نشد
        </p>
      )}
    </div>
  );
}
