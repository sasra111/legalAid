import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Layout from "@/components/layout/Layout";
import LawyerDashboard from "./pages/firm_dashboard/LawyerDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/firm-dashboard/lawyer"
            element={
              <ProtectedRoute allowedRoles={["lawyer"]}>
                <LawyerDashboard />
              </ProtectedRoute>
            }
          />
          {/* Example: Add more protected routes for other dashboard sections if needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
