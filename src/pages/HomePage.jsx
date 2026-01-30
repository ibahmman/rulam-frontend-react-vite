import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { getProfile } from "../services/profileService";
import { getCycleInfo } from "../utils/cycleUtils";


dayjs.extend(jalaliday);
dayjs.calendar("jalali");

function HomePage() {
  const [cycleInfo, setCycleInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const decoded = jwtDecode(token);
      const userId = decoded.user_id;
      const { data } = await getProfile(userId);

      if (data.last_period_at) {
        const info = getCycleInfo(data.last_period_at);
        setCycleInfo(info);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-gradient-to-b from-pink-50 to-white min-h-screen">
      <h1 className="text-2xl font-bold text-pink-600 mb-4">
        داشبورد پریودی
      </h1>

      <div className="bg-white shadow-md rounded-2xl p-4 mb-6">
        <h2 className="text-lg font-semibold text-purple-600 mb-2">
          چرخه شما
        </h2>
        <div className="w-full h-40 bg-pink-100 rounded-xl flex items-center justify-center">
          <span className="text-pink-500">
            روز {cycleInfo?.cycleDay ?? "-"} چرخه
          </span>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold text-purple-600 mb-2">
          وضعیت فعلی
        </h2>

        {cycleInfo ? (
          <ul className="list-disc list-inside text-gray-700">
            <li>فاز: {cycleInfo.phase}</li>
            <li>نکته امروز: {cycleInfo.advice}</li>
          </ul>
        ) : (
          <p className="text-gray-400">
            تاریخ آخرین پریود ثبت نشده 🌸
          </p>
        )}
      </div>
    </div>
  );
}

export default HomePage;