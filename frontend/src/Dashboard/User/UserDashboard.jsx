import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import Sidebar from "./Sidebar";
import Appointments from "./Appointments";
import Doctors from "./Doctors";
import Profile from "./Profile";
import DashboardHome from "./DashboardHome";
import ChatBot from "./ChatBot"; // Import the ChatBot component
// import { Home, Calendar, Stethoscope, User, Menu, X, LogOut, Plus, Clock, CheckCircle2, AlertCircle, Search, ChevronLeft, Video, XCircle, MapPin, RefreshCw, Edit3, Phone, Mail, Camera, Heart, Upload, Save, Star } from "lucide-react";

// Initialize socket connection once outside the component
const socket = io("http://localhost:3000"); // Ensure this URL is correct for your server


// --- Reusable Component: Booking Modal ---


// --- Reusable Component: Appointment Form ---


// --- Page Component: DashboardHome ---


// --- Page Component: Appointments ---


// --- Page Component: Doctors ---


// --- Page Component: Profile ---


// --- Page Component: ChatBot (Placeholder) ---


// --- Main Dashboard Component ---
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

