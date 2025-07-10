import { Outlet } from "react-router-dom";
import Sidebar from "@/components/firm_dashboard/Sidebar";

const LawyerDashboard = () => (
  <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <Sidebar />
    <main className="flex-1 p-6">
      <Outlet />
    </main>
  </div>
);

export default LawyerDashboard;
