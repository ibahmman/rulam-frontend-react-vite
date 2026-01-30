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
    <div className="p-4 min-h-screen">
      <div className="flex justify-center my-8">
        <div className="relative w-56 h-56 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center shadow-lg">

          {/* عدد روز فعلی */}
          <div className="text-center">
            <div className="text-5xl font-bold text-pink-500">
              {cycleInfo?.cycleDay ?? "-"}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              روز چرخه
            </div>
          </div>

          {/* نقاط روزها */}
          {cycleInfo &&
            Array.from({ length: cycleInfo.cycleLength }).map((_, i) => {
              const day = i + 1;
              const angle = (360 / cycleInfo.cycleLength) * i;
              const isToday = day === cycleInfo.cycleDay;

              return (
                <span
                  key={day}
                  className={`
                    absolute w-3 h-3 rounded-full
                    ${isToday ? "bg-pink-500 scale-125" : day < cycleInfo.cycleDay ? "bg-pink-300" : "bg-gray-300"}
                  `}
                  style={{
                    transform: `
                      rotate(${angle}deg)
                      translate(100px)
                    `,
                  }}
                />
              );
            })}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold text-purple-600 mb-2">
          وضعیت فعلی
        </h2>

        {cycleInfo ? (
          <div className="space-y-2 text-gray-700">
            <p>🌙 <span className="font-medium">فاز:</span> {cycleInfo.phase}</p>
            <p>💡 <span className="font-medium">نکته امروز:</span> {cycleInfo.advice}</p>
          </div>
        ) : (
          <p className="text-gray-400">تاریخ آخرین پریود ثبت نشده 🌸</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;