import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaThLarge, FaClipboardList, FaUsers, FaTasks, FaCheckDouble, FaSpinner, FaTrash } from "react-icons/fa";

const Sidebar = ({ user }) => {
  const location = useLocation();
  const path = location.pathname;

  // Define menu items
  const sidebarLinks = [
    { name: "Dashboard", path: "/", icon: <FaThLarge /> },
    { name: "Tasks", path: "/tasks", icon: <FaTasks /> },
    { name: "Completed", path: "/completed", icon: <FaCheckDouble /> }, // You can reuse Tasks page with filter
    { name: "In Progress", path: "/in-progress", icon: <FaSpinner /> },
    { name: "To Do", path: "/todo", icon: <FaClipboardList /> },
    { name: "Team", path: "/team", icon: <FaUsers /> },
  ];

  // Helper to check if link is active
  const isActive = (route) => path === route;

  return (
    <div className="w-full md:w-64 bg-white min-h-screen border-r border-gray-200 hidden md:flex flex-col">
      
      {/* Logo Area */}
      <div className="h-16 flex items-center px-8 border-b border-gray-100">
        <div className="text-2xl font-black text-blue-600 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg">T</div>
          <span>TaskFlow</span>
        </div>
      </div>

      {/* Menu Links */}
      <div className="flex-1 py-6 flex flex-col gap-2 px-4">
        {sidebarLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-full text-base font-medium transition-all ${
              isActive(link.path)
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}

        
      </div>
    </div>
  );
};

export default Sidebar;