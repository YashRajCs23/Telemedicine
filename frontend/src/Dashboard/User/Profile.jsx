import React, { useState, useEffect } from 'react';
import { Edit3, Phone, Mail, MapPin, Camera, Heart, Upload, AlertCircle, Save, X } from "lucide-react";

// Loading skeleton component for a better user experience
const ProfileSkeleton = () => (
    <div className="p-6 max-w-6xl mx-auto animate-pulse">
        <div className="flex justify-between items-center mb-6">
            <div>
                <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="text-center mb-6">
                        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto"></div>
                        <div className="h-6 bg-gray-200 rounded w-40 mx-auto mt-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-24 mx-auto mt-2"></div>
                    </div>
                    <div className="space-y-4 mt-6">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                </div>
            </div>
        </div>
    </div>
);


const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchUserProfile = async () => {
        try {
            const userId = localStorage.getItem('userId'); 
            if (!userId) {
                throw new Error("User not logged in. Please log in again.");
            }
            const response = await fetch(`http://localhost:3000/user/profile/${userId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch profile data.");
            }
            const data = await response.json();
            setUser(data);
            setFormData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);
    
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setFormData(user);
        setError('');
        setSuccess('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setError(''); setSuccess('');
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:3000/user/profile/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update profile.");
            }
            await fetchUserProfile();
            setSuccess("Profile updated successfully!");
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    if (loading) return <div>Loading Profile...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
             <div className="flex justify-between items-center mb-6">
                 <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-600 mt-1">Manage your personal information</p>
                </div>
                {!isEditing && (
                    <button onClick={handleEditToggle} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Edit3 size={16} />
                        <span>Edit Profile</span>
                    </button>
                )}
            </div>
            
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{success}</div>}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <div className="text-center mb-6">
                            <div className="relative inline-block">
                                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto"><span className="text-white text-4xl font-semibold">{getInitials(user.name)}</span></div>
                                <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700"><Camera size={16} /></button>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mt-4">{user.name}</h2>
                            <p className="text-gray-500">Patient</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-gray-600"><Mail size={18} className="text-blue-500" /><span className="text-sm">{user.email}</span></div>
                             <div className="flex items-center space-x-3 text-gray-600"><Phone size={18} className="text-blue-500" /><span className="text-sm">{user.phoneNumber}</span></div>
                            <div className="flex items-center space-x-3 text-gray-600"><MapPin size={18} className="text-blue-500" />
                                {isEditing ? <input type="text" name="locality" value={formData.locality || ''} onChange={handleChange} className="w-full text-sm border-b focus:outline-none focus:border-blue-500"/> : <span className="text-sm">{user.locality}</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                {isEditing ? <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full p-2 border rounded-md"/> : <p className="text-gray-900">{user.name}</p>}
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Language</label>
                                 {isEditing ? (
                                    <select name="language" value={formData.language} onChange={handleChange} className="w-full p-2 border rounded-md">
                                        <option value="english">English</option>
                                        <option value="hindi">Hindi</option>
                                    </select>
                                ) : <p className="text-gray-900 capitalize">{user.language}</p>}
                            </div>
                        </div>
                    </div>
                    {isEditing && (
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Actions</h3>
                            <div className="flex flex-wrap gap-3">
                                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"><Save size={16}/> Save Changes</button>
                                <button onClick={handleEditToggle} className="flex items-center gap-2 px-4 py-2 border text-gray-600 rounded-lg hover:bg-gray-50"><X size={16}/> Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;

