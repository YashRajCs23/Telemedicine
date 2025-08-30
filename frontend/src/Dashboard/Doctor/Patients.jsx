import React, { useState, useEffect } from 'react';
import { User, Search, AlertCircle } from 'lucide-react';

// A simple loading spinner component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
);

// Helper function to calculate time since last visit
const timeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAndProcessPatients = async () => {
      try {
        const doctorId = localStorage.getItem("doctorId");
        if (!doctorId) {
          throw new Error("Doctor ID not found.");
        }
        
        const response = await fetch(`http://localhost:3000/appointments/doctor/${doctorId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch patient data.");
        }
        
        const appointments = await response.json();
        
        // Process appointments to get a unique list of patients
        const patientsMap = new Map();
        appointments.forEach(apt => {
          if (!apt.user) return; // Skip appointments without a user

          // Keep the most recent appointment for each patient
          if (!patientsMap.has(apt.user._id) || new Date(apt.appointmentDate) > new Date(patientsMap.get(apt.user._id).appointmentDate)) {
            patientsMap.set(apt.user._id, {
                id: apt.user._id,
                name: apt.user.name,
                phoneNumber: apt.user.phoneNumber || 'Not available',
                // These fields are not in the appointment model, so using placeholders
                age: Math.floor(Math.random() * 40) + 20, // Placeholder age
                condition: apt.reason,
                lastVisit: timeSince(new Date(apt.appointmentDate)),
                status: apt.status === 'completed' ? 'Resolved' : apt.status === 'accepted' ? 'Active' : 'Follow-up',
                appointmentDate: apt.appointmentDate
            });
          }
        });
        
        const uniquePatients = Array.from(patientsMap.values());
        setPatients(uniquePatients);
        setFilteredPatients(uniquePatients);

      } catch (err) {
        setError(err.message);
        console.error("Error fetching patients:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAndProcessPatients();
  }, []);

  // Effect to handle searching
  useEffect(() => {
    const results = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(results);
  }, [searchTerm, patients]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Follow-up': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('');
  }

  if (loading) return <LoadingSpinner />;

  if (error) {
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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">My Patients</h1>
        <div className="relative w-full sm:w-auto">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
      </div>

      {filteredPatients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">
                    {getInitials(patient.name)}
                  </span>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{patient.name}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><span className="font-medium text-gray-800">Age:</span> {patient.age} years</p>
                  <p><span className="font-medium text-gray-800">Condition:</span> {patient.condition}</p>
                  <p><span className="font-medium text-gray-800">Last Visit:</span> {patient.lastVisit}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-auto pt-4">
                <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Contact: </span> 
                    {patient.phoneNumber}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed">
             <User size={48} className="mx-auto text-gray-400 mb-4" />
             <h3 className="text-xl font-semibold text-gray-700">No Patients Found</h3>
             <p className="text-gray-500 mt-2">Your patient list is empty, or no patients match your search.</p>
        </div>
      )}
    </div>
  );
};

export default Patients;

