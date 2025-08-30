import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Appointments from "./Appointments";
import Doctors from "./Doctors";
import Profile from "./Profile";
import ChatBot from "./ChatBot";
import DashboardHome from "./DashboardHome";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";

// Initialize socket connection
const socket = io("http://localhost:3000");

const UserDashboard = () => {
    const [activePage, setActivePage] = useState("home");
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            socket.emit('join-user-room', userId);
        }
        socket.on('session-created', ({ roomId }) => {
            navigate(`/video/${roomId}`);
        });
        return () => {
            socket.off('session-created');
        };
    }, [navigate]);

    const renderPage = () => {
        switch (activePage) {
            case "appointments": return <Appointments />;
            case "doctors": return <Doctors />;
            case "profile": return <Profile />;
            case "chatbot": return <ChatBot />;
            default: return <DashboardHome />;
        }
    };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      <main className="flex-1 lg:ml-0 overflow-y-auto">
        <div className="min-h-screen">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;

