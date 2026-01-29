import { Outlet } from "react-router-dom";

export default function InternalLayout() {
  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <Outlet />
    </div>
  );
}