import React from "react";
import { Link } from "react-router-dom";
import { Scale, Gavel } from "lucide-react";

const Header = () => (
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
      <Link
        to="/login"
        className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-5 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-500 transition-all duration-200 border border-blue-700/60 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
      >
        Login
      </Link>
    </nav>
  </header>
);

export default Header;
