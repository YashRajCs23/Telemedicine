import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Bell, AlertCircle } from 'lucide-react';

// A simple loading spinner component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
);

const DashboardHome = ({ setActiveTab }) => {
  const [stats, setStats] = useState({ today: 0, active: 0, pending: 0 });
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const doctorId = localStorage.getItem("doctorId");
        if (!doctorId) {
          throw new Error("Doctor ID not found.");
        }

        const response = await fetch(`http://localhost:3000/appointments/doctor/${doctorId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data.");
        }

        const appointments = await response.json();

        // --- Process data for Stats Cards ---
        const today = new Date().setHours(0, 0, 0, 0);
        
        const todaysAppointments = appointments.filter(apt => {
            const aptDate = new Date(apt.appointmentDate).setHours(0, 0, 0, 0);
            return aptDate === today;
        });

        const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
        
        const uniquePatients = new Set(appointments.map(apt => apt.user?._id).filter(Boolean));
        
        setStats({
            today: todaysAppointments.length,
            active: uniquePatients.size,
            pending: pendingAppointments.length,
        });

        // --- Process data for Upcoming Appointments ---
        const upcoming = todaysAppointments
            .filter(apt => apt.status === 'pending' || apt.status === 'accepted')
            .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot)) // Sort by time
            .map((apt, index) => ({
                id: apt._id,
                patient: apt.user?.name || 'Unknown Patient',
                time: new Date(`1970-01-01T${apt.timeSlot}:00`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
                type: index % 2 === 0 ? 'Video Consultation' : 'In-Person', // Placeholder as type is not in model
                avatar: (apt.user?.name || 'UP').split(' ').map(n => n[0]).join('')
            }));
            
        setUpcomingAppointments(upcoming);

      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsCards = [
    {
      title: "Today's Appointments",
      value: loading ? '...' : stats.today,
      change: "Scheduled for today",
      color: "blue",
      icon: Calendar,
      action: () => setActiveTab('appointments')
    },
    {
      title: "Active Patients",
      value: loading ? '...' : stats.active,
      change: "Total unique patients",
      color: "green",
      icon: Users,
      action: () => setActiveTab('patients')
    },
    {
      title: "Pending Requests",
      value: loading ? '...' : stats.pending,
      change: "Need confirmation",
      color: "yellow",
      icon: Clock,
      action: () => setActiveTab('appointments')
    }
  ];

  const quickActions = [
    { title: "Manage Slots", icon: Clock, color: "blue", action: () => setActiveTab('slots') },
    { title: "View Patients", icon: Users, color: "green", action: () => setActiveTab('patients') },
    { title: "Notifications", icon: Bell, color: "purple", action: () => {} },
  ];

  if (error) {
    return (
        <div className="p-6 text-center text-red-600 bg-red-50 rounded-lg m-4">
            <AlertCircle className="mx-auto h-12 w-12 mb-4" />
            <h2 className="text-lg font-semibold">Could not load dashboard</h2>
            <p>{error}</p>
        </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={stat.action}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  <p className="text-sm mt-2 text-gray-500">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon size={24} className={`text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
            <button 
              onClick={() => setActiveTab('appointments')} 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View all →
            </button>
          </div>
          
          <div className="space-y-4">
            {loading ? <LoadingSpinner /> : upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">{appointment.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{appointment.patient}</h3>
                      <p className="text-sm text-gray-600">{appointment.time} • {appointment.type}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    Join
                  </button>
                </div>
              ))
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <Calendar size={32} className="mx-auto mb-2" />
                    <p>No upcoming appointments for today.</p>
                </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className={`p-4 rounded-lg text-center hover:shadow-md transition-all bg-${action.color}-50 hover:bg-${action.color}-100`}
                >
                  <Icon size={24} className={`mx-auto mb-2 text-${action.color}-600`} />
                  <span className="text-sm font-medium text-gray-700">{action.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
