import React from "react";
import { Link, useLocation } from "react-router-dom";
import AvatarMenu from "./AvatarMenu";

export default function Topbar({ user, onLogout }) {
  const location = useLocation();
  const path = location.pathname;

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "Team", path: "/team" },
  ];

  return (
    <header className="h-16 w-full border-b bg-white flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-10">
        {/* Logo */}
        <h1 className="text-2xl font-black text-blue-600 tracking-tighter">TaskFlow</h1>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                path === link.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <AvatarMenu user={user} onLogout={onLogout} />
    </header>
  );
}