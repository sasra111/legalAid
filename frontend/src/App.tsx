import Settings from "@/components/lawyer_dashboard/Settings";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Layout from "@/components/layout/Layout";
import LawyerDashboard from "./pages/lawyer/LawyerDashboard";
import ClientManagement from "@/components/lawyer_dashboard/ClientManagement";
import FeaturesGrid from "@/components/lawyer_dashboard/FeaturesGrid";
import CaseOverview from "@/components/lawyer_dashboard/CaseOverview";
import BillingSummary from "@/components/lawyer_dashboard/BillingSummary";
import UpcomingEvents from "@/components/lawyer_dashboard/UpcomingEvents";
import Calendar from "./components/lawyer_dashboard/Calendar";
import LegalSearch from "@/components/lawyer_dashboard/LegalSearch";
import ProtectedRoute from "@/components/ProtectedRoute";
import SimilarCases from "./components/lawyer_dashboard/SimilarCases";

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
                <ProtectedRoute allowedRoles={["lawyer"]}>
                  <SimilarCases />
                </ProtectedRoute>
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
                <ProtectedRoute allowedRoles={["lawyer"]}>
                  <LegalSearch />
                </ProtectedRoute>
              }
            />
            <Route
              path="clients"
              element={
                <ProtectedRoute allowedRoles={["lawyer"]}>
                  <ClientManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="calendar"
              element={
                <ProtectedRoute allowedRoles={["lawyer"]}>
                  <Calendar />
                </ProtectedRoute>
              }
            />
            <Route path="billing" element={<BillingSummary />} />
            <Route
              path="settings"
              element={
                <ProtectedRoute allowedRoles={["lawyer"]}>
                  <Settings />
                </ProtectedRoute>
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
