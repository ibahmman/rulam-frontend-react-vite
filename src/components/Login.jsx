import { useState } from "react";
import { sendOTP, loginWithOTP } from "../api/auth";
import { setAuthToken } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ارسال OTP به شماره موبایل
  const handleSendOTP = async () => {
    if (!mobile) {
      alert("شماره موبایل را وارد نمایید");
      return;
    }
    try {
      setLoading(true);
      const res = await sendOTP(mobile);
      console.log(res.details); // نمایش پیغام سرور
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      alert("کد OTP فرستاده نشد");
    } finally {
      setLoading(false);
    }
  };

  // ورود با OTP
  const handleLogin = async () => {
    if (!code) {
      alert("کد پیامک شده را وارد نمایید");
      return;
    }
    try {
      setLoading(true);
      const data = await loginWithOTP(mobile, code);

      // ست کردن توکن در axios
      setAuthToken(data.access);

      // ذخیره توکن در localStorage
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh || ""); // اگر refresh token موجود باشد

      // ارسال توکن به App برای اتصال WebSocket
      if (onLogin) onLogin(data.access);

      // هدایت به ChatListPage
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("ورود موفق نبود، کد را چک کنید");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 p-4">
      <div className="bg-white/90 p-8 rounded-3xl shadow-xl w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-indigo-600 text-center mb-4">ورود به روله‌م</h1>

        {!otpSent ? (
          <>
            <input
              type="tel"
              placeholder="شماره موبایل"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="input rounded-2xl p-3 border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none transition"
            />
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="btn rounded-2xl bg-indigo-500 text-white p-3 font-semibold hover:bg-indigo-600 transition"
            >
              {loading ? "در حال فرستادن..." : "فرستادن کد"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="کد OTP"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="input rounded-2xl p-3 border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none transition"
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="btn rounded-2xl bg-indigo-500 text-white p-3 font-semibold hover:bg-indigo-600 transition"
            >
              {loading ? "در حال ورود..." : "ورود"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}