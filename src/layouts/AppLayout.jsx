import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="h-screen flex flex-col">
      {/* هدر اصلی */}
      <Header />

      {/* بدنه */}
      <div className="flex flex-1 pt-14">
        <Sidebar />

        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}