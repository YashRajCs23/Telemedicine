import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, AlertCircle, X, Calendar, Clock } from "lucide-react";

// Appointment Booking Modal Component
const AppointmentModal = ({ doctor, onClose }) => {
    const [appointmentDate, setAppointmentDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [reason, setReason] = useState('');
    const [availableSlots, setAvailableSlots] = useState({});
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const potentialTimeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

    // Effect to check slot availability when a date is selected
    useEffect(() => {
        const checkAvailability = async () => {
            if (!appointmentDate) return;
            setLoadingSlots(true);
            setTimeSlot(''); // Reset selected time slot
            const availability = {};
            for (const slot of potentialTimeSlots) {
                try {
                    const response = await fetch('http://localhost:3000/appointments/check-slot', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            doctorId: doctor._id,
                            appointmentDate,
                            timeSlot: slot,
                        }),
                    });
                    const data = await response.json();
                    availability[slot] = data.available;
                } catch (err) {
                    availability[slot] = false; // Mark as unavailable on error
                }
            }
            setAvailableSlots(availability);
            setLoadingSlots(false);
        };
        checkAvailability();
    }, [appointmentDate, doctor._id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!appointmentDate || !timeSlot || !reason) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const userId = localStorage.getItem('userId'); // Assumes userId is stored on login
            if (!userId) {
                setError("You must be logged in to book an appointment.");
                return;
            }

            const response = await fetch('http://localhost:3000/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    doctorId: doctor._id,
                    appointmentDate,
                    timeSlot,
                    reason,
                }),
            });
            
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to book appointment.");
            }
            
            setSuccess("Appointment booked successfully! The doctor's office will be in touch.");
            // Clear form
            setAppointmentDate('');
            setTimeSlot('');
            setReason('');
            setTimeout(onClose, 2000); // Close modal after 2 seconds

        } catch (err) {
            setError(err.message);
        }
    };
    
    // Get today's date in YYYY-MM-DD format for min attribute of date input
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
                <div className="flex justify-between items-center mb-4 pb-4 border-b">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Book Appointment</h3>
                        <p className="text-gray-600">with {doctor.name}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                        <X size={22} />
                    </button>
                </div>
                
                {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}
                {success && <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                        <input
                            type="date"
                            min={today}
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>
                    {appointmentDate && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
                            {loadingSlots ? <p>Checking availability...</p> : (
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                    {potentialTimeSlots.map(slot => (
                                        <button
                                            key={slot}
                                            type="button"
                                            onClick={() => setTimeSlot(slot)}
                                            disabled={!availableSlots[slot]}
                                            className={`p-2 rounded-lg text-sm transition-colors ${
                                                timeSlot === slot
                                                    ? 'bg-blue-600 text-white'
                                                    : availableSlots[slot]
                                                    ? 'bg-gray-100 hover:bg-blue-100'
                                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                        >
                                            {new Date(`1970-01-01T${slot}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows="3"
                            placeholder="Briefly describe the reason for your appointment..."
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>
                    <div className="pt-4 border-t">
                        <button type="submit" className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700" disabled={success}>
                            Confirm Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// Loading skeleton component for a better user experience
const DoctorCardSkeleton = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border animate-pulse">
        <div className="flex items-start space-x-4 mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
        </div>
        <div className="space-y-3 mb-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="flex space-x-2">
            <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
        </div>
    </div>
);


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

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:3000/doctor');
                if (!response.ok) {
                    throw new Error("Failed to fetch doctors list.");
                }
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
                    <input
                        type="text"
                        placeholder="Search by doctor name or specialty..."
                        className="w-full pl-10 pr-4 py-3 border rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                    {specialties.map((specialty) => (
                        <button key={specialty} onClick={() => setActiveSpecialty(specialty)} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${activeSpecialty === specialty ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                            {specialty}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(3)].map((_, i) => <div key={i} className="bg-white p-6 rounded-xl shadow-sm border animate-pulse h-64"></div>)}</div>
            ) : error ? (
                 <div className="text-center py-12 text-red-600 bg-red-50 rounded-lg">
                    <AlertCircle className="mx-auto h-12 w-12 mb-4" />
                    <h3 className="text-lg font-semibold">An Error Occurred</h3>
                    <p>{error}</p>
                </div>
            ) : filteredDoctors.length > 0 ? (
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
            ) : (
                <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><Search size={32} className="text-gray-400" /></div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria or check back later.</p>
                </div>
            )}
        </div>
    );
}

export default Doctors;

