// src/components/Landing/UserLogin.jsx
import { useState } from "react";
import { Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserLogin() {
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (/^[0-9]{10}$/.test(mobile)) {
      console.log("Login with mobile:", mobile);
      // TODO: Call backend API to send OTP
      alert(`OTP sent to ${mobile}`);
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <Smartphone className="w-12 h-12 text-teal-600" />
          <h1 className="text-2xl font-semibold text-gray-800 mt-2">
            TeleMed Login
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your mobile number to receive OTP
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              maxLength={10}
              placeholder="Enter 10-digit mobile number"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-xl hover:bg-teal-700 transition shadow-md"
          >
            Send OTP
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/user/signup"   // ✅ Fixed path
            className="text-teal-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}