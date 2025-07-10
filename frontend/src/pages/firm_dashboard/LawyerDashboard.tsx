import React from "react";
import {
  Calendar,
  FileText,
  Briefcase,
  MessageCircle,
  Search,
  Users,
  BarChart3,
  DollarSign,
  Settings,
} from "lucide-react";

const features = [
  {
    icon: <FileText className="h-7 w-7 text-blue-600" />,
    title: "Legal Intake",
    description:
      "Collect and organize client and case data automatically for efficient onboarding.",
  },
  {
    icon: <MessageCircle className="h-7 w-7 text-blue-600" />,
    title: "Consultation Scheduling",
    description: "Clients can schedule and communicate with lawyers easily.",
  },
  {
    icon: <Search className="h-7 w-7 text-blue-600" />,
    title: "Case Law Search Engine",
    description:
      "AI-powered search for relevant statutes, precedents, and legal commentary.",
  },
  {
    icon: <Calendar className="h-7 w-7 text-blue-600" />,
    title: "Calendar",
    description:
      "Track upcoming dates, deadlines, and case events in one place.",
  },
  {
    icon: <Briefcase className="h-7 w-7 text-blue-600" />,
    title: "Case Tracker & Management",
    description:
      "Timeline for each case, including documents, notes, and assigned lawyers.",
  },
];

export default function LawyerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">
        Lawyer Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start gap-3 border border-blue-100 hover:shadow-lg transition-all duration-200"
          >
            {feature.icon}
            <h2 className="text-xl font-semibold text-blue-700">
              {feature.title}
            </h2>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 border border-blue-100">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" /> Case Overview
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between text-sm">
              <span>Active Cases:</span>{" "}
              <span className="font-semibold text-blue-700">8</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>Upcoming Consultations:</span>{" "}
              <span className="font-semibold text-blue-700">3</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>Pending Documents:</span>{" "}
              <span className="font-semibold text-blue-700">5</span>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow p-6 border border-blue-100">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" /> Billing Summary
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between text-sm">
              <span>Outstanding Invoices:</span>{" "}
              <span className="font-semibold text-blue-700">$2,500</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>Recent Payments:</span>{" "}
              <span className="font-semibold text-blue-700">$1,200</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 bg-white rounded-xl shadow p-6 border border-blue-100">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" /> Upcoming Events
        </h3>
        <ul className="space-y-2">
          <li className="flex justify-between text-sm">
            <span>Consultation with John Doe</span> <span>2025-07-12</span>
          </li>
          <li className="flex justify-between text-sm">
            <span>Case Review: Silva vs. Fernando</span> <span>2025-07-14</span>
          </li>
          <li className="flex justify-between text-sm">
            <span>Document Submission Deadline</span> <span>2025-07-15</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
