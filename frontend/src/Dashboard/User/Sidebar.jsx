import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Calendar,
  Stethoscope,
  Bell,
  User,
  Settings,
  Menu,
  X,
  Home,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/user/dashboard" },
    { name: "Appointments", icon: <Calendar size={18} />, path: "/user/dashboard/appointments" },
    { name: "Doctors", icon: <Stethoscope size={18} />, path: "/user/dashboard/doctors" },
    { name: "Notifications", icon: <Bell size={18} />, path: "/user/dashboard/notifications" },
    { name: "Profile", icon: <User size={18} />, path: "/user/dashboard/profile" },
    { name: "Settings", icon: <Settings size={18} />, path: "/user/dashboard/settings" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white shadow-lg border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-blue-600">TeleHealth</h2>
          <p className="text-sm text-gray-500 mt-1">Your Health, Our Priority</p>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 p-4 space-y-2">
          {menu.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              end
              className={({ isActive }) =>
                `
                flex items-center w-full space-x-3 px-4 py-3 rounded-lg
                transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `
              }
              onClick={() => setIsOpen(false)} // close menu on mobile
            >
              <span className="text-gray-400">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer user info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 px-4 py-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={16} className="text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Yash Srivastava
              </p>
              <p className="text-xs text-gray-500 truncate">Patient</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
