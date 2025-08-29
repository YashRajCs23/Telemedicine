import { useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Briefcase,
  Mail,
  FileText,
  Eye,
  EyeOff,
  Lock,
  Loader2,
} from "lucide-react";

export default function DoctrSignup() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    locality: "",
    experience: "",
    email: "",
    password: "",
    description: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!/^\+?\d{10,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number";
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

    // Simulate API call
    setTimeout(() => {
      console.log("Doctor details submitted:", form);
      setLoading(false);
      setSuccess(true);
      setForm({
        name: "",
        phone: "",
        locality: "",
        experience: "",
        email: "",
        password: "",
        description: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Doctor Registration
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Fill in your details to join the telemedicine platform
        </p>

        {success && (
          <p className="text-green-600 text-center font-medium mb-4">
            ✅ Registration successful!
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <InputField
            icon={User}
            label="Full Name"
            name="name"
            placeholder="Dr. John Doe"
            value={form.name}
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <InputField
            icon={Phone}
            label="Phone Number"
            name="phone"
            placeholder="+91 9876543210"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />

          {/* Locality */}
          <InputField
            icon={MapPin}
            label="Locality"
            name="locality"
            placeholder="Bangalore, India"
            value={form.locality}
            onChange={handleChange}
            required
          />

          {/* Experience */}
          <InputField
            icon={Briefcase}
            label="Experience (Years)"
            name="experience"
            type="number"
            placeholder="5"
            value={form.experience}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <InputField
            icon={Mail}
            label="Email Address"
            name="email"
            placeholder="doctor@example.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

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
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <div className="flex items-start border rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
              <FileText className="h-5 w-5 text-gray-400 mr-2 mt-1" />
              <textarea
                name="description"
                placeholder="Briefly describe your specialization..."
                value={form.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full outline-none text-gray-700 placeholder-gray-400 resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ✅ Reusable Input Field Component */
function InputField({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  error,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <div className="flex items-center border rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
        <Icon className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
