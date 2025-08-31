import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { 
    Calendar, Users, Clock, Bell, LayoutDashboard, Settings, LogOut, 
    HeartPulse, Stethoscope, BriefcaseMedical, Menu, X, Plus, Edit2, 
    Trash2, User, Video, UserX,Search, AlertCircle, CheckCircle, Save, Phone, 
    Mail, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Initialize socket connection once
const socket = io("http://localhost:3000");

// --- Component: Sidebar ---
const Sidebar = ({ activeTab, setActiveTab, isMobileOpen, onClose }) => {
    const navigate = useNavigate();
    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, tab: 'dashboard' },
        { name: 'Appointments', icon: Calendar, tab: 'appointments' },
        { name: 'Patients', icon: Users, tab: 'patients' },
        { name: 'Profile', icon: HeartPulse, tab: 'profile' },
        { name: 'Settings', icon: Settings, tab: 'settings' },
    ];
 
    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/doctor/logout', { method: 'POST' });
        } catch (error) {
            console.error('Logout request failed:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('doctorId');
            navigate('/'); 
        }
    };

    return (
        <>
            {isMobileOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}
            <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-gray-900 text-white p-6 shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center"><Stethoscope size={32} className="text-blue-500 mr-2" /><span className="text-xl font-bold"><Link to='/'>DOXY</Link></span></div>
                    <button onClick={onClose} className="lg:hidden p-2 text-gray-400 hover:bg-gray-800 rounded-lg"><X size={20} /></button>
                </div>
                <nav className="flex-1">
                    <ul className="space-y-2">
                        {menuItems.map(item => (
                            <li key={item.tab}>
                                <button onClick={() => { setActiveTab(item.tab); onClose(); }} className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === item.tab ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
                                    <item.icon size={20} className="mr-3" />
                                    <span>{item.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="mt-auto">
                    <button onClick={handleLogout} className="flex items-center w-full p-3 rounded-lg text-red-400 hover:bg-gray-800 transition-colors">
                        <LogOut size={20} className="mr-3" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

// --- Component: DoctorNavbar ---
const DoctorNavbar = ({ onMenuClick }) => {
    const [notificationCount, setNotificationCount] = useState(0);
    const [doctorName, setDoctorName] = useState('');
    
    const getInitials = (name) => {
        if (!name) return 'Dr';
        const names = name.split(' ');
        if (names.length === 1) return names[0].charAt(0).toUpperCase();
        return (names[0].charAt(0) + (names[names.length - 1] ? names[names.length - 1].charAt(0) : '')).toUpperCase();
    };

    const fetchNavbarData = async () => {
        try {
            const doctorId = localStorage.getItem('doctorId');
            if (!doctorId) return;
            const appointmentsResponse = await fetch(`http://localhost:3000/appointments/doctor/${doctorId}`);
            if (appointmentsResponse.ok) {
                const appointments = await appointmentsResponse.json();
                setNotificationCount(appointments.filter(apt => apt.status === 'pending').length);
            }
            const profileResponse = await fetch(`http://localhost:3000/doctor/profile/${doctorId}`);
            if (profileResponse.ok) {
                const profileData = await profileResponse.json();
                setDoctorName(profileData.name || 'Doctor');
            }
        } catch (error) {
            console.error("Error fetching navbar data:", error);
        }
    };
    
    useEffect(() => {
        fetchNavbarData();
        socket.on('new-appointment', fetchNavbarData);
        return () => socket.off('new-appointment', fetchNavbarData);
    }, []);

    return (
        <header className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button onClick={onMenuClick} className="lg:hidden p-2 text-gray-600 rounded-lg"><Menu size={20} /></button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Good Morning, Dr. {doctorName.split(' ').pop()}! 👋</h1>
                        <p className="text-gray-600 text-sm">Ready to help your patients today?</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        {/* <button className="p-2 text-gray-600 rounded-lg relative">
                            <Bell size={20} />
                            {notificationCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">{notificationCount}</span>}
                        </button> */}
                    </div>
                    {/* <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center"><span className="text-white text-sm font-medium">{getInitials(doctorName)}</span></div> */}
                </div>
            </div>
        </header>
    );
};

// --- Page Component: DashboardHome ---
const DashboardHome = ({ setActiveTab }) => {
    const [stats, setStats] = useState({ today: 0, active: 0, pending: 0 });
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const doctorId = localStorage.getItem("doctorId");
                if (!doctorId) throw new Error("Doctor ID not found.");

                const response = await fetch(`http://localhost:3000/appointments/doctor/${doctorId}`);
                if (!response.ok) throw new Error("Failed to fetch dashboard data.");

                const appointments = await response.json();
                
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const todaysAppointments = appointments.filter(apt => new Date(apt.appointmentDate).setHours(0, 0, 0, 0) === today.getTime());

                setStats({
                    today: todaysAppointments.length,
                    active: new Set(appointments.map(apt => apt.user?._id).filter(Boolean)).size,
                    pending: appointments.filter(apt => apt.status === 'pending').length,
                });

                const upcoming = todaysAppointments
                    .filter(apt => apt.status === 'pending' || apt.status === 'accepted')
                    .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot))
                    .map(apt => ({
                        id: apt._id,
                        patient: apt.user?.name || 'Unknown Patient',
                        time: new Date(`1970-01-01T${apt.timeSlot}:00`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
                        type: 'Video Consultation',
                        avatar: (apt.user?.name || 'UP').split(' ').map(n => n[0]).join('')
                    }));
                setUpcomingAppointments(upcoming);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    // RECTIFIED: This function now directly handles navigation
    const handleJoinCall = async (appointmentId) => {
        try {
            const response = await fetch('http://localhost:3000/sessions/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ appointmentId }),
            });
            const data = await response.json();
            if (!data.success) throw new Error(data.message);
            
            navigate(`/video/${data.roomId}`);
        } catch (error) {
            alert("Error: Could not start the video session.");
        }
    };

    if (error) return <div className="p-6 text-center text-red-600 bg-red-50 rounded-lg m-4"><AlertCircle className="mx-auto h-12 w-12 mb-4" /><h2 className="text-lg font-semibold">Could not load dashboard</h2><p>{error}</p></div>;

    const statsCards = [
        { title: "Today's Appointments", value: loading ? '...' : stats.today, change: "Scheduled for today", color: "blue", icon: Calendar, action: () => setActiveTab('appointments') },
        { title: "Active Patients", value: loading ? '...' : stats.active, change: "Total unique patients", color: "green", icon: Users, action: () => setActiveTab('patients') },
        { title: "Pending Requests", value: loading ? '...' : stats.pending, change: "Need confirmation", color: "yellow", icon: Clock, action: () => setActiveTab('appointments') }
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statsCards.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md cursor-pointer" onClick={stat.action}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                                <p className="text-sm mt-2 text-gray-500">{stat.change}</p>
                            </div>
                            <div className={`p-3 rounded-lg bg-${stat.color}-100`}><stat.icon size={24} className={`text-${stat.color}-600`} /></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Today's Upcoming Appointments</h2>
                    <button onClick={() => setActiveTab('appointments')} className="text-blue-600 hover:text-blue-700 font-medium">View all →</button>
                </div>
                <div className="space-y-4">
                    {loading ? <div className="text-center">Loading...</div> : upcomingAppointments.length > 0 ? (
                        upcomingAppointments.map(appointment => (
                            <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><span className="text-blue-600 font-medium text-sm">{appointment.avatar}</span></div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">{appointment.patient}</h3>
                                        <p className="text-sm text-gray-600">{appointment.time} • {appointment.type}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleJoinCall(appointment.id)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Join</button>
                            </div>
                        ))
                    ) : <div className="text-center py-8 text-gray-500"><Calendar size={32} className="mx-auto mb-2" /><p>No upcoming appointments for today.</p></div>}
                </div>
            </div>
        </div>
    );
};

// --- Page Component: ManageAppointments ---
const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    
    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const doctorId = localStorage.getItem("doctorId");
            if (!doctorId) throw new Error("Doctor ID not found.");
            const response = await fetch(`http://localhost:3000/appointments/doctor/${doctorId}`);
            if (!response.ok) throw new Error(`Failed to fetch appointments.`);
            const data = await response.json();
            setAppointments(data.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleStatusChange = async (appointmentId, newStatus) => {
        try {
            await fetch(`http://localhost:3000/appointments/${appointmentId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            fetchAppointments();
            setSuccessMessage('Status updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Could not update status.');
        }
    };
    
    // RECTIFIED: This function now directly handles navigation
    const handleJoinCall = async (appointmentId) => {
        try {
            const response = await fetch('http://localhost:3000/sessions/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ appointmentId }),
            });
            const data = await response.json();
            if (!data.success) throw new Error(data.message);
            
            navigate(`/video/${data.roomId}`);
        } catch (error) {
            alert("Error: Could not start video session.");
        }
    };

    const getInitials = (name) => {
        if (!name) return '??';
        return name.split(' ').map(n => n[0]).join('');
    };

    return (
        <div className="p-6 bg-gray-50 min-h-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Appointments</h1>
            {successMessage && <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-6 flex items-center gap-2"><CheckCircle size={20} />{successMessage}</div>}
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">{error}</div>}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y">
                            {loading ? <tr><td colSpan="4" className="text-center py-12">Loading appointments...</td></tr> :
                            appointments.map((apt) => (
                                <tr key={apt._id}>
                                    <td className="px-6 py-4"><div className="flex items-center"><div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">{getInitials(apt.user?.name)}</div><div className="ml-4"><div className="text-sm font-medium text-gray-900">{apt.user?.name}</div></div></div></td>
                                    <td className="px-6 py-4"><div className="text-sm">{new Date(apt.appointmentDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</div><div className="text-sm text-gray-500">{new Date(`1970-01-01T${apt.timeSlot}:00`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div></td>
                                    <td className="px-6 py-4"><span className={`capitalize text-xs px-3 py-1 rounded-full font-semibold inline-block ${apt.status === 'accepted' ? 'bg-green-100 text-green-800' : apt.status === 'completed' ? 'bg-blue-100 text-blue-800' : apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{apt.status === 'accepted' ? 'confirmed' : apt.status}</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                                        {apt.status === 'pending' && <>
                                            <button onClick={() => handleStatusChange(apt._id, 'accepted')} className="text-green-600 hover:text-green-800">Confirm</button>
                                            <button onClick={() => handleStatusChange(apt._id, 'rejected')} className="text-red-600 hover:text-red-800">Cancel</button>
                                        </>}
                                        {apt.status === 'accepted' && <button onClick={() => handleJoinCall(apt._id)} className="text-blue-600 hover:text-blue-800">Join Call</button>}
                                        {apt.status === 'completed' && <span className="text-gray-500 font-semibold">Completed</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- Page Component: Patients ---
const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAndProcessPatients = async () => {
            try {
                const doctorId = localStorage.getItem("doctorId");
                if (!doctorId) throw new Error("Doctor ID not found.");
                
                const response = await fetch(`http://localhost:3000/appointments/doctor/${doctorId}`);
                if (!response.ok) throw new Error("Failed to fetch patient data.");
                
                const appointments = await response.json();
                
                const patientsMap = new Map();
                appointments.forEach(apt => {
                    if (apt.user) {
                        if (!patientsMap.has(apt.user._id) || new Date(apt.appointmentDate) > new Date(patientsMap.get(apt.user._id).lastVisit)) {
                            patientsMap.set(apt.user._id, { ...apt.user, lastVisit: new Date(apt.appointmentDate) });
                        }
                    }
                });
                const uniquePatients = Array.from(patientsMap.values());
                setPatients(uniquePatients);
                setFilteredPatients(uniquePatients);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAndProcessPatients();
    }, []);

    useEffect(() => {
        setFilteredPatients(
            patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, patients]);

    const getInitials = (name) => {
        if (!name) return '??';
        return name.split(' ').map(n => n[0]).join('');
    };

    const timeSince = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        return "Today";
    };

    return (
        <div className="p-6 bg-gray-50 min-h-full">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">My Patients</h1>
                <div className="relative w-full sm:w-auto">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search patients..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg"/>
                </div>
            </div>
            {loading ? <div className="text-center p-8">Loading...</div> : error ? <div className="text-red-500 text-center p-8">{error}</div> :
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                    <div key={patient._id} className="bg-white p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><span className="text-blue-600 font-bold text-lg">{getInitials(patient.name)}</span></div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{patient.name}</h3>
                        <div className="space-y-2 text-sm text-gray-600 mb-4"><p>Last Visit: {timeSince(patient.lastVisit)}</p></div>
                        <div className="border-t pt-4 mt-auto"><p className="text-sm text-gray-600">Contact: {patient.phoneNumber}</p></div>
                    </div>
                ))}
            </div>}
        </div>
    );
};

// --- Page Component: Profile ---
const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const doctorId = localStorage.getItem('doctorId');
            if (!doctorId) throw new Error("Doctor not found");
            const response = await fetch(`http://localhost:3000/doctor/profile/${doctorId}`);
            if (!response.ok) throw new Error("Failed to fetch profile");
            const data = await response.json();
            setProfile(data);
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSave = async () => {
        try {
            const doctorId = localStorage.getItem('doctorId');
            const response = await fetch(`http://localhost:3000/doctor/profile/${doctorId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            });
            if (!response.ok) throw new Error("Failed to update");
            const data = await response.json();
            setProfile(data.doctor);
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile' });
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (!profile) return <div className="p-6">No profile data found</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
                {isEditing ? (
                    <div className="space-x-2">
                        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save Changes</button>
                        <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    </div>
                ) : <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Edit Profile</button>}
            </div>
            {message && <div className={`p-4 rounded-lg mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{message.text}</div>}
            <div className="bg-white p-8 rounded-xl shadow-sm border max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>{isEditing ? <input type="text" name="name" value={profile.name} onChange={handleChange} className="w-full border p-2 rounded-lg"/> : <p className="bg-gray-50 p-2 rounded-lg">{profile.name}</p>}</div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Email</label><p className="bg-gray-50 p-2 rounded-lg text-gray-500">{profile.email}</p></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>{isEditing ? <input type="text" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} className="w-full border p-2 rounded-lg"/> : <p className="bg-gray-50 p-2 rounded-lg">{profile.phoneNumber}</p>}</div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Speciality</label>{isEditing ? <input type="text" name="speciality" value={profile.speciality} onChange={handleChange} className="w-full border p-2 rounded-lg"/> : <p className="bg-gray-50 p-2 rounded-lg">{profile.speciality}</p>}</div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>{isEditing ? <input type="number" name="yearsOfExperience" value={profile.yearsOfExperience} onChange={handleChange} className="w-full border p-2 rounded-lg"/> : <p className="bg-gray-50 p-2 rounded-lg">{profile.yearsOfExperience} years</p>}</div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Locality</label>{isEditing ? <input type="text" name="locality" value={profile.locality} onChange={handleChange} className="w-full border p-2 rounded-lg"/> : <p className="bg-gray-50 p-2 rounded-lg">{profile.locality}</p>}</div>
            </div>
        </div>
    );
};

// --- Page Component: Setting ---
const Setting = () => {
    const [formData, setFormData] = useState({ name: "", email: "", specialization: "", notifications: true, password: "", newPassword: "", confirmPassword: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const doctorId = localStorage.getItem("doctorId");
                const response = await fetch(`http://localhost:3000/doctor/profile/${doctorId}`);
                if (!response.ok) throw new Error("Failed to fetch profile");
                const data = await response.json();
                setFormData(prev => ({ ...prev, name: data.name || "", email: data.email || "", specialization: data.speciality || "" }));
            } catch (error) {
                setError("Could not load profile data.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); setSuccess("");
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setError("New passwords do not match!");
            return;
        }
        try {
            const doctorId = localStorage.getItem('doctorId');
            const payload = {
                name: formData.name,
                speciality: formData.specialization
            };
            if (formData.newPassword) {
                payload.currentPassword = formData.password;
                payload.newPassword = formData.newPassword;
            }

            const response = await fetch(`http://localhost:3000/doctor/profile/${doctorId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Failed to update settings");
            }
            setSuccess("Settings updated successfully!");
            setFormData(prev => ({...prev, password: '', newPassword: '', confirmPassword: ''}));
        } catch (updateError) {
            setError(updateError.message);
        }
    };
    
    if (loading) return <div className="p-6 text-center">Loading settings...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-6 max-w-xl">
                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}
                <div><label className="block font-medium mb-1">Full Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-lg p-2" /></div>
                <div><label className="block font-medium mb-1">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded-lg p-2" disabled /></div>
                <div><label className="block font-medium mb-1">Specialization</label><input type="text" name="specialization" value={formData.specialization} onChange={handleChange} className="w-full border rounded-lg p-2" /></div>
                <div className="pt-4"><button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Save Settings</button></div>
            </form>
        </div>
    );
};

// --- Main DoctorDashboard Component ---
const DoctorDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const doctorId = localStorage.getItem('doctorId');
        
        const handleConnect = () => {
            if (doctorId) {
                socket.emit('join-doctor-room', doctorId);
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

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardHome setActiveTab={setActiveTab} />;
            case 'appointments': return <ManageAppointments />;
            case 'patients': return <Patients />;
            case 'profile': return <Profile />;
            case 'settings': return <Setting />;
            default: return <DashboardHome setActiveTab={setActiveTab} />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            <Sidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                isMobileOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />
            {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"></div>}
            <div className="flex-1 flex flex-col">
                <DoctorNavbar onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 p-6 lg:p-10 overflow-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default DoctorDashboard;