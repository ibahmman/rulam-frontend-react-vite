import React from "react";

function HomePage() {
  return (
    <div className="p-4 bg-gradient-to-b from-pink-50 to-white min-h-screen">
      <h1 className="text-2xl font-bold text-pink-600 mb-4">داشبورد پریودی</h1>

      {/* نمودار چرخه پریودی */}
      <div className="bg-white shadow-md rounded-2xl p-4 mb-6">
        <h2 className="text-lg font-semibold text-purple-600 mb-2">چرخه شما</h2>
        <div className="w-full h-40 bg-pink-100 rounded-xl flex items-center justify-center">
          <span className="text-pink-500">[نمودار پریودی]</span>
        </div>
      </div>

      {/* خلاصه وضعیت */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold text-purple-600 mb-2">وضعیت فعلی</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>روز پریودی: 5</li>
          <li>احساس: خستگی متوسط</li>
          <li>نکته امروز: استراحت کافی داشته باشید</li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;