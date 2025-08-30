import React, { useState, useEffect } from "react";
import { Shield, Bell, Globe, Lock, Eye, EyeOff, Save, XCircle, AlertCircle } from "lucide-react";

export default function Settings() {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        // These fields are not in the current user model, but the UI is ready for them
        emailNotifications: true,
        smsNotifications: true,
        twoFactorAuth: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Note: Since most settings aren't in the user model, we don't fetch them.
    // This useEffect could be used in the future if the model is expanded.
    // useEffect(() => {
    //   // Fetch current user settings here
    // }, []);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setError("New passwords don't match!");
            return;
        }

        setLoading(true);
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error("User ID not found. Please log in again.");
            }

            const response = await fetch(`http://localhost:3000/user/settings/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to update settings.");
            }

            setSuccess(result.message);
            // Clear password fields after successful update
            setFormData(prev => ({...prev, currentPassword: '', newPassword: '', confirmPassword: ''}));

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">Manage your account preferences and security settings</p>
            </div>
            
            {error && <div className="bg-red-100 border border-red-200 text-red-700 p-3 rounded-lg mb-4 flex items-center gap-2"><AlertCircle size={18}/> {error}</div>}
            {success && <div className="bg-green-100 border border-green-200 text-green-700 p-3 rounded-lg mb-4">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Security Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center space-x-2 mb-4">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg pr-10"
                                    placeholder="Enter your current password"
                                />
                                <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg pr-10"
                                    placeholder="Enter new password"
                                />
                                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg pr-10"
                                    placeholder="Confirm new password"
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notification Preferences */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                     <div className="flex items-center space-x-2 mb-4">
                        <Bell className="w-5 h-5 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                    </div>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                                <p className="text-sm text-gray-500">Receive important updates via email</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="emailNotifications" checked={formData.emailNotifications} onChange={handleChange} className="sr-only peer"/>
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                         <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">SMS Notifications</h3>
                                <p className="text-sm text-gray-500">Get text messages for urgent matters</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="smsNotifications" checked={formData.smsNotifications} onChange={handleChange} className="sr-only peer"/>
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="pt-6 border-t">
                    <button type="submit" disabled={loading} className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors font-medium">
                        <Save size={18} />
                        <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
