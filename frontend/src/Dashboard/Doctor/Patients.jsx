import React from 'react';

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

export default Patients;
