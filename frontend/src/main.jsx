// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";

// User/Doctor Authentication pages
import CheckUserDoctor from "./components/Landing/CheckUserDoctor.jsx";
import UserLogin from "./components/Landing/UserLogin.jsx";
import UserSignup from "./components/Landing/UserSignup.jsx";
import DoctorLogin from "./components/Landing/DoctorLogin.jsx";
import DoctorSignup from "./components/Landing/DoctorSignup.jsx";

// Dashboards
import DoctorDashboard from "./Dashboard/Doctor/DoctorDashboard.jsx";
import NotFound from "./components/Landing/NotFound.jsx";

// Services page


import UserDashboard from "./Dashboard/User/UserDashboard.jsx";

import VideoCall from "./components/VideoCall.jsx";

import "./index.css";

// import AboutSection
import AboutSection from "./components/Landing/About/AboutSection.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home Page with all sections */}
        <Route path="/" element={<App />} />

        {/* About Page */}
        <Route path="/about" element={<AboutSection />} />

        {/* Role Selection */}
        <Route path="/check" element={<CheckUserDoctor />} />

        {/* User Routes */}
        <Route path="/user">
          <Route path="login" element={<UserLogin />} />
          <Route path="signup" element={<UserSignup />} />
          <Route path="dashboard/*" element={<UserDashboard />} />
        </Route>

        {/* Doctor Routes */}
        <Route path="/doctor">
          <Route path="login" element={<DoctorLogin />} />
          <Route path="signup" element={<DoctorSignup />} />
          <Route path="dashboard/*" element={<DoctorDashboard />} />
        </Route>

        {/* Services */}
        <Route path="/services" element={<Services />} />

        {/* Video Call*/}
        <Route path="/video/:roomId" element={<VideoCall />} />

        {/* 404 Not Found */}
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
