"use client";

import { useEffect, useState } from "react";
import { Clock, Mail, Phone, Sun, Moon } from "lucide-react";

export default function TopBar() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle body class on dark mode change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="sticky top-0 z-50 bg-gray-900 dark:bg-gray-800 text-white text-sm px-6 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 shadow-md">
      <div className="flex items-center space-x-2">
        <Clock size={16} className="text-gray-400" />
        <span className="text-gray-300">Mon - Fri:</span>
        <span className="font-medium">8:00 AM – 6:00 PM</span>
      </div>

      <div className="flex items-center space-x-4">
        <a
          href="mailto:support@fabuzilo.com"
          className="flex items-center space-x-1 hover:text-red-400 transition"
        >
          <Mail size={16} />
          <span>support@fabuzilo.com</span>
        </a>

        <div className="flex items-center space-x-1">
          <Phone size={16} />
          <span>+234 812 735 5827</span>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-2 p-1 rounded hover:bg-gray-700 transition"
          title="Toggle dark mode"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </div>
  );
}
