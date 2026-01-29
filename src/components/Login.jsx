import { useState } from "react";
import { sendOTP, loginWithOTP } from "../api/auth";
import { setAuthToken } from "../api/axiosInstance";

export default function Login({ onLogin }) {
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async () => {
    try {
      const res = await sendOTP(mobile);
      console.log(res.details); // نمایش پیغام سرور
      setOtpSent(true);
    } catch (err) {
      alert("ارسال OTP موفق نبود");
    }
  };

  const handleLogin = async () => {
    try {
      const data = await loginWithOTP(mobile, code);
      setAuthToken(data.access); // ست کردن JWT برای axios
      onLogin(data.access);      // ارسال توکن به App برای اتصال WebSocket
    } catch (err) {
      alert("ورود موفق نبود، کد را چک کنید");
    }
  };

  return (
    <div>
      {!otpSent ? (
        <>
          <input
            placeholder="شماره موبایل"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button onClick={handleSendOTP}>ارسال کد</button>
        </>
      ) : (
        <>
          <input
            placeholder="کد OTP"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={handleLogin}>ورود</button>
        </>
      )}
    </div>
  );
}