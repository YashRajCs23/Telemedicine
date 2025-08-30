import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import Appointments from "./Appointments";
import Doctors from "./Doctors";
import Profile from "./Profile";
import Settings from "./Settings";
import Header from "./Header";
import ChatBot from "./ChatBot";
import Notifications from "./Notifications"; // ✅ You forgot this import

const UserDashboard = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header always on top */}
        <Header />

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
    </div>
  );
};

export default UserDashboard;
