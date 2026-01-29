export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 font-semibold text-gray-700">لیست‌ها</div>

      <ul className="px-4 space-y-2 text-sm text-gray-600">
        <li className="cursor-pointer hover:text-indigo-600">چت‌ها</li>
        <li className="cursor-pointer hover:text-indigo-600">آرشیو</li>
      </ul>
    </aside>
  );
}