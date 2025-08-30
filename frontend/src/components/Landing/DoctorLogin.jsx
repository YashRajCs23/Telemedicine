import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Phone,
  MapPin,
  Briefcase,
  Mail,
  Eye,
  EyeOff,
  Lock,
  Stethoscope,
  ArrowRight
} from "lucide-react";

export default function DoctorSignup() {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    locality: "",
    yearsOfExperience: "",
    email: "",
    password: "",
    speciality: "", 
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!/^\+?\d{10,15}$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid phone number (10–15 digits)";
    }
    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:3000/doctor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        console.error("❌ Registration failed:", res.error);
        setErrors({ submit: "Failed to register. Please try again." });
        return;
      }

      const data = await res.json();
      console.log("✅ Registration success:", data);

      setSuccess(true);
      setForm({
        name: "",
        phoneNumber: "",
        locality: "",
        yearsOfExperience: "",
        email: "",
        password: "",
        speciality: "",
      });
      setErrors({});
      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate("/doctor/login");
      }, 1000);
    } catch (error) {
      console.error("❌ Error:", error);
      setErrors({ submit: "Something went wrong. Try again later." });
    } finally {
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
            <div className="flex items-center justify-center mb-4">
              <Stethoscope className="h-8 w-8 text-blue-400 mr-2" />
              <h1 className="text-3xl font-bold text-white">Medical Practitioner Registration</h1>
            </div>
            <p className="text-slate-400 text-lg">
              Join our telemedicine platform to serve patients
            </p>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-8 p-4 bg-green-900/50 border border-green-500/50 rounded-xl backdrop-blur-sm">
              <p className="text-green-300 text-sm font-medium text-center">
                ✅ Registration successful! Redirecting to login...
              </p>
            </div>
          )}
          
          {errors.submit && (
            <div className="mb-8 p-4 bg-red-900/50 border border-red-500/50 rounded-xl backdrop-blur-sm">
              <p className="text-red-300 text-sm font-medium text-center">{errors.submit}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Dr. John Doe"
                  className="block w-full pl-14 pr-5 py-4 bg-slate-900/70 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                  placeholder="+91 9876543210"
                  className="block w-full pl-14 pr-5 py-4 bg-slate-900/70 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-400 text-xs mt-2 ml-1">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Locality Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Locality
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="locality"
                  value={form.locality}
                  onChange={handleChange}
                  required
                  placeholder="Bangalore, India"
                  className="block w-full pl-14 pr-5 py-4 bg-slate-900/70 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Experience Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Years of Experience
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={form.yearsOfExperience}
                  onChange={handleChange}
                  required
                  placeholder="5"
                  className="block w-full pl-14 pr-5 py-4 bg-slate-900/70 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </div>

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
                  placeholder="doctor@healthcare.com"
                  className="block w-full pl-14 pr-5 py-4 bg-slate-900/70 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-2 ml-1">{errors.email}</p>
              )}
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
              {errors.password && (
                <p className="text-red-400 text-xs mt-2 ml-1">{errors.password}</p>
              )}
            </div>

            {/* Specialty Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Specialty
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Stethoscope className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  name="speciality"
                  value={form.speciality}
                  onChange={handleChange}
                  required
                  className="block w-full pl-14 pr-10 py-4 bg-slate-900/70 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm appearance-none"
                >
                  <option value="">Select Specialty</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Orthopedic">Orthopedic</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Psychiatrist">Psychiatrist</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dentist">Dentist</option>
                  <option value="ENT Specialist">ENT Specialist</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-5 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-sky-600 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-lg">Registering...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">Create Account</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-10 text-center space-y-6">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link
                to="/doctor/login"
                className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Login here
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