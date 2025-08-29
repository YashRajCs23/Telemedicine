// src/User/DashboardHome.jsx
import { Activity, Calendar } from "lucide-react";

const DashboardHome = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">Welcome back, John 👋</h1>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <p className="text-3xl font-bold text-blue-700">120/80</p>
          <p className="text-sm text-gray-500">Blood Pressure</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <p className="text-3xl font-bold text-blue-700">72 bpm</p>
          <p className="text-sm text-gray-500">Heart Rate</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <p className="text-3xl font-bold text-blue-700">98%</p>
          <p className="text-sm text-gray-500">Oxygen Level</p>
        </div>
      </div>

      {/* Appointments */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold flex items-center mb-4 text-blue-800">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" /> Upcoming Appointment
        </h2>
        <div className="flex justify-between bg-blue-50 p-4 rounded-xl">
          <div>
            <h3 className="font-semibold text-gray-800">Dr. Sarah Johnson</h3>
            <p className="text-sm text-gray-500">Cardiologist</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-blue-700">Sep 2, 2025</p>
            <p className="text-xs text-gray-500">10:30 AM</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold flex items-center mb-4 text-blue-800">
          <Activity className="w-5 h-5 mr-2 text-blue-600" /> Recent Activity
        </h2>
        <ul className="text-sm space-y-2 text-gray-600">
          <li>✔ Blood test uploaded - Aug 25</li>
          <li>💊 Prescription updated - Aug 22</li>
          <li>📞 Consultation with Dr. Sarah - Aug 18</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;