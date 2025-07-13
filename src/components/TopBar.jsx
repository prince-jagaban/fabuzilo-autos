"use client";

import { useEffect, useState } from "react";
import { Clock, Mail, Phone, Sun, Moon } from "lucide-react";

export default function TopBar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className=" bg-gray-900 dark:bg-gray-800 text-white text-sm shadow-md">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Left: Operating Hours */}
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-400" />
          <span className="text-gray-300">Mon - Fri:</span>
          <span className="font-medium text-white">8:00 AM – 6:00 PM</span>
        </div>

        {/* Right: Contact + Toggle */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <a
            href="mailto:support@fabuzilo.com"
            className="flex items-center gap-1 hover:text-red-400 transition"
          >
            <Mail size={16} />
            <span>support@fabuzilo.com</span>
          </a>

          <div className="flex items-center gap-1">
            <Phone size={16} />
            <span>+234 812 735 5827</span>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-1 p-1 rounded hover:bg-gray-700 transition"
            title="Toggle dark mode"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
