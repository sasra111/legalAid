import React from "react";
import {
  BarChart3,
  Briefcase,
  FileText,
  Search,
  Users,
  Calendar,
  DollarSign,
  Settings,
} from "lucide-react";

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <BarChart3 className="h-5 w-5" />,
    path: "/lawyer-dashboard/lawyer",
  },
  {
    id: "cases",
    label: "Cases",
    icon: <Briefcase className="h-5 w-5" />,
    path: "/lawyer-dashboard/lawyer/cases",
  },
  {
    id: "documents",
    label: "Documents",
    icon: <FileText className="h-5 w-5" />,
    path: "/lawyer-dashboard/lawyer/documents",
  },
  {
    id: "search",
    label: "Legal Search",
    icon: <Search className="h-5 w-5" />,
    path: "/lawyer-dashboard/lawyer/search",
  },
  {
    id: "clients",
    label: "Clients",
    icon: <Users className="h-5 w-5" />,
    path: "/lawyer-dashboard/lawyer/clients",
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: <Calendar className="h-5 w-5" />,
    path: "/lawyer-dashboard/lawyer/calendar",
  },
  {
    id: "billing",
    label: "Billing",
    icon: <DollarSign className="h-5 w-5" />,
    path: "/lawyer-dashboard/lawyer/billing",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    path: "/lawyer-dashboard/lawyer/settings",
  },
];

import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <aside className="h-full w-64 bg-white border-r shadow-sm flex flex-col">
      <div className="p-6 text-2xl font-bold text-blue-800 border-b">
        Lawyer Panel
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors duration-150 ${
              location.pathname === item.path
                ? "bg-blue-100 text-blue-800 font-semibold"
                : "hover:bg-blue-50 text-gray-700"
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
