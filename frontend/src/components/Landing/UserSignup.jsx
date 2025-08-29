// src/components/Landing/UserSignup.jsx
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function UserSignup() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    locality: "",
    language: "English",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow digits in mobile
    if (name === "mobile" && !/^\d*$/.test(value)) return;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.mobile.length !== 10) {
      alert("Mobile number must be 10 digits");
      return;
    }

    console.log("Signup details:", form);
    // TODO: Send form data to backend for saving user

    // Navigate to login page after signup
    navigate("/user/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <UserPlus className="w-12 h-12 text-teal-600" />
          <h1 className="text-2xl font-semibold text-gray-800 mt-2">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill the details to get started
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              maxLength={10}
              placeholder="Enter 10-digit mobile number"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Locality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Locality
            </label>
            <input
              type="text"
              name="locality"
              value={form.locality}
              onChange={handleChange}
              required
              placeholder="Enter your locality"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Language Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Language
            </label>
            <select
              name="language"
              value={form.language}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-xl hover:bg-teal-700 transition shadow-md"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/user/login" className="text-teal-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
