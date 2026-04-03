// src/components/Sidebar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

const links = [
  { to: "/", label: "Dashboard", icon: "📊" },
  { to: "/transactions", label: "Transactions", icon: "💳" },
  { to: "/insights", label: "Insights", icon: "💡" },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const { role, setRole, darkMode, setDarkMode } = useApp();
  const [open, setOpen] = useState(false); // mobile menu

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold text-blue-600">FinTrack</h1>
        <button onClick={() => setOpen(!open)} className="text-gray-600 dark:text-gray-300 text-xl">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden fixed top-12 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                pathname === link.to
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}

           <div className="border-t border-gray-100 dark:border-gray-700 pt-2 mt-1 flex items-center justify-between gap-2">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex-1 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-52 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex-col p-4 gap-2 min-h-screen">
        <h1 className="text-xl font-bold text-blue-600 mb-4">FinTrack</h1>

        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === link.to
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}

        <div className="mt-auto flex flex-col gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span>{darkMode ? "☀️" : "🌙"}</span>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Role switcher */}
          <div>
            <p className="text-xs text-gray-400 mb-1">Role</p>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">
              {role === "admin" ? "Can add/edit data" : "Read only"}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
