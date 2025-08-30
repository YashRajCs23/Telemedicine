import { useState } from "react";
import { UserPlus, Mail, Lock, Phone, ArrowRight, Building2 } from "lucide-react";
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
    setError("");

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
      

        {/* Signup Card */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-3">Create Account</h1>
            <p className="text-slate-400 text-lg">
              Fill the details to get started
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-900/50 border border-red-500/50 rounded-xl backdrop-blur-sm">
              <p className="text-red-300 text-sm font-medium text-center">{error}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="block w-full px-5 py-4 bg-slate-900/70 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="patient@healthcore.com"
                  className="block w-full pl-14 pr-5 py-4 bg-slate-900/70 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••••••"
                  className="block w-full pl-14 pr-5 py-4 bg-slate-900/70 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  placeholder="Enter 10-digit phone number"
                  className="block w-full pl-14 pr-5 py-4 bg-slate-900/70 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Locality */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Locality
              </label>
              <input
                type="text"
                name="locality"
                value={form.locality}
                onChange={handleChange}
                required
                placeholder="Enter your locality"
                className="block w-full px-5 py-4 bg-slate-900/70 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Language Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Preferred Language
              </label>
              <select
                name="language"
                value={form.language}
                onChange={handleChange}
                className="block w-full px-5 py-4 bg-slate-900/70 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
              >
                <option value="English" className="bg-slate-800 text-white">English</option>
                <option value="Hindi" className="bg-slate-800 text-white">Hindi</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-5 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-sky-600 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <span className="flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-lg">Signing up...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">Sign Up</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/user/login"
              className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
