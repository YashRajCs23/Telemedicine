// src/components/Dashboard/User/Settings.jsx
import { useState } from "react";

export default function Settings() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings Updated:", formData);
    alert("Settings updated successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Account Settings */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-6"
      >
        <h2 className="text-xl font-semibold">Account Settings</h2>

        <div>
          <label className="block text-gray-600 mb-1">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Re-enter new password"
          />
        </div>

        {/* Preferences */}
        <h2 className="text-xl font-semibold mt-6">Preferences</h2>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="notifications"
            checked={formData.notifications}
            onChange={handleChange}
          />
          <label>Enable Notifications</label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="darkMode"
            checked={formData.darkMode}
            onChange={handleChange}
          />
          <label>Enable Dark Mode</label>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
