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
  },
  { id: "cases", label: "Cases", icon: <Briefcase className="h-5 w-5" /> },
  {
    id: "documents",
    label: "Documents",
    icon: <FileText className="h-5 w-5" />,
  },
  { id: "search", label: "Legal Search", icon: <Search className="h-5 w-5" /> },
  { id: "clients", label: "Clients", icon: <Users className="h-5 w-5" /> },
  { id: "calendar", label: "Calendar", icon: <Calendar className="h-5 w-5" /> },
  { id: "billing", label: "Billing", icon: <DollarSign className="h-5 w-5" /> },
  { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
];

const Sidebar = ({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (id: string) => void;
}) => (
  <aside className="h-full w-64 bg-white border-r shadow-sm flex flex-col">
    <div className="p-6 text-2xl font-bold text-blue-800 border-b">
      Lawyer Panel
    </div>
    <nav className="flex-1 p-4 space-y-2">
      {navigationItems.map((item) => (
        <button
          key={item.id}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors duration-150 ${
            activeSection === item.id
              ? "bg-blue-100 text-blue-800 font-semibold"
              : "hover:bg-blue-50 text-gray-700"
          }`}
          onClick={() => setActiveSection(item.id)}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
