// src/pages/LoginPage.jsx
import React, { useState } from "react";
import Login from "../components/Login";

export default function LoginPage() {
  // state داخلی فقط برای مثال UX
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
      {/* کارت ورود */}
      <Login loading={loading} setLoading={setLoading} />
    </div>
  );
}