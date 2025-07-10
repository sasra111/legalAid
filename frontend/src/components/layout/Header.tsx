import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale, Gavel } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  // Determine dashboard path based on role
  let dashboardPath = "/";
  if (user) {
    if (user.role === "admin") dashboardPath = "/admin";
    else if (user.role === "lawyer") dashboardPath = "/lawyer-dashboard/lawyer";
    else dashboardPath = "/client";
  }

  return (
    <header className="w-full px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-gray-200/60 bg-gradient-to-r from-blue-50 via-white to-blue-100/80 backdrop-blur-xl sticky top-0 z-20 shadow-md transition-all duration-300">
      <Link
        to="/"
        className="flex items-center gap-3 group cursor-pointer select-none"
        tabIndex={0}
        aria-label="Go to home"
      >
        <span className="relative flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 border-2 border-blue-300 shadow-inner mr-2">
          <Scale className="absolute left-1.5 top-1.5 h-7 w-7 text-blue-700 drop-shadow-md" />
          <Gavel className="absolute right-1.5 bottom-1.5 h-5 w-5 text-yellow-500 opacity-80" />
        </span>
        <span className="text-2xl font-extrabold text-blue-800 tracking-tight drop-shadow-sm flex items-center">
          Legal
          <span className="text-yellow-500 ml-1">Aid</span>
        </span>
      </Link>
      <nav className="space-x-2 sm:space-x-4 flex items-center">
        <Link
          to="/"
          className="text-blue-700 hover:text-blue-900 font-semibold px-3 py-1 rounded transition-colors duration-150 hover:bg-blue-100/60"
        >
          Home
        </Link>
        {token && user ? (
          <>
            <Link
              to={dashboardPath}
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-5 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-500 transition-all duration-200 border border-blue-700/60 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition-colors duration-150 border border-red-700/60 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-5 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-500 transition-all duration-200 border border-blue-700/60 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
