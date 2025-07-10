import React from "react";
import {
  FileText,
  MessageCircle,
  Search,
  Calendar,
  Briefcase,
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

const FeaturesGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
    {features.map((feature) => (
      <div
        key={feature.title}
        className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start gap-3 border border-blue-100 hover:shadow-lg transition-all duration-200"
      >
        {feature.icon}
        <h2 className="text-xl font-semibold text-blue-700">{feature.title}</h2>
        <p className="text-gray-600 text-sm">{feature.description}</p>
      </div>
    ))}
  </div>
);

export default FeaturesGrid;
