// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx"; // Home page
import CheckUserDoctor from "./components/Landing/CheckUserDoctor.jsx";

// User pages
import UserLogin from "./components/Landing/UserLogin.jsx";
import UserSignup from "./components/Landing/UserSignup.jsx";

// Doctor pages
import DoctorLogin from "./components/Landing/DoctorLogin.jsx";
import DoctorSignup from "./components/Landing/DoctorSignup.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Home */}
      <Route path="/" element={<App />} />

      {/* Role Selection */}
      <Route path="/check" element={<CheckUserDoctor />} />

      {/* User Auth */}
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/signup" element={<UserSignup />} />

      {/* Doctor Auth */}
      <Route path="/doctor/login" element={<DoctorLogin />} />
      <Route path="/doctor/signup" element={<DoctorSignup />} />
    </Routes>
  </BrowserRouter>
);
