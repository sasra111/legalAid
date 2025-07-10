import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900">
    <Header />
    <main className="flex-1 flex flex-col">{children}</main>
    <Footer />
  </div>
);

export default Layout;
