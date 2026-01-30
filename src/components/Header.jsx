import { Home, MessageCircle, HeartPulse, LayoutGrid, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "text-indigo-600" : "text-gray-600";

  const handleLogout = () => {
    const confirmed = window.confirm('آیا تمایل به بیرون رفتن از حساب کاربری دارید');

    if (!confirmed) return;

    // پاک‌سازی کامل سشن
    localStorage.clear();
    sessionStorage.clear();

    // اگر کوکی auth داشتی (اختیاری)
    document.cookie
      .split(';')
      .forEach(c => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });

    navigate('/login', { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white shadow flex items-center justify-between px-6">
      <div 
        onClick={handleLogout}
        className={`cursor-pointer ${isActive("/")}`}
        >
        <LayoutGrid />
      </div>
      
      <div
        onClick={() => navigate("/")}
        className="text-xl font-bold text-indigo-600 cursor-pointer"
      >
        روله‌م
      </div>

      <nav className="flex gap-8">
        <Search
          onClick={() => navigate("/")}
          className={`cursor-pointer ${isActive("/")}`}
        />

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