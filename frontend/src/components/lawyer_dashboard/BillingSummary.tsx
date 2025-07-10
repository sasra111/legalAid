// import React from "react";
import { DollarSign } from "lucide-react";

const BillingSummary = () => (
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
);

export default BillingSummary;
