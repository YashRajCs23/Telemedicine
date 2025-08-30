import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  HeartPulse, 
  Settings, 
  LogOut, 
  Stethoscope 
} from 'lucide-react';

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
      const response = await fetch('http://localhost:3000/doctor/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('doctorId');
        navigate('/');
      } else {
        console.error('Logout failed on server:', await response.json());
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-gray-900 text-white p-6 shadow-2xl transition-transform duration-300 ease-in-out 
        lg:static lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
<<<<<<< HEAD
        <div className="flex items-center justify-between bg-green-700 p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">Dr</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">TeleMed</h2>
=======
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <Stethoscope size={32} className="text-blue-500 mr-2" />
            <span className="text-xl font-bold">TeleMed</span>
>>>>>>> 57e95d347cab54a53f963bd6664ddca27442f6f7
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

<<<<<<< HEAD
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 mx-4 mt-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <User className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Dr. Ramesh Kumar</h3>
              <p className="text-sm text-gray-600">Cardiologist</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.key;
              
              return (
                <li key={item.key}>
                  <button
                    onClick={() => {
                      setActiveTab(item.key);
                      onClose();
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group w-full text-left ${
                      active
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <Icon size={20} className={active ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'} />
                    <span className="font-medium">{item.label}</span>
                    {active && <ChevronRight size={16} className="ml-auto" />}
                  </button>
                </li>
              );
            })}
=======
        {/* Menu Items */}
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
                    activeTab === item.tab
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <item.icon size={20} className="mr-3" />
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
>>>>>>> 57e95d347cab54a53f963bd6664ddca27442f6f7
          </ul>
        </nav>

        {/* Logout */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg text-red-400 hover:bg-gray-800 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
