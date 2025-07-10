import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Layout from "@/components/layout/Layout";
import LawyerDashboard from "./pages/lawyer/LawyerDashboard";
import FeaturesGrid from "@/components/lawyer_dashboard/FeaturesGrid";
import CaseOverview from "@/components/lawyer_dashboard/CaseOverview";
import BillingSummary from "@/components/lawyer_dashboard/BillingSummary";
import UpcomingEvents from "@/components/lawyer_dashboard/UpcomingEvents";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/lawyer-dashboard/lawyer"
            element={
              <ProtectedRoute allowedRoles={["lawyer"]}>
                <LawyerDashboard />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <>
                  <h1 className="text-3xl font-bold text-blue-800 mb-8">
                    Lawyer Dashboard
                  </h1>
                  <FeaturesGrid />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CaseOverview />
                    <BillingSummary />
                  </div>
                  <UpcomingEvents />
                </>
              }
            />
            <Route
              path="cases"
              element={
                <div className="text-xl">Cases Section (Coming soon)</div>
              }
            />
            <Route
              path="documents"
              element={
                <div className="text-xl">Documents Section (Coming soon)</div>
              }
            />
            <Route
              path="search"
              element={
                <div className="text-xl">
                  Legal Search Section (Coming soon)
                </div>
              }
            />
            <Route
              path="clients"
              element={
                <div className="text-xl">Clients Section (Coming soon)</div>
              }
            />
            <Route
              path="calendar"
              element={
                <div className="text-xl">Calendar Section (Coming soon)</div>
              }
            />
            <Route path="billing" element={<BillingSummary />} />
            <Route
              path="settings"
              element={
                <div className="text-xl">Settings Section (Coming soon)</div>
              }
            />
          </Route>
          {/* Example: Add more protected routes for other dashboard sections if needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
