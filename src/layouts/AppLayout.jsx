import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* هدر اصلی */}
      <Header />

      {/* محتوا */}
      <div className="flex flex-1 pt-14 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
