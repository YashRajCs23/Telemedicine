// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx"; 
import CheckUserDoctor from "./components/Landing/CheckUserDoctor.jsx";

// User pages
import UserLogin from "./components/Landing/UserLogin.jsx";
import UserSignup from "./components/Landing/UserSignup.jsx";

// Doctor pages
import DoctorLogin from "./components/Landing/DoctorLogin.jsx";
import DoctorSignup from "./components/Landing/DoctorSignup.jsx";
import DoctorDashboard from "./Dashboard/Doctor/DoctorDashboard.jsx";

// Services page
import Services from "./components/Landing/Services.jsx";
import NotFound from "./components/Landing/NotFound.jsx"; 
import UserDashboard from "./Dashboard/User/UserDashboard.jsx";

// import AboutSection
import AboutSection from "./components/Landing/About/AboutSection.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<App />} />

        {/* About Page */}
        <Route path="/about" element={<AboutSection />} />

        {/* Role Selection */}
        <Route path="/check" element={<CheckUserDoctor />} />

        {/* User routes */}
        <Route path="/user">
          <Route path="login" element={<UserLogin />} />
          <Route path="signup" element={<UserSignup />} />
          <Route path="dashboard/*" element={<UserDashboard />} />
        </Route>

        {/* Doctor routes */}
        <Route path="/doctor">
          <Route path="login" element={<DoctorLogin />} />
          <Route path="signup" element={<DoctorSignup />} />
          <Route path="dashboard/*" element={<DoctorDashboard />} />
        </Route>

        {/* Services */}
        <Route path="/services" element={<Services />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
