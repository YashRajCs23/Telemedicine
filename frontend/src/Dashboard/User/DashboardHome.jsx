import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, AlertCircle, X, Search, ChevronLeft, Plus, Video, XCircle, MapPin } from "lucide-react";

// --- Reusable Booking Modal Component ---
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

// Sub-component for the booking form logic
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

// --- New "View All Appointments" Modal ---
const ViewAllAppointmentsModal = ({ onClose, allAppointments }) => {
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState('All');

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
    
    const getStatusInfo = (status) => {
        switch (status) {
            case 'accepted': return { text: 'Confirmed', color: 'bg-green-100 text-green-800' };
            case 'pending': return { text: 'Pending', color: 'bg-yellow-100 text-yellow-800' };
            case 'completed': return { text: 'Completed', color: 'bg-blue-100 text-blue-800' };
            case 'rejected': return { text: 'Cancelled', color: 'bg-red-100 text-red-800' };
            default: return { text: status, color: 'bg-gray-100 text-gray-800' };
        }
    };

    const getInitials = (name) => {
        if (!name) return 'Dr';
        const parts = name.replace("Dr. ", "").split(" ");
        return (parts[0]?.[0] + (parts[1]?.[0] || '')).toUpperCase();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-4 border-b">
                    <h3 className="text-xl font-bold text-gray-800">My Appointments</h3>
                    <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><X size={22} /></button>
                </div>
                <div className="flex space-x-1 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
                    {['All', 'Upcoming', 'Past'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-md font-medium text-sm ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>{tab}</button>
                    ))}
                </div>
                <div className="overflow-y-auto space-y-3">
                    {filteredAppointments.length > 0 ? filteredAppointments.map(appt => {
                        const statusInfo = getStatusInfo(appt.status);
                        return (
                        <div key={appt._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><span className="text-blue-600 font-semibold">{getInitials(appt.doctor.name)}</span></div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{appt.doctor.name}</h4>
                                    <p className="text-sm text-gray-500">{new Date(appt.appointmentDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {new Date(`1970-01-01T${appt.timeSlot}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusInfo.color}`}>{statusInfo.text}</span>
                        </div>
                    )}) : <p className="text-center text-gray-500 py-8">No appointments found in this category.</p>}
                </div>
            </div>
        </div>
    );
};


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

export default DashboardHome;

