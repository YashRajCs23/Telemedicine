// src/CheckUserDoctor.jsx
import { useNavigate } from "react-router-dom";
import { User, Stethoscope } from "lucide-react";

export default function CheckUserDoctor() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Choose Your Role
        </h1>

        <div className="space-y-4">
          {/* User Button */}
          <button
            onClick={() => navigate("/user/login")}
            className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 transition shadow-md"
          >
            <User className="w-5 h-5" />
            I am a User
          </button>

          {/* Doctor Button */}
          <button
            onClick={() => navigate("/doctor/login")}
            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition shadow-md"
          >
            <Stethoscope className="w-5 h-5" />
            I am a Doctor
          </button>
        </div>
      </div>
    </div>
  );
}
