import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Building2 } from "lucide-react";
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

      const data = await res.json();
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("userInfo", JSON.stringify(data.user));

      setLoading(false);
      navigate("/user/dashboard");
    } catch {
      setError("Something went wrong. Try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        

        {/* Login Card */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-3">Patient Access Portal</h1>
            <p className="text-slate-400 text-lg">
              Secure authentication to your healthcare dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-900/50 border border-red-500/50 rounded-xl backdrop-blur-sm">
              <p className="text-red-300 text-sm font-medium text-center">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <div className="space-y-8">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Email Address
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

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••••••"
                  className="block w-full pl-14 pr-14 py-4 bg-slate-900/70 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
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
              onClick={handleSubmit}
              disabled={loading}
              className="group w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-5 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-sky-600 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-lg">Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">Access Dashboard</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-10 text-center space-y-6">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/user/signup"
                className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Create Account
              </Link>
            </p>
            
            <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
              <a href="#" className="hover:text-slate-300 transition-colors font-medium">Privacy Policy</a>
              <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
              <a href="#" className="hover:text-slate-300 transition-colors font-medium">Terms of Service</a>
              <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
              <a href="#" className="hover:text-slate-300 transition-colors font-medium">Support Center</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}