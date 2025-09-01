import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import Appointments from "./Appointments";
import Doctors from "./Doctors";
import Profile from "./Profile";
import Settings from "./Settings";
import Header from "./Header";
import ChatBot from "./ChatBot";
import Notifications from "./Notifications";
import { useState } from "react";

const UserDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="chatbot" element={<ChatBot />} />
        </Routes>
      </main>
    </div>
  );
};

export default UserDashboard;
