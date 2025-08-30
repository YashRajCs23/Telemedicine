import React, { useState, useEffect } from 'react';
import { Calendar, AlertCircle, CheckCircle, X, Video, UserX } from 'lucide-react';

// A simple loading spinner component to show while data is being fetched
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// New Modal component for viewing appointment details
const ViewAppointmentModal = ({ appointment, onClose, onReject }) => {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-4 pb-4 border-b">
          <h3 className="text-xl font-bold text-gray-800">Appointment Details</h3>
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <X size={22} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg mr-4">
              {appointment.patientInitials}
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{appointment.patientName}</h4>
              <p className="text-sm text-gray-500">{appointment.type}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-700"><strong>Date:</strong> {appointment.dateDisplay}</p>
            <p className="text-sm font-medium text-gray-700 mt-1"><strong>Time:</strong> {appointment.timeSlot}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm font-semibold"
            >
              <Video size={18} /> Join Video Session
            </a>
            <button 
              onClick={() => onReject(appointment.id)}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-sm font-semibold"
            >
              <UserX size={18} /> Reject & Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Helper function to get patient initials
  const getInitials = (name) => {
    if (!name) return '??';
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Helper function to format appointment date dynamically
  const formatAppointmentDate = (dateString) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const appointmentDate = new Date(dateString);

    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    appointmentDate.setHours(0, 0, 0, 0);

    if (appointmentDate.getTime() === today.getTime()) {
      return 'Today';
    }
    if (appointmentDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    }
    return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };


  const fetchAppointments = async () => {
    if (appointments.length === 0) setLoading(true);

    try {
      const doctorId = localStorage.getItem("doctorId");
      if (!doctorId) {
        throw new Error("Doctor ID not found in local storage.");
      }
      
      const response = await fetch(`http://localhost:3000/appointments/doctor/${doctorId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch appointments: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      const processedAppointments = data
        .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
        .map((apt, index) => ({
            id: apt._id,
            dateDisplay: formatAppointmentDate(apt.appointmentDate),
            timeSlot: new Date(`1970-01-01T${apt.timeSlot}:00`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
            patientName: apt.user ? apt.user.name : 'Unknown Patient',
            patientInitials: getInitials(apt.user ? apt.user.name : 'Unknown Patient'),
            status: apt.status,
            type: index % 2 === 0 ? 'Video Call' : 'In-Person', 
      }));

      setAppointments(processedAppointments);
      setError(null);

    } catch (err) {
      console.error("Failed to fetch slots:", err);
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
      const response = await fetch(`http://localhost:3000/appointments/${appointmentId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update status.');
      }
      
      // Update local state for immediate UI feedback
      setAppointments(prevAppointments => 
        prevAppointments.map(apt => 
          apt.id === appointmentId ? { ...apt, status: newStatus } : apt
        )
      );

      setSuccessMessage('Status updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (err) {
      console.error('Failed to update status:', err);
      setError('Could not update status. Please try again.');
    }
  };
  
  const handleRejectAndRemove = async (appointmentId) => {
    await handleStatusChange(appointmentId, 'rejected');
    setIsViewModalOpen(false); // Close the modal after action
  };

  const handleViewClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsViewModalOpen(true);
  };

  const getStatusPill = (status) => {
    const baseClasses = 'capitalize text-xs px-3 py-1 rounded-full font-semibold inline-block';
    switch (status) {
      case 'completed':
      case 'accepted':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'pending':
      default:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && appointments.length === 0) {
    return (
      <div className="p-6 text-center text-red-600 bg-red-50 rounded-lg m-4">
        <AlertCircle className="mx-auto h-12 w-12 mb-4" />
        <h2 className="text-lg font-semibold">Error Loading Data</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {isViewModalOpen && (
        <ViewAppointmentModal 
          appointment={selectedAppointment}
          onClose={() => setIsViewModalOpen(false)}
          onReject={handleRejectAndRemove}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Appointments</h1>
      </div>

      {successMessage && (
        <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-6 flex items-center gap-2">
            <CheckCircle size={20} /> {successMessage}
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.length > 0 ? appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                        {apt.patientInitials}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{apt.patientName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{apt.dateDisplay}</div>
                    <div className="text-sm text-gray-500">{apt.timeSlot}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {apt.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusPill(apt.status)}>
                      {apt.status === 'accepted' ? 'confirmed' : apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                    <button onClick={() => handleViewClick(apt)} className="text-blue-600 hover:text-blue-800 transition-colors">View</button>
                    {apt.status === 'pending' && (
                        <>
                            <button onClick={() => handleStatusChange(apt.id, 'accepted')} className="text-green-600 hover:text-green-800 transition-colors">Confirm</button>
                            <button onClick={() => handleStatusChange(apt.id, 'rejected')} className="text-red-600 hover:text-red-800 transition-colors">Cancel</button>
                        </>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                    <td colSpan="5" className="text-center py-12">
                         <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                         <h3 className="text-lg font-semibold text-gray-700">No Appointments Found</h3>
                         <p className="text-gray-500 mt-1">There are no appointments scheduled at the moment.</p>
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAppointments;

