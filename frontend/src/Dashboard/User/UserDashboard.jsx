// src/User/UserDashboard.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import Appointments from "./Appointments";
import Doctors from "./Doctors";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Settings from "./Settings";

const UserDashboard = () => {
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    switch (activePage) {
      case "appointments":
        return <Appointments />;
      case "doctors":
        return <Doctors />;
      case "notifications":
        return <Notifications />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar setActivePage={setActivePage} />
      <main className="flex-1">{renderPage()}</main>
    </div>
  );
};

export default UserDashboard;