import React from 'react';
import { Calendar, Users, Clock, Bell } from 'lucide-react';

const DashboardHome = ({ setActiveTab }) => {
  const statsCards = [
    {
      title: "Today's Appointments",
      value: "8",
      change: "+2 from yesterday",
      color: "blue",
      icon: Calendar,
      action: () => setActiveTab('appointments')
    },
    {
      title: "Active Patients",
      value: "24",
      change: "+3 this week",
      color: "green",
      icon: Users,
      action: () => setActiveTab('patients')
    },
    {
      title: "Pending Requests",
      value: "3",
      change: "Needs attention",
      color: "yellow",
      icon: Clock,
      action: () => setActiveTab('appointments')
    }
  ];

  const upcomingAppointments = [
    { id: 1, patient: "Amit Sharma", time: "10:30 AM", type: "Video Consultation", avatar: "AS" },
    { id: 2, patient: "Priya Verma", time: "2:00 PM", type: "In-Person", avatar: "PV" },
    { id: 3, patient: "Rahul Singh", time: "4:30 PM", type: "Video Consultation", avatar: "RS" },
  ];

  const quickActions = [
    { title: "Manage Slots", icon: Clock, color: "blue", action: () => setActiveTab('slots') },
    { title: "View Patients", icon: Users, color: "green", action: () => setActiveTab('patients') },
    { title: "Notifications", icon: Bell, color: "purple", action: () => setActiveTab('notifications') },
  ];

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
                  <p className={`text-sm mt-2 ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'yellow' ? 'text-yellow-600' :
                    'text-purple-600'
                  }`}>{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'yellow' ? 'bg-yellow-100' :
                  'bg-purple-100'
                }`}>
                  <Icon size={24} className={
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'yellow' ? 'text-yellow-600' :
                    'text-purple-600'
                  } />
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
            {upcomingAppointments.map(appointment => (
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
            ))}
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
                  className={`p-4 rounded-lg text-center hover:shadow-md transition-all ${
                    action.color === 'blue' ? 'bg-blue-50 hover:bg-blue-100' :
                    action.color === 'green' ? 'bg-green-50 hover:bg-green-100' :
                    action.color === 'yellow' ? 'bg-yellow-50 hover:bg-yellow-100' :
                    'bg-purple-50 hover:bg-purple-100'
                  }`}
                >
                  <Icon size={24} className={`mx-auto mb-2 ${
                    action.color === 'blue' ? 'text-blue-600' :
                    action.color === 'green' ? 'text-green-600' :
                    action.color === 'yellow' ? 'text-yellow-600' :
                    'text-purple-600'
                  }`} />
                  <span className="text-sm font-medium text-gray-700">{action.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 border-l-4 border-green-400 bg-green-50">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div>
              <p className="text-gray-800 font-medium">Appointment completed with Amit Sharma</p>
              <p className="text-sm text-gray-600">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 border-l-4 border-blue-400 bg-blue-50">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div>
              <p className="text-gray-800 font-medium">New appointment request from Priya Verma</p>
              <p className="text-sm text-gray-600">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 border-l-4 border-yellow-400 bg-yellow-50">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div>
              <p className="text-gray-800 font-medium">Payment received for consultation</p>
              <p className="text-sm text-gray-600">6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
