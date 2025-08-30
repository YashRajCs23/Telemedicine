import { useNavigate } from "react-router-dom";
import { User, Stethoscope, Shield, CheckCircle, ArrowRight } from "lucide-react";

export default function CheckUserDoctor() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-100/20 rounded-full blur-2xl"></div>
      
      <div className="flex min-h-screen relative z-10">
        {/* Left Section - Branding & Information */}
        <div className="w-1/2 flex flex-col justify-center px-12 lg:px-16 bg-black backdrop-blur-sm">
          <div className="max-w-xl">
            {/* Logo/Brand Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                  DOXY
                </h2>
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-sky-500 rounded-full"></div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Secure Healthcare
              <span className="block bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Access Portal
              </span>
            </h1>

            <p className="text-lg text-white mb-8 leading-relaxed">
              Join thousands of healthcare professionals and patients who trust our platform 
              for secure, efficient, and comprehensive telehealth solutions.
            </p>

            {/* Feature List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-white">Ai powered</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-white">24/7 Platform Availability</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-white">End-to-End Encryption</span>
              </div>
            </div>

            {/* Trust Indicators */}
           
          </div>
        </div>

        {/* Right Section - Role Selection */}
        <div className="w-1/2 flex flex-col justify-center items-center px-8 lg:px-12">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-3">
                Choose Your Role
              </h2>
              <p className="text-slate-600">
                Choose how you'd like to access the platform
              </p>
            </div>

            {/* Role Cards */}
            <div className="space-y-4">
              {/* Patient/User Card */}
              <button
                onClick={() => navigate("/user/login")}
                className="group bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl p-6 cursor-pointer hover:border-teal-300 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] w-full"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
                        I am a User
                      </h3>
                      <p className="text-sm text-slate-500">
                        Book appointments & consultations
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </button>

              {/* Doctor Card */}
              <button
                onClick={() => navigate("/doctor/login")}
                className="group bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl p-6 cursor-pointer hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] w-full"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Stethoscope className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                        I am a Doctor
                      </h3>
                      <p className="text-sm text-slate-500">
                        Manage patients & consultations
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </button>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}