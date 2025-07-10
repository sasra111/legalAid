import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Layout from "@/components/layout/Layout";
import LawyerDashboard from "./pages/firm_dashboard/LawyerDashboard";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/firm_dashboard/lawyer" element={<LawyerDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
