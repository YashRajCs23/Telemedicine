// src/User/Sidebar.jsx
import { Calendar, Stethoscope, Bell, User, Settings } from "lucide-react";

const Sidebar = ({ setActivePage }) => {
  const menu = [
    { name: "Dashboard", icon: <Stethoscope />, page: "home" },
    { name: "Appointments", icon: <Calendar />, page: "appointments" },
    { name: "Doctors", icon: <Stethoscope />, page: "doctors" },
    { name: "Notifications", icon: <Bell />, page: "notifications" },
    { name: "Profile", icon: <User />, page: "profile" },
    { name: "Settings", icon: <Settings />, page: "settings" },
  ];

  return (
    <aside className="h-screen w-64 bg-blue-700 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">TeleHealth</h2>
      <nav className="space-y-2">
        {menu.map((item, i) => (
          <button
            key={i}
            onClick={() => setActivePage(item.page)}
            className="flex items-center w-full space-x-3 px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;