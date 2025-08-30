import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Fetch doctor profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const doctorId = localStorage.getItem('doctorId');
        const response = await api.get(`http://localhost:3000/doctor/profile/${doctorId}`);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        setMessage({
          type: 'error',
          text: error.response?.data?.message || 'Failed to fetch profile'
        });
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const doctorId = localStorage.getItem('doctorId');
      const response = await api.put(`http://localhost:3000/doctor/profile/${doctorId}`, profile);
      
      setProfile(response.data.doctor);
      setIsEditing(false);
      setMessage({
        type: 'success',
        text: 'Profile updated successfully!'
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update profile'
      });
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!profile) return <div className="p-6">No profile data found</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        {isEditing ? (
          <div className="space-x-2">
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            <button 
              onClick={() => { setIsEditing(false); setMessage(null); }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button 
            onClick={() => { setIsEditing(true); setMessage(null); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-4 ${
          message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{profile.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{profile.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{profile.phoneNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Speciality</label>
            {isEditing ? (
              <input
                type="text"
                name="speciality"
                value={profile.speciality}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{profile.speciality}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
            {isEditing ? (
              <input
                type="number"
                name="yearsOfExperience"
                value={profile.yearsOfExperience}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{profile.yearsOfExperience} years</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Locality</label>
            {isEditing ? (
              <input
                type="text"
                name="locality"
                value={profile.locality}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{profile.locality}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
