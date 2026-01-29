import { Home, MessageCircle, HeartPulse } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "text-indigo-600" : "text-gray-600";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white shadow flex items-center justify-between px-6">
      {/* لوگو */}
      <div
        onClick={() => navigate("/")}
        className="text-xl font-bold text-indigo-600 cursor-pointer"
      >
        Rulam
      </div>

      {/* منو */}
      <nav className="flex gap-8">
        
        <HeartPulse
          onClick={() => alert("بعداً پیاده‌سازی میشه")}
          className="cursor-pointer text-gray-600"
        />

        <MessageCircle
          onClick={() => navigate("/")}
          className={`cursor-pointer ${isActive("/")}`}
        />
        
        <Home
          onClick={() => navigate("/")}
          className={`cursor-pointer ${isActive("/")}`}
        />

      </nav>
    </header>
  );
}