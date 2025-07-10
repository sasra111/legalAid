import React, { useState } from "react";
import Sidebar from "@/components/firm_dashboard/Sidebar";
import FeaturesGrid from "@/components/firm_dashboard/FeaturesGrid";
import CaseOverview from "@/components/firm_dashboard/CaseOverview";
import BillingSummary from "@/components/firm_dashboard/BillingSummary";
import UpcomingEvents from "@/components/firm_dashboard/UpcomingEvents";

const LawyerDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">
          Lawyer Dashboard
        </h1>
        {activeSection === "dashboard" && (
          <>
            <FeaturesGrid />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CaseOverview />
              <BillingSummary />
            </div>
            <UpcomingEvents />
          </>
        )}
        {/* Add more sections here as needed */}
      </main>
    </div>
  );
};

export default LawyerDashboard;
