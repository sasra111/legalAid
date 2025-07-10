// import React from "react";
import { Calendar } from "lucide-react";

const UpcomingEvents = () => (
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
);

export default UpcomingEvents;
