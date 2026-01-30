import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InternalHeader({ title, showBack = false }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b bg-white flex-row-reverse text-indigo-600">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <ArrowRight />
        </button>
      )}
      <h1 className="text-lg font-bold text-indigo-600">{title}</h1>
    </div>
  );
}