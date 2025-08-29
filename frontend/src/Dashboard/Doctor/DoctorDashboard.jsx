import React, { useState } from 'react';
import { Calendar, Users, Clock, Bell, LayoutDashboard, Settings, LogOut, HeartPulse, Stethoscope, BriefcaseMedical, Menu, X, Plus, Edit2, Trash2 } from 'lucide-react';

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, isMobileOpen, onClose }) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, tab: 'dashboard' },
    { name: 'Appointments', icon: Calendar, tab: 'appointments' },
    { name: 'Patients', icon: Users, tab: 'patients' },
    { name: 'Slots', icon: Clock, tab: 'slots' },
    { name: 'Profile', icon: HeartPulse, tab: 'profile' },
    { name: 'Settings', icon: Settings, tab: 'settings' },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-gray-900 text-white p-6 shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center">
          <Stethoscope size={32} className="text-blue-500 mr-2" />
          <span className="text-xl font-bold">HealthCare</span>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors">
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.tab}>
              <button
                onClick={() => {
                  setActiveTab(item.tab);
                  onClose(); 
                }}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  activeTab === item.tab ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <button className="flex items-center w-full p-3 rounded-lg text-red-400 hover:bg-gray-800 transition-colors">
          <LogOut size={20} className="mr-3" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

// New Navbar Component
const DoctorNavbar = ({ onMenuClick }) => {
  const [notificationCount, setNotificationCount] = useState(3);
  return (
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
            <h1 className="text-2xl font-bold text-gray-800">Good Morning, Doctor! 👋</h1>
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
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">RK</span>
          </div>
        </div>
      </div>
    </header>
  );
};


// Dashboard Home Component
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

// Manage Appointments Component
const ManageAppointments = () => {
  const appointments = [
    { id: 1, patient: "John Doe", time: "10:30 AM", date: "Today", status: "confirmed", type: "Video Call" },
    { id: 2, patient: "Jane Smith", time: "11:00 AM", date: "Today", status: "pending", type: "In-Person" },
    { id: 3, patient: "Michael Brown", time: "2:00 PM", date: "Tomorrow", status: "confirmed", type: "Video Call" },
    { id: 4, patient: "Sarah Wilson", time: "3:30 PM", date: "Tomorrow", status: "cancelled", type: "In-Person" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Appointments</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add New Slot
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{appointment.patient}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.date}</div>
                    <div className="text-sm text-gray-500">{appointment.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-green-600 hover:text-green-900">Confirm</button>
                    <button className="text-red-600 hover:text-red-900">Cancel</button>
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

// Patients Component
const Patients = () => {
  const patients = [
    { id: 1, name: "Amit Sharma", age: 32, condition: "Hypertension", lastVisit: "2 days ago", status: "Active" },
    { id: 2, name: "Priya Verma", age: 45, condition: "Diabetes", lastVisit: "1 week ago", status: "Follow-up" },
    { id: 3, name: "Rahul Singh", age: 28, condition: "Chest Pain", lastVisit: "3 days ago", status: "Resolved" },
    { id: 4, name: "Sunita Patel", age: 55, condition: "Arthritis", lastVisit: "5 days ago", status: "Active" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Follow-up': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Patients</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search patients..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div key={patient.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                {patient.status}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{patient.name}</h3>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p><span className="font-medium">Age:</span> {patient.age} years</p>
              <p><span className="font-medium">Condition:</span> {patient.condition}</p>
              <p><span className="font-medium">Last Visit:</span> {patient.lastVisit}</p>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                View Details
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Slots Component
const Slots = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const consultationTypes = ["Video Consultation", "In-Person", "Phone Consultation"];
  const [slots, setSlots] = useState([
    { id: 1, day: "Monday", startTime: "09:00", endTime: "12:00", type: "Video Consultation", maxPatients: 5 },
    { id: 2, day: "Tuesday", startTime: "10:00", endTime: "13:00", type: "In-Person", maxPatients: 3 },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState(null);


  const defaultSlot = { day: "Monday", startTime: "09:00", endTime: "17:00", type: "Video Consultation", maxPatients: 5 };
  const [formSlot, setFormSlot] = useState(defaultSlot);

  const timeOptions = Array.from({ length: 25 }, (_, i) => {
    const h = String(8 + Math.floor(i / 2)).padStart(2, "0");
    const m = i % 2 === 0 ? "00" : "30";
    return `${h}:${m}`;
  });

  const handleSave = () => {
    if (formSlot.startTime >= formSlot.endTime) {
      setMessage({ type: 'error', text: 'End time must be after start time' });
      return;
    }
    if (editing) {
      setSlots(slots.map(s => (s.id === editing.id ? { ...formSlot, id: editing.id } : s)));
      setEditing(null);
      setMessage({ type: 'success', text: 'Slot updated successfully!' });
    } else {
      setSlots([...slots, { ...formSlot, id: slots.length + 1 }]);
      setIsAdding(false);
      setMessage({ type: 'success', text: 'Slot added successfully!' });
    }
    setFormSlot(defaultSlot);
  };

  const handleDeleteClick = (id) => {
    setSlotToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setSlots(slots.filter(s => s.id !== slotToDelete));
    setMessage({ type: 'success', text: 'Slot deleted successfully!' });
    setIsModalOpen(false);
    setSlotToDelete(null);
  };

  const grouped = daysOfWeek.reduce((acc, day) => {
    acc[day] = slots.filter(s => s.day === day);
    return acc;
  }, {});

  const SlotForm = ({ onCancel }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">{editing ? "Edit Slot" : "Add Slot"}</h2>
        <button onClick={onCancel}><X size={18} /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <select value={formSlot.day} onChange={e => setFormSlot({ ...formSlot, day: e.target.value })} className="border rounded-lg px-3 py-2">
          {daysOfWeek.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={formSlot.startTime} onChange={e => setFormSlot({ ...formSlot, startTime: e.target.value })} className="border rounded-lg px-3 py-2">
          {timeOptions.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={formSlot.endTime} onChange={e => setFormSlot({ ...formSlot, endTime: e.target.value })} className="border rounded-lg px-3 py-2">
          {timeOptions.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={formSlot.type} onChange={e => setFormSlot({ ...formSlot, type: e.target.value })} className="border rounded-lg px-3 py-2">
          {consultationTypes.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <input
        type="number"
        min="1"
        max="10"
        value={formSlot.maxPatients}
        onChange={e => setFormSlot({ ...formSlot, maxPatients: +e.target.value })}
        className="mt-3 w-full border rounded-lg px-3 py-2"
        placeholder="Max Patients"
      />
      <div className="mt-3 flex gap-2">
        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg">{editing ? "Update" : "Add"}</button>
        <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Time Slots</h1>
        <button onClick={() => { setIsAdding(true); setEditing(null); setFormSlot(defaultSlot); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
          <Plus size={18} className="mr-1" /> Add Slot
        </button>
      </div>
      {message && (
        <div className={`p-4 rounded-lg mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      {(isAdding || editing) && <SlotForm onCancel={() => { setIsAdding(false); setEditing(null); setFormSlot(defaultSlot); }} />}

      {daysOfWeek.map(day => (
        <div key={day} className="mb-6">
          <h3 className="text-lg font-medium flex items-center mb-3">
            <Calendar size={18} className="mr-2 text-blue-600" /> {day}
          </h3>
          {grouped[day].length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {grouped[day].map(s => (
                <div key={s.id} className="border rounded-lg p-3 bg-white shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium flex items-center"><Clock size={14} className="inline mr-1" /> {s.startTime} - {s.endTime}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">{s.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Max Patients: {s.maxPatients}</p>
                  <div className="flex gap-3 mt-3 text-sm">
                    <button onClick={() => { setEditing(s); setFormSlot(s); }} className="text-blue-600 flex items-center hover:text-blue-800"><Edit2 size={14} className="mr-1" /> Edit</button>
                    <button onClick={() => handleDeleteClick(s.id)} className="text-red-600 flex items-center hover:text-red-800"><Trash2 size={14} className="mr-1" /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No slots for this day.</p>
          )}
        </div>
      ))}
       {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this slot? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// Profile Component
const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Dr. Ramesh Kumar",
    email: "dr.ramesh@example.com",
    phone: "+91 9876543210",
    specialization: "Cardiologist",
    experience: "12 years",
    qualification: "MBBS, MD",
    address: "123 Medical Street, Healthcare City, Mumbai",
    bio: "Experienced cardiologist with expertise in non-invasive cardiology and preventive care."
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        {isEditing ? (
          <div className="space-x-2">
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            <button 
              onClick={() => { setIsEditing(false); setMessage(null); }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button 
            onClick={() => { setIsEditing(true); setMessage(null); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
            Edit Profile
          </button>
        )}
      </div>
      {message && (
        <div className={`p-4 rounded-lg mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl">
        <div className="flex items-center space-x-6 mb-8 pb-6 border-b border-gray-100">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">RK</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
            <p className="text-gray-600">{profile.specialization}</p>
            <p className="text-gray-500">{profile.experience} of experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{profile.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{profile.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{profile.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
            {isEditing ? (
              <input
                type="text"
                name="specialization"
                value={profile.specialization}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{profile.specialization}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            {isEditing ? (
              <input
                type="text"
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{profile.experience}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
            {isEditing ? (
              <input
                type="text"
                name="qualification"
                value={profile.qualification}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{profile.qualification}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            {isEditing ? (
              <textarea
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{profile.address}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{profile.bio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// DoctorSettings Component
const DoctorSettings = () => {
  const [formData, setFormData] = useState({
    name: "Dr. Ramesh Kumar",
    email: "doctor@example.com",
    specialization: "Cardiologist",
    notifications: true,
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    setSuccess("✅ Settings updated successfully!");
    setError("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Doctor Settings</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-6 max-w-xl"
      >
        {error && <p className="text-red-600 font-medium">{error}</p>}
        {success && <p className="text-green-600 font-medium">{success}</p>}

        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="notifications"
            checked={formData.notifications}
            onChange={handleChange}
            className="mr-2 h-4 w-4"
          />
          <label className="font-medium">Enable Notifications</label>
        </div>

        <div>
          <label className="block font-medium mb-1">Current Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm new password"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

// Main DoctorDashboard component that renders the layout and content
const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome setActiveTab={setActiveTab} />;
      case 'appointments':
        return <ManageAppointments />;
      case 'patients':
        return <Patients />;
      case 'slots':
        return <Slots />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <DoctorSettings />;
      default:
        return <DashboardHome setActiveTab={setActiveTab} />;
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
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        ></div>
      )}
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
