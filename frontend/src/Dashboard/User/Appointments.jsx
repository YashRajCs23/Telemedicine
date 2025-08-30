import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Video, Plus, AlertCircle, XCircle, X, Search, ChevronLeft, RefreshCw } from "lucide-react";

// --- Reusable Booking Modal Component (from previous step) ---
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
                             <button onClick={() => setView('list')} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                                <ChevronLeft size={22} />
                            </button>
                        )}
                        <div>
                             <h3 className="text-xl font-bold text-gray-800">
                                {view === 'list' ? 'Select a Doctor' : 'Book Appointment'}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {view === 'form' && `with ${selectedDoctor.name}`}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><X size={22} /></button>
                </div>
                {view === 'list' ? (
                    <div className="flex flex-col flex-grow min-h-0">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name or specialty..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="overflow-y-auto space-y-2">
                             {loading ? <p>Loading doctors...</p> : error ? <p className="text-red-500">{error}</p> : 
                                filteredDoctors.map(doc => (
                                    <div key={doc._id} onClick={() => handleSelectDoctor(doc)} className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-blue-600 font-semibold">{getInitials(doc.name)}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{doc.name}</p>
                                            <p className="text-sm text-gray-500">{doc.speciality}</p>
                                        </div>
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

// --- Main Appointments Component ---
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
            if (!data.success) {
                throw new Error(data.message || "Could not create video session.");
            }
        } catch (err) {
            setError(err.message);
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
                                    <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-semibold hover:bg-gray-200"><RefreshCw size={16}/><span>Reschedule</span></button>
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
}

export default Appointments;