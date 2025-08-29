import React, { useState } from 'react';
import { Bell, BriefcaseMedical, Menu } from 'lucide-react';

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

export default DoctorNavbar;
