import React from "react";
import { BarChart3 } from "lucide-react";

const CaseOverview = () => (
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
);

export default CaseOverview;
