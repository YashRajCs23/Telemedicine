<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { 
    Home, Calendar, Stethoscope, User, Menu, X, LogOut, Plus, 
    Clock, CheckCircle2, AlertCircle, Search, ChevronLeft, Video, 
    XCircle, MapPin, RefreshCw, Edit3, Phone, Mail, Camera, Heart, 
    Upload, Save, Star
} from "lucide-react";

// Initialize socket connection once
const socket = io("http://localhost:3000");

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
        { name: "Profile", icon: <User />, page: "profile" }
    ];
=======
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
>>>>>>> 57e95d347cab54a53f963bd6664ddca27442f6f7

    const toggleSidebar = () => setIsOpen(!isOpen);

<<<<<<< HEAD
    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/user/logout', { method: 'POST' });
        } catch (error) {
            console.error("Logout request failed:", error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/login'); // Redirect to user login page
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
                    <h2 className="text-2xl font-bold text-blue-600">TeleHealth</h2>
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

// --- Reusable Component: Booking Modal ---
const BookingModal = ({ onClose, onAppointmentBooked }) => {
    const [view, setView] = useState('list');
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDoctorsList = async () => {
            try {
                const response = await fetch('http://localhost:3000/doctor');
                if (!response.ok) throw new Error("Could not fetch doctors list.");
                const data = await response.json();
                setDoctors(data);
                setFilteredDoctors(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctorsList();
    }, []);
    
    useEffect(() => {
        const result = doctors.filter(doc => 
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDoctors(result);
    }, [searchTerm, doctors]);

    const handleSelectDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setView('form');
    };
    
    const getInitials = (name) => {
        if (!name) return 'Dr';
        const parts = name.replace("Dr. ", "").split(" ");
        return (parts[0]?.[0] + (parts[1]?.[0] || '')).toUpperCase();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-4 border-b">
                    <div className="flex items-center gap-2">
                        {view === 'form' && (
                             <button onClick={() => setView('list')} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><ChevronLeft size={22} /></button>
                        )}
                        <div>
                             <h3 className="text-xl font-bold text-gray-800">{view === 'list' ? 'Select a Doctor' : 'Book Appointment'}</h3>
                            <p className="text-gray-600 text-sm">{view === 'form' && `with ${selectedDoctor.name}`}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><X size={22} /></button>
                </div>
                {view === 'list' ? (
                    <div className="flex flex-col flex-grow min-h-0">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input type="text" placeholder="Search by name or specialty..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                        </div>
                        <div className="overflow-y-auto space-y-2">
                             {loading ? <p>Loading doctors...</p> : error ? <p className="text-red-500">{error}</p> : 
                                filteredDoctors.map(doc => (
                                    <div key={doc._id} onClick={() => handleSelectDoctor(doc)} className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3"><span className="text-blue-600 font-semibold">{getInitials(doc.name)}</span></div>
                                        <div><p className="font-semibold text-gray-800">{doc.name}</p><p className="text-sm text-gray-500">{doc.speciality}</p></div>
                                    </div>
                                ))
                             }
                        </div>
                    </div>
                ) : (
                    <AppointmentForm doctor={selectedDoctor} onAppointmentBooked={onAppointmentBooked} />
                )}
            </div>
        </div>
    );
};

// --- Reusable Component: Appointment Form ---
const AppointmentForm = ({ doctor, onAppointmentBooked }) => {
    const [appointmentDate, setAppointmentDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [reason, setReason] = useState('');
    const [availableSlots, setAvailableSlots] = useState({});
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const potentialTimeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

    useEffect(() => {
        const checkAvailability = async () => {
            if (!appointmentDate) return;
            setLoadingSlots(true);
            setTimeSlot('');
            const availability = {};
            for (const slot of potentialTimeSlots) {
                try {
                    const response = await fetch(`http://localhost:3000/appointments/check-slot`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ doctorId: doctor._id, appointmentDate, timeSlot: slot }),
                    });
                    const data = await response.json();
                    availability[slot] = data.available;
                } catch (err) { availability[slot] = false; }
            }
            setAvailableSlots(availability);
            setLoadingSlots(false);
        };
        checkAvailability();
    }, [appointmentDate, doctor._id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setSuccess('');
        if (!appointmentDate || !timeSlot || !reason) {
            setError("Please fill in all fields."); return;
        }
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError("You must be logged in to book an appointment."); return;
            }
            const response = await fetch(`http://localhost:3000/appointments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, doctorId: doctor._id, appointmentDate, timeSlot, reason }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to book appointment.");
            setSuccess("Appointment booked successfully!");
            setTimeout(onAppointmentBooked, 1500);
        } catch (err) {
            setError(err.message);
        }
    };
    
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="overflow-y-auto">
             {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}
             {success && <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{success}</div>}
             <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                    <input type="date" min={today} value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} className="w-full p-3 border rounded-lg"/>
                </div>
                {appointmentDate && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
                        {loadingSlots ? <p>Checking availability...</p> : (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {potentialTimeSlots.map(slot => (
                                    <button key={slot} type="button" onClick={() => setTimeSlot(slot)} disabled={!availableSlots[slot]}
                                        className={`p-2 rounded-lg text-sm transition-colors ${timeSlot === slot ? 'bg-blue-600 text-white' : availableSlots[slot] ? 'bg-gray-100 hover:bg-blue-100' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                                        {new Date(`1970-01-01T${slot}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                    <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows="3" placeholder="Briefly describe the reason for your appointment..." className="w-full p-3 border rounded-lg"/>
                </div>
                <div className="pt-2">
                    <button type="submit" className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700" disabled={!!success}>
                        Confirm Booking
                    </button>
                </div>
            </form>
        </div>
    );
};

// --- Page Component: DashboardHome ---
const DashboardHome = () => {
    const [userName, setUserName] = useState('User');
    const [stats, setStats] = useState({ total: 0, upcoming: 0, completed: 0, pending: 0 });
    const [allAppointments, setAllAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) throw new Error("User ID not found. Please log in.");

            const userResponse = await fetch(`http://localhost:3000/user/profile/${userId}`);
            if (userResponse.ok) {
                const userData = await userResponse.json();
                setUserName(userData.name.split(' ')[0]);
            }

            const apptResponse = await fetch(`http://localhost:3000/appointments/user/${userId}`);
            if (apptResponse.ok) {
                const appointments = await apptResponse.json();
                setAllAppointments(appointments);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const upcoming = appointments.filter(a => new Date(a.appointmentDate) >= today && !['completed', 'rejected'].includes(a.status));
                
                setStats({
                    total: appointments.length,
                    upcoming: upcoming.length,
                    completed: appointments.filter(a => a.status === 'completed').length,
                    pending: appointments.filter(a => a.status === 'pending').length
                });

                setUpcomingAppointments(upcoming.sort((a,b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)).slice(0, 2));
            }
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const getInitials = (name) => {
        if (!name) return 'Dr';
        const parts = name.replace("Dr. ", "").split(" ");
        return (parts[0]?.[0] + (parts[1]?.[0] || '')).toUpperCase();
    };

    if (loading) return <div className="p-6 text-center">Loading your dashboard...</div>;

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto">
            {isBookingModalOpen && <BookingModal onClose={() => setIsBookingModalOpen(false)} onAppointmentBooked={() => { setIsBookingModalOpen(false); fetchData(); }} />}
            {isViewAllModalOpen && <ViewAllAppointmentsModal onClose={() => setIsViewAllModalOpen(false)} allAppointments={allAppointments} />}
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-blue-50 rounded-xl">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}! 👋</h1>
                    <p className="text-gray-600 mt-1">Here's a summary of your health activities.</p>
                </div>
                <button onClick={() => setIsBookingModalOpen(true)} className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                    <Plus size={18} />
                    <span>Book an Appointment</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-5 rounded-xl flex items-center gap-4"><div className="bg-white p-3 rounded-full shadow-sm"><Calendar className="w-6 h-6 text-blue-600" /></div><div><p className="text-sm text-gray-600">Total</p><p className="text-2xl font-bold text-gray-900">{stats.total}</p></div></div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-5 rounded-xl flex items-center gap-4"><div className="bg-white p-3 rounded-full shadow-sm"><Clock className="w-6 h-6 text-orange-600" /></div><div><p className="text-sm text-gray-600">Upcoming</p><p className="text-2xl font-bold text-gray-900">{stats.upcoming}</p></div></div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-5 rounded-xl flex items-center gap-4"><div className="bg-white p-3 rounded-full shadow-sm"><CheckCircle2 className="w-6 h-6 text-green-600" /></div><div><p className="text-sm text-gray-600">Completed</p><p className="text-2xl font-bold text-gray-900">{stats.completed}</p></div></div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl flex items-center gap-4"><div className="bg-white p-3 rounded-full shadow-sm"><AlertCircle className="w-6 h-6 text-yellow-600" /></div><div><p className="text-sm text-gray-600">Pending</p><p className="text-2xl font-bold text-gray-900">{stats.pending}</p></div></div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                     <button onClick={() => setIsViewAllModalOpen(true)} className="text-sm font-semibold text-blue-600 hover:text-blue-800">View All</button>
                </div>
                <div className="space-y-4">
                    {upcomingAppointments.length > 0 ? upcomingAppointments.map(appt => (
                         <div key={appt._id} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg">
                             <div className="flex items-center space-x-4">
                                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border"><span className="text-blue-600 font-semibold">{getInitials(appt.doctor.name)}</span></div>
                                 <div>
                                     <h3 className="font-semibold text-gray-900">{appt.doctor.name}</h3>
                                     <p className="text-sm text-gray-500">{appt.doctor.speciality}</p>
                                 </div>
                             </div>
                             <div className="text-right">
                                 <p className="font-medium text-gray-900">{new Date(appt.appointmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</p>
                                 <p className="text-sm text-gray-500">{new Date(`1970-01-01T${appt.timeSlot}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                             </div>
                         </div>
                    )) : (
                        <div className="text-center py-8">
                            <Calendar size={32} className="mx-auto text-gray-400 mb-2"/>
                            <p className="text-gray-500">You have no upcoming appointments.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Page Component: Appointments ---
const Appointments = () => {
    const [allAppointments, setAllAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState('Upcoming');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) throw new Error("User not found. Please log in.");
            
            const response = await fetch(`http://localhost:3000/appointments/user/${userId}`);
            if (!response.ok) throw new Error("Failed to fetch your appointments.");
            
            const data = await response.json();
            setAllAppointments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let filtered = allAppointments;
        if (activeTab === 'Upcoming') {
            filtered = allAppointments.filter(appt => new Date(appt.appointmentDate) >= today && !['completed', 'rejected'].includes(appt.status));
            filtered.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
        } else if (activeTab === 'Past') {
            filtered = allAppointments.filter(appt => new Date(appt.appointmentDate) < today || ['completed', 'rejected'].includes(appt.status));
            filtered.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));
        } else {
            filtered.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));
        }
        setFilteredAppointments(filtered);
    }, [activeTab, allAppointments]);

    const handleCancelAppointment = async (appointmentId) => {
        if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
        try {
            await fetch(`http://localhost:3000/appointments/${appointmentId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'rejected' }),
            });
            fetchAppointments();
        } catch (err) {
            setError("Failed to cancel appointment. Please try again.");
        }
    };

    const handleJoinCall = async (appointmentId) => {
        try {
            const response = await fetch('http://localhost:3000/sessions/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ appointmentId }),
            });
            const data = await response.json();
            if (!data.success) throw new Error(data.message);
        } catch (error) {
            setError("Error: Could not start video session.");
        }
    };
    
    const getStatusInfo = (status) => {
        switch (status) {
            case 'accepted': return { text: 'Confirmed', color: 'bg-green-100 text-green-800 border-green-200' };
            case 'pending': return { text: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
            case 'completed': return { text: 'Completed', color: 'bg-blue-100 text-blue-800 border-blue-200' };
            case 'rejected': return { text: 'Cancelled', color: 'bg-red-100 text-red-800 border-red-200' };
            default: return { text: status, color: 'bg-gray-100 text-gray-800 border-gray-200' };
        }
    };

    const getInitials = (name) => {
        if (!name) return 'Dr';
        const parts = name.replace("Dr. ", "").split(" ");
        return (parts[0]?.[0] + (parts[1]?.[0] || '')).toUpperCase();
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {isBookingModalOpen && <BookingModal onClose={() => setIsBookingModalOpen(false)} onAppointmentBooked={() => { setIsBookingModalOpen(false); fetchAppointments(); }} />}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
                    <p className="text-gray-600 mt-1">Manage your upcoming and past appointments</p>
                </div>
                <button onClick={() => setIsBookingModalOpen(true)} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold w-full sm:w-auto justify-center">
                    <Plus size={20} />
                    <span>Book New Appointment</span>
                </button>
            </div>
            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
                {['Upcoming', 'Past', 'All'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-md font-medium transition-colors text-sm ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>{tab}</button>
                ))}
            </div>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 flex items-center gap-2"><AlertCircle size={18}/> {error}</div>}
            {loading ? (
                <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="bg-white p-6 rounded-xl shadow-sm border animate-pulse h-48"></div>)}</div>
            ) : filteredAppointments.length > 0 ? (
                <div className="space-y-4">
                    {filteredAppointments.map((appt) => {
                        const statusInfo = getStatusInfo(appt.status);
                        return (
                        <div key={appt._id} className="bg-white p-6 rounded-xl shadow-sm border transition-shadow hover:shadow-md">
                            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                                <div className="flex items-start space-x-4">
                                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600 font-semibold text-xl">{getInitials(appt.doctor.name)}</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-xl font-semibold text-gray-900">{appt.doctor.name}</h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusInfo.color}`}>{statusInfo.text}</span>
                                        </div>
                                        <p className="text-gray-500">{appt.doctor.speciality}</p>
                                    </div>
                                </div>
                                <div className="w-full sm:w-auto flex flex-wrap gap-2 pt-2 sm:pt-0">
                                    {appt.status === 'accepted' && <button onClick={() => handleJoinCall(appt._id)} className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700"><Video size={16} /><span>Join Call</span></button>}
                                    {['pending', 'accepted'].includes(appt.status) && <button onClick={() => handleCancelAppointment(appt._id)} className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-100 text-red-800 rounded-md text-sm font-semibold hover:bg-red-200"><XCircle size={16}/><span>Cancel</span></button>}
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center space-x-2 text-gray-600"><Calendar size={16} className="text-gray-400" /><span>{new Date(appt.appointmentDate).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}</span></div>
                                <div className="flex items-center space-x-2 text-gray-600"><Clock size={16} className="text-gray-400" /><span>{new Date(`1970-01-01T${appt.timeSlot}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span></div>
                                <div className="flex items-center space-x-2 text-gray-600"><MapPin size={16} className="text-gray-400" /><span>{appt.doctor.locality || 'Video Consultation'}</span></div>
                            </div>
                        </div>
                    )})}
                </div>
            ) : (
                <div className="text-center py-16 bg-gray-50 rounded-xl">
                    <Calendar size={40} className="mx-auto text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 mt-4">No appointments found</h3>
                    <p className="text-gray-500 mt-1">You have no {activeTab.toLowerCase()} appointments.</p>
                </div>
            )}
        </div>
    );
};

// --- Page Component: Doctors ---
const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [specialties, setSpecialties] = useState(["All"]);
    const [activeSpecialty, setActiveSpecialty] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('http://localhost:3000/doctor');
            if (!response.ok) throw new Error("Failed to fetch doctors list.");
            const data = await response.json();
            setDoctors(data);
            setFilteredDoctors(data);
            const uniqueSpecialties = ["All", ...new Set(data.map(doc => doc.speciality))];
            setSpecialties(uniqueSpecialties);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    useEffect(() => {
        let result = doctors;
        if (activeSpecialty !== "All") {
            result = result.filter(doctor => doctor.speciality === activeSpecialty);
        }
        if (searchTerm) {
            result = result.filter(doctor => 
                doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredDoctors(result);
    }, [searchTerm, activeSpecialty, doctors]);
    
    const getInitials = (name) => {
        if (!name) return 'Dr';
        const names = name.split(' ');
        return (names[0]?.[0] + (names[1]?.[0] || '')).toUpperCase();
    };
    
    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setIsBookingModalOpen(true);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {isBookingModalOpen && <BookingModal onClose={() => setIsBookingModalOpen(false)} onAppointmentBooked={() => setIsBookingModalOpen(false)} />}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Find Doctors</h1>
                <p className="text-gray-600 mt-1">Book appointments with qualified healthcare professionals</p>
            </div>
            <div className="mb-6 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="text" placeholder="Search by doctor name or specialty..." className="w-full pl-10 pr-4 py-3 border rounded-lg" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                    {specialties.map((specialty) => (
                        <button key={specialty} onClick={() => setActiveSpecialty(specialty)} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${activeSpecialty === specialty ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                            {specialty}
                        </button>
                    ))}
                </div>
            </div>
            {loading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(3)].map((_, i) => <div key={i} className="bg-white p-6 rounded-xl shadow-sm border animate-pulse h-64"></div>)}</div> : 
            error ? <div className="text-center py-12 text-red-600 bg-red-50 rounded-lg"><AlertCircle className="mx-auto h-12 w-12 mb-4" /><h3 className="text-lg font-semibold">An Error Occurred</h3><p>{error}</p></div> : 
            filteredDoctors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDoctors.map((doctor) => (
                        <div key={doctor._id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition-all flex flex-col">
                            <div className="flex-grow">
                                <div className="flex items-start space-x-4 mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center"><span className="text-white font-semibold text-lg">{getInitials(doctor.name)}</span></div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                                        <p className="text-blue-600 font-medium">{doctor.speciality}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm"><span className="text-gray-500">Experience</span><span className="font-medium text-gray-900">{doctor.yearsOfExperience || 0} years</span></div>
                                    <div className="flex items-start space-x-2 text-sm"><MapPin size={14} className="text-gray-400 mt-0.5" /><span className="text-gray-600">{doctor.locality || 'Location not specified'}</span></div>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t">
                                <button onClick={() => handleBookAppointment(doctor)} className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <div className="text-center py-12"><div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><Search size={32} className="text-gray-400" /></div><h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3><p className="text-gray-500">Try adjusting your search criteria.</p></div>}
        </div>
    );
}

// --- Page Component: Profile ---
const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchUserProfile = async () => {
        try {
            const userId = localStorage.getItem('userId'); 
            if (!userId) throw new Error("User not logged in.");
            const response = await fetch(`http://localhost:3000/user/profile/${userId}`);
            if (!response.ok) throw new Error("Failed to fetch profile data.");
            const data = await response.json();
            setUser(data);
            setFormData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);
    
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setFormData(user);
        setError('');
        setSuccess('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setError(''); setSuccess('');
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:3000/user/profile/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update profile.");
            }
            await fetchUserProfile();
            setSuccess("Profile updated successfully!");
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    if (loading) return <div>Loading Profile...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
             <div className="flex justify-between items-center mb-6">
                 <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-600 mt-1">Manage your personal information</p>
                </div>
                {!isEditing && (
                    <button onClick={handleEditToggle} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Edit3 size={16} />
                        <span>Edit Profile</span>
                    </button>
                )}
            </div>
            
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{success}</div>}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <div className="text-center mb-6">
                            <div className="relative inline-block">
                                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto"><span className="text-white text-4xl font-semibold">{getInitials(user.name)}</span></div>
                                <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700"><Camera size={16} /></button>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mt-4">{user.name}</h2>
                            <p className="text-gray-500">Patient</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-gray-600"><Mail size={18} className="text-blue-500" /><span className="text-sm">{user.email}</span></div>
                             <div className="flex items-center space-x-3 text-gray-600"><Phone size={18} className="text-blue-500" /><span className="text-sm">{user.phoneNumber}</span></div>
                            <div className="flex items-center space-x-3 text-gray-600"><MapPin size={18} className="text-blue-500" />
                                {isEditing ? <input type="text" name="locality" value={formData.locality || ''} onChange={handleChange} className="w-full text-sm border-b focus:outline-none focus:border-blue-500"/> : <span className="text-sm">{user.locality}</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                {isEditing ? <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full p-2 border rounded-md"/> : <p className="text-gray-900">{user.name}</p>}
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Language</label>
                                 {isEditing ? (
                                    <select name="language" value={formData.language} onChange={handleChange} className="w-full p-2 border rounded-md">
                                        <option value="english">English</option>
                                        <option value="hindi">Hindi</option>
                                    </select>
                                ) : <p className="text-gray-900 capitalize">{user.language}</p>}
                            </div>
                        </div>
                    </div>
                    {isEditing && (
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Actions</h3>
                            <div className="flex flex-wrap gap-3">
                                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"><Save size={16}/> Save Changes</button>
                                <button onClick={handleEditToggle} className="flex items-center gap-2 px-4 py-2 border text-gray-600 rounded-lg hover:bg-gray-50"><X size={16}/> Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Page Component: ChatBot (Placeholder) ---
const ChatBot = () => {
    return <div className="p-6"><h1 className="text-2xl font-bold">ChatBot</h1><p>Chatbot functionality coming soon.</p></div>;
};

// --- Main UserDashboard Component ---
const UserDashboard = () => {
    const [activePage, setActivePage] = useState("home");
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        
        const handleConnect = () => {
            if (userId) {
                socket.emit('join-user-room', userId);
            }
        };

        const handleSessionCreated = ({ roomId }) => {
            navigate(`/video/${roomId}`);
        };

        if (socket.connected) {
            handleConnect();
        } else {
            socket.on('connect', handleConnect);
        }

        socket.on('session-created', handleSessionCreated);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('session-created', handleSessionCreated);
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

=======
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
>>>>>>> 57e95d347cab54a53f963bd6664ddca27442f6f7
