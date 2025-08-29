import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router
import { X, LayoutDashboard, Calendar, Users, HeartPulse, Settings, LogOut, Stethoscope } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isMobileOpen, onClose }) => {
  const navigate = useNavigate(); // Hook for navigation

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, tab: 'dashboard' },
    { name: 'Appointments', icon: Calendar, tab: 'appointments' },
    { name: 'Patients', icon: Users, tab: 'patients' },
    { name: 'Profile', icon: HeartPulse, tab: 'profile' },
    { name: 'Settings', icon: Settings, tab: 'settings' },
  ];
  
  const handleLogout = async () => {
      try {
          const response = await fetch('http://localhost:3000/user/logout', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              }
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
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
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

