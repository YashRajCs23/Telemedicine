// src/components/Landing/UserLogin.jsx
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setError("Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      setLoading(false);
      navigate("/user/dashboard"); // Change route as per your app
    } catch {
      setError("Something went wrong. Try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xs p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-teal-700">Patient Login</h1>
          <p className="text-gray-500 text-sm mt-">
            Enter your credentials to continue
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-teal-400">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="patient@example.com"
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-teal-400">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-all duration-300 shadow-lg disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/user/signup"
            className="text-teal-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
