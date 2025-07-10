import React from "react";

const Footer = () => (
  <footer className="w-full py-8 sm:py-12 border-t border-gray-200 bg-white/80 backdrop-blur-sm text-center text-gray-500 text-sm">
    © {new Date().getFullYear()} LegalAid. All rights reserved.
  </footer>
);

export default Footer;
