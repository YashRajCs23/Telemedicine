import React from 'react';
import { X, Home, Calendar, Users, Clock, DollarSign, Bell, User, Settings, LogOut, ChevronRight } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const menuItems = [
    { key: 'dashboard', icon: Home, label: 'Dashboard' },
    { key: 'appointments', icon: Calendar, label: 'Appointments' },
    { key: 'patients', icon: Users, label: 'Patients' },
    { key: 'slots', icon: Clock, label: 'Manage Slots' },
    { key: 'earnings', icon: DollarSign, label: 'Earnings' },
    { key: 'notifications', icon: Bell, label: 'Notifications' },
    { key: 'profile', icon: User, label: 'Profile' },
    { key: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-sky-900 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between bg-green-700 p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">Dr</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">TeleMed</h2>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

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
          </ul>
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <button className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;