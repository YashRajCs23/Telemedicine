import { Search, Star, Clock, MapPin, Filter } from "lucide-react";

export default function Doctors() {
  const doctors = [
    { 
      id: 1, 
      name: "Dr. Anjali Sharma", 
      specialty: "Cardiologist", 
      experience: "10 years", 
      availability: "Mon-Fri",
      rating: 4.8,
      reviews: 127,
      location: "Apollo Hospital",
      consultationFee: "₹800",
      image: "AS"
    },
    { 
      id: 2, 
      name: "Dr. Raj Mehta", 
      specialty: "Dermatologist", 
      experience: "7 years", 
      availability: "Tue-Thu",
      rating: 4.6,
      reviews: 89,
      location: "Skin Care Clinic",
      consultationFee: "₹600",
      image: "RM"
    },
    { 
      id: 3, 
      name: "Dr. Neha Verma", 
      specialty: "Pediatrician", 
      experience: "12 years", 
      availability: "Mon-Sat",
      rating: 4.9,
      reviews: 203,
      location: "Children's Hospital",
      consultationFee: "₹700",
      image: "NV"
    },
    { 
      id: 4, 
      name: "Dr. Arjun Singh", 
      specialty: "General Physician", 
      experience: "8 years", 
      availability: "Mon-Sun",
      rating: 4.5,
      reviews: 156,
      location: "City Medical Center",
      consultationFee: "₹500",
      image: "AS"
    },
  ];

  const specialties = ["All", "Cardiologist", "Dermatologist", "Pediatrician", "General Physician"];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Find Doctors</h1>
        <p className="text-gray-600 mt-1">Book appointments with qualified healthcare professionals</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by doctor name or specialty..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {specialties.map((specialty) => (
            <button
              key={specialty}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                specialty === "All" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      {doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200">
              {/* Doctor Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">{doctor.image}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{doctor.rating}</span>
                    <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Experience</span>
                  <span className="font-medium text-gray-900">{doctor.experience}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Consultation Fee</span>
                  <span className="font-medium text-green-600">{doctor.consultationFee}</span>
                </div>
                <div className="flex items-start justify-between text-sm">
                  <span className="text-gray-500">Available</span>
                  <span className="font-medium text-gray-900 text-right">{doctor.availability}</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <MapPin size={14} className="text-gray-400 mt-0.5" />
                  <span className="text-gray-600">{doctor.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Book Appointment
                </button>
                <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or check back later.</p>
        </div>
      )}

      {/* Load More Button */}
      {doctors.length > 0 && (
        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            Load More Doctors
          </button>
        </div>
      )}
    </div>
  );
}