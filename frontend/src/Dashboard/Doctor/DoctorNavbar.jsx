import React, { useState, useEffect } from 'react';
import { Bell, BriefcaseMedical, Menu, X } from 'lucide-react';
import { io } from 'socket.io-client';

// A simple toast component for notifications
const NotificationToast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Auto-dismiss after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-50 bg-green-600 text-white py-3 px-5 rounded-lg shadow-xl flex items-center gap-4 animate-fade-in-down">
      <Bell size={20} />
      <span>{message}</span>
      <button onClick={onClose} className="p-1 -mr-2 hover:bg-green-700 rounded-full">
        <X size={18} />
      </button>
    </div>
  );
};

const DoctorNavbar = ({ onMenuClick }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [doctorName, setDoctorName] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const getInitials = (name) => {
    if (!name) return '??';
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  useEffect(() => {
    const fetchNavbarData = async () => {
      // ... (existing data fetching logic remains the same)
      try {
        const doctorId = localStorage.getItem('doctorId');
        if (!doctorId) {
          console.error("Doctor ID not found in local storage.");
          return;
        }

        const appointmentsResponse = await fetch(`http://localhost:3000/appointments/doctor/${doctorId}`);
        if (appointmentsResponse.ok) {
          const appointments = await appointmentsResponse.json();
          const pendingCount = appointments.filter(apt => apt.status === 'pending').length;
          setNotificationCount(pendingCount);
        } else {
          console.error("Failed to fetch appointments for notification count.");
        }
        
        const profileResponse = await fetch(`http://localhost:3000/doctor/profile/${doctorId}`);
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setDoctorName(profileData.name || 'Doctor');
        } else {
           setDoctorName('Doctor');
           console.error("Failed to fetch doctor profile. Using fallback name.");
        }

      } catch (error) {
        console.error("Error fetching navbar data:", error);
        setDoctorName('Doctor');
      }
    };

    fetchNavbarData();

    // --- Real-time Notification Setup ---
    const doctorId = localStorage.getItem('doctorId');
    if (doctorId) {
      // Ensure you connect to the correct server address and port
      const socket = io("http://localhost:3000");

      socket.on('connect', () => {
        console.log('Connected to socket server with ID:', socket.id);
        // Join a room specific to this doctor to receive targeted notifications
        socket.emit('join-doctor-room', doctorId);
      });

      // Listen for the 'new-appointment' event from the server
      socket.on('new-appointment', (data) => {
        setNotificationCount(prevCount => prevCount + 1);
        setToastMessage(`New appointment from ${data.patientName}`);
      });

      // Cleanup on component unmount
      return () => {
        console.log('Disconnecting socket...');
        socket.disconnect();
      };
    }
  }, []);

  return (
    <>
      {toastMessage && (
        <NotificationToast 
          message={toastMessage} 
          onClose={() => setToastMessage(null)} 
        />
      )}
      <header className="bg-white shadow-sm border-b border-gray-100 px-6 py-4 lg:px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Good Morning, {doctorName.split(' ')[0]}! 👋</h1>
              <p className="text-gray-600 text-sm md:text-base">Ready to help your patients today?</p>
            </div>
          </div>

          <div className="relative w-full max-w-lg hidden md:block">
            <BriefcaseMedical size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {notificationCount}
                  </span>
                )}
              </button>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">{getInitials(doctorName)}</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default DoctorNavbar;

