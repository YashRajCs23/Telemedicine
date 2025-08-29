// src/DoctorLogin.jsx
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

export default function DoctorLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor login details:", form);
    // TODO: send form data to backend API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <Stethoscope className="h-10 w-10 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-blue-700">Doctor Login</h1>
        </div>
        <p className="text-gray-500 text-center mb-6">
          Access your telemedicine account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="doctor@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <Lock className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            Login
          </button>

          {/* Extra Links */}
          <div className="flex justify-between text-sm text-gray-500 mt-3">
            <Link to="/doctor/forgot-password" className="hover:text-blue-600">
              Forgot Password?
            </Link>
            <Link to="/doctor/signup" className="hover:text-blue-600">
              New Doctor? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}