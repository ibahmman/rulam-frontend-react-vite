import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InternalHeader({ title, showBack = false }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b bg-white">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <ArrowLeft size={18} />
        </button>
      )}
      <h1 className="text-lg font-bold text-gray-800">{title}</h1>
    </div>
  );
}