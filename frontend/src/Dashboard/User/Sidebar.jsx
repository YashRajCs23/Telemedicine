import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Calendar, Stethoscope, User, Menu, X, LogOut, Bot } from "lucide-react";

// --- Reusable Component: Sidebar ---
const Sidebar = ({ setActivePage, activePage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState('Patient');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const response = await fetch(`http://localhost:3000/user/profile/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUserName(data.name);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch user data for sidebar:", error);
            }
        };
        fetchUserData();
    }, []);

    const menu = [
        { name: "Dashboard", icon: <Home />, page: "home" },
        { name: "Appointments", icon: <Calendar />, page: "appointments" },
        { name: "Doctors", icon: <Stethoscope />, page: "doctors" },
        { name: "ChatBot", icon: <Bot />, page: "chatbot" },
        { name: "Profile", icon: <User />, page: "profile" },
        
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/user/logout', { method: 'POST' });
        } catch (error) {
            console.error("Logout request failed:", error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/');
        }
    };

    return (
        <>
            <button onClick={toggleSidebar} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-lg">
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            {isOpen && <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar} />}
            <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-blue-600">DOXY</h2>
                    <p className="text-sm text-gray-500 mt-1">Your Health, Our Priority</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {menu.map((item, i) => (
                        <button key={i} onClick={() => { setActivePage(item.page); setIsOpen(false); }} className={`flex items-center w-full space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${activePage === item.page ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                            <span className={activePage === item.page ? 'text-blue-600' : 'text-gray-400'}>{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 px-4 py-2 mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"><User size={16} className="text-blue-600" /></div>
                        <div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-900 truncate">{userName}</p><p className="text-xs text-gray-500 truncate">Patient</p></div>
                    </div>
                    <button onClick={handleLogout} className="flex items-center w-full space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-red-600 hover:bg-red-50">
                        <span className="text-red-500"><LogOut /></span>
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

<<<<<<< HEAD
export default Sidebar;
=======
export default Sidebar;

>>>>>>> 57e95d347cab54a53f963bd6664ddca27442f6f7
