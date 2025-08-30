import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import Appointments from "./Appointments";
import Doctors from "./Doctors";
import Profile from "./Profile";
<<<<<<< HEAD
import Settings from "./Settings";
import Header from "./Header";

const UserDashboard = () => {
=======
import ChatBot from "./ChatBot";

const UserDashboard = () => {
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    switch (activePage) {
      case "appointments":
        return <Appointments />;
      case "doctors":
        return <Doctors />;
      case "profile":
        return <Profile />;
      case "chatbot":
        return <ChatBot />
      default:
        return <DashboardHome />;
    }
  };

>>>>>>> a922a95bf75ee2c488cd5f565d0c9a0ca792a6b1
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
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;