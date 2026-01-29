// src/pages/LoginPage.jsx
import React, { useState } from "react";
import Login from "../components/Login";

export default function LoginPage() {
  // state داخلی فقط برای مثال UX
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
      {/* کارت ورود */}
      <div className="bg-white/90 p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          ورود به رولام
        </h1>

        {/* کامپوننت Login که منطق ورود دارد */}
        <Login loading={loading} setLoading={setLoading} />

        {/* متن راهنما */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          هنوز حساب کاربری نداری؟ <span className="text-indigo-500 cursor-pointer hover:underline">ثبت نام</span>
        </p>
      </div>
    </div>
  );
}