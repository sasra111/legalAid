import { Outlet } from "react-router-dom";
import Sidebar from "@/components/admin_dashboard/Sidebar";

const SIDEBAR_WIDTH = 256; // 64 * 4 (w-64 in Tailwind = 16rem = 256px)

const AdminDashboard = () => (
  <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <Sidebar />
    <main className="flex-1 p-4 md:p-6" style={{ marginLeft: 0 }}>
      <Outlet />
    </main>
  </div>
);

export default AdminDashboard;
