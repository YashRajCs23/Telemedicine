import { Edit3, Phone, Mail, MapPin, Calendar, User, Heart, Upload, Camera } from "lucide-react";

export default function Profile() {
  const user = {
    name: "Yash Srivastava",
    email: "yash@example.com",
    phone: "+91 9876543210",
    age: 24,
    gender: "Male",
    bloodGroup: "B+",
    address: "Lucknow, Uttar Pradesh, India",
    dateOfBirth: "1999-05-15",
    emergencyContact: "+91 9876543211",
    profileImage: "https://via.placeholder.com/120",
    joinedDate: "January 2024"
  };

  const medicalInfo = [
    { label: "Height", value: "5'10\"" },
    { label: "Weight", value: "70 kg" },
    { label: "Allergies", value: "Peanuts, Dust" },
    { label: "Current Medications", value: "Vitamin D3" }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information and medical details</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Edit3 size={16} />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {/* Profile Image */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-4xl font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mt-4">{user.name}</h2>
              <p className="text-gray-500">Patient</p>
              <p className="text-sm text-gray-400 mt-1">Member since {user.joinedDate}</p>
            </div>

            {/* Quick Contact */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail size={18} className="text-blue-500" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone size={18} className="text-blue-500" />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin size={18} className="text-blue-500" />
                <span className="text-sm">{user.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                <Edit3 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                <p className="text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
                <p className="text-gray-900">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Age</label>
                <p className="text-gray-900">{user.age} years</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
                <p className="text-gray-900">{user.gender}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Blood Group</label>
                <div className="flex items-center space-x-2">
                  <Heart size={16} className="text-red-500" />
                  <p className="text-gray-900">{user.bloodGroup}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Emergency Contact</label>
                <p className="text-gray-900">{user.emergencyContact}</p>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Medical Information</h3>
              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                <Edit3 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {medicalInfo.map((info, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-500 mb-1">{info.label}</label>
                  <p className="text-gray-900">{info.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Medical Documents</h3>
              <button className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                <Upload size={16} />
                <span>Upload</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors">
                <Upload size={24} className="text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Blood Test Reports</p>
                <p className="text-xs text-gray-400">Upload your latest reports</p>
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors">
                <Upload size={24} className="text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Prescription History</p>
                <p className="text-xs text-gray-400">Upload prescription documents</p>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Update Profile
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Download Health Summary
              </button>
              <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                Privacy Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}