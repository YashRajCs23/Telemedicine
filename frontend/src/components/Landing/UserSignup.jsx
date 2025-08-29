// src/components/Landing/UserSignup.jsx
import { useState } from "react";
import { UserPlus, Mail, Lock, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function UserSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    locality: "",
    language: "English",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber" && !/^\d*$/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    if (form.phoneNumber.length !== 10) {
      setError("Phone number must be 10 digits");
      return false;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setError("Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      setLoading(false);
      navigate("/user/login");
    } catch {
      setError("Something went wrong. Try again later.");
      setLoading(false);
    }
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

        {/* Error */}
        {error && (
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
        )}

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

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center rounded-xl border border-gray-300 px-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none rounded-xl"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center rounded-xl border border-gray-300 px-3">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none rounded-xl"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex items-center rounded-xl border border-gray-300 px-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                required
                maxLength={10}
                placeholder="Enter 10-digit phone number"
                className="w-full px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none rounded-xl"
              />
            </div>
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
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/user/login"
            className="text-teal-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
