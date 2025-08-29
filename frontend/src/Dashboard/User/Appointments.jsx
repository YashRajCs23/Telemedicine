import { Calendar, Clock, MapPin, Phone, Video, Plus } from "lucide-react";

export default function Appointments() {
  const appointments = [
    { 
      id: 1, 
      doctor: "Dr. Anjali Sharma", 
      specialty: "Cardiologist",
      date: "2025-09-01", 
      time: "10:00 AM", 
      status: "Confirmed",
      type: "Video Call",
      location: "Online"
    },
    { 
      id: 2, 
      doctor: "Dr. Raj Mehta", 
      specialty: "Dermatologist",
      date: "2025-09-05", 
      time: "02:30 PM", 
      status: "Pending",
      type: "In-Person",
      location: "City Hospital, Room 204"
    },
    { 
      id: 3, 
      doctor: "Dr. Neha Verma", 
      specialty: "Pediatrician",
      date: "2025-08-28", 
      time: "11:15 AM", 
      status: "Completed",
      type: "Video Call",
      location: "Online"
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'Video Call' ? <Video size={16} /> : <MapPin size={16} />;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 mt-1">Manage your upcoming and past appointments</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* Appointment Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        <button className="px-4 py-2 bg-white text-blue-600 rounded-md font-medium shadow-sm">
          All Appointments
        </button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md">
          Upcoming
        </button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md">
          Past
        </button>
      </div>

      {/* Appointments List */}
      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div key={appt.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {appt.doctor.split(' ')[1][0]}{appt.doctor.split(' ')[2] ? appt.doctor.split(' ')[2][0] : appt.doctor.split(' ')[1][1]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{appt.doctor}</h3>
                    <p className="text-gray-500 mb-3">{appt.specialty}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar size={16} />
                        <span>{new Date(appt.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock size={16} />
                        <span>{appt.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        {getTypeIcon(appt.type)}
                        <span>{appt.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appt.status)}`}>
                    {appt.status}
                  </span>
                  
                  <div className="flex space-x-2">
                    {appt.status === 'Confirmed' && appt.type === 'Video Call' && (
                      <button className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors">
                        <Video size={14} />
                        <span>Join Call</span>
                      </button>
                    )}
                    {appt.status === 'Confirmed' && appt.type === 'In-Person' && (
                      <button className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                        <MapPin size={14} />
                        <span>Get Directions</span>
                      </button>
                    )}
                    {appt.status === 'Pending' && (
                      <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition-colors">
                        Cancel
                      </button>
                    )}
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
          <p className="text-gray-500 mb-6">Book your first appointment to get started with your healthcare journey.</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Book Your First Appointment
          </button>
        </div>
      )}
    </div>
  );
}