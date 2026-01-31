import { Home, MessageCircle, HeartPulse, LayoutGrid, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "text-indigo-600" : "text-gray-600";

  

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white shadow flex items-center justify-between px-6">
      <div 
        onClick={() => navigate("/menu/")}
        className={`cursor-pointer ${isActive("/menu/")}`}
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
          onClick={() => navigate("/search/")}
          className={`cursor-pointer ${isActive("/search/")}`}
        />

        <HeartPulse
          onClick={() => navigate("/relplay/")}
          className={`cursor-pointer ${isActive("/relplay/")}`} 
        />

        <MessageCircle
          onClick={() => navigate("/")}
          className={`cursor-pointer ${isActive("/")}`}
        />
        
        <Home
          onClick={() => navigate("/home/")}
          className={`cursor-pointer ${isActive("/home/")}`}
        />

      </nav>
    </header>
  );
}