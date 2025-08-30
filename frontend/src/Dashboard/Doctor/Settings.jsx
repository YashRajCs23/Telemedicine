import React, { useState, useEffect } from "react";

// Assuming 'api' is configured elsewhere, e.g., using Axios
// import api from './api';

const Setting = () => {
  // 1. Set initial state with the correct structure
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    notifications: true,
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 2. Add loading and feedback states
  const [loading, setLoading] = useState(true); // Start as true to show loader initially
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const doctorId = localStorage.getItem("doctorId");
        // Using your port 3000
        const response = await fetch(
          `http://localhost:3000/doctor/profile/${doctorId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();

        // Populate form with fetched data
        setFormData({
          name: data.name || "",
          email: data.email || "",
          specialization: data.speciality || "",
          notifications: data.notifications !== false, // Default to true if undefined
          password: "", // Always clear password fields
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError("Could not load profile data. Please try again later.");
      } finally {
        // 3. Set loading to false after the fetch completes (or fails)
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array is correct here, runs once on mount

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    // Clear feedback on new input
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    try {
        // --- TODO: Implement the API call to update the data ---
        // Example:
        // const doctorId = localStorage.getItem('doctorId');
        // const updateData = { ...formData };
        // delete updateData.confirmPassword; // Don't send confirmPassword to backend
        
        // await api.put(`http://localhost:3000/doctor/profile/${doctorId}`, updateData);

        setSuccess("✅ Settings updated successfully!");
        setError("");

        // Optional: clear success message after a few seconds
        setTimeout(() => setSuccess(""), 3000);

    } catch (updateError) {
        console.error("Failed to update settings:", updateError);
        setError("Failed to update settings. Please try again.");
        setSuccess("");
    }
  };
  
  // 4. Show a loading indicator while fetching data
  if (loading) {
    return <div className="p-6 text-center">Loading settings...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Doctor Settings</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-6 max-w-xl"
      >
        {error && <p className="text-red-600 font-medium">{error}</p>}
        {success && <p className="text-green-600 font-medium">{success}</p>}

        {/* --- Form Inputs (Unchanged) --- */}
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="notifications"
            checked={formData.notifications}
            onChange={handleChange}
            className="mr-2 h-4 w-4"
          />
          <label className="font-medium">Enable Notifications</label>
        </div>

        <div>
          <label className="block font-medium mb-1">Current Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter current password to change it"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm new password"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;