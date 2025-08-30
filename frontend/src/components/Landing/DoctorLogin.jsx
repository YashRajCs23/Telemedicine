// src/DoctorLogin.jsx
import { useState } from "react";
import { Mail, Phone, Lock, Eye, EyeOff, Stethoscope } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function DoctorLogin() {
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
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/doctor/login", {
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
      // You can store token or doctor info here if needed
      localStorage.setItem("token", data.token);
      localStorage.setItem("doctorId", data.doctor._id);
      // localStorage.setItem("doctorId", data.doctor._id); // Store doctor ID
      setLoading(false);
      navigate("/doctor/dashboard"); // Change route as per your app
    } catch (err) {
      setError("Something went wrong. Try again later.");
      setLoading(false);
    }
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
        {error && (
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
        )}
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email or Phone */}
          <InputField
            icon={form.email.includes("@") ? Mail : Phone}
            label="Email or Phone Number"
            name="email"
            placeholder="doctor@example.com / 9876543210"
            value={form.emailOrPhoneNumber}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <InputField
            icon={Lock}
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
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

/* Reusable Input Field Component */
function InputField({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  showPassword,
  setShowPassword,
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
        {name === "password" && setShowPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}