import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchHeader({ value, onChange }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b bg-white flex-row-reverse">
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-full hover:bg-gray-200 text-indigo-600"
      >
        <ArrowRight />
      </button>

      <div className="flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          placeholder="جستجو..."
          className="
            w-full h-10 px-3 rounded-full
            bg-gray-100
            text-gray-800
            placeholder-gray-400

            focus:outline-none
            focus:ring-0
            focus:border-transparent

            focus:bg-white
            focus:shadow-sm

            transition-all duration-200
          "
        />
      </div>
    </div>
  );
}
