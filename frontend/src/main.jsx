import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <App />
  </StrictMode>,
)
import App from "./App.jsx"; // Home page
import CheckUserDoctor from "./components/Landing/CheckUserDoctor.jsx";

// User pages
import UserLogin from "./components/Landing/UserLogin.jsx";
import UserSignup from "./components/Landing/UserSignup.jsx";

// Doctor pages
import DoctorLogin from "./components/Landing/DoctorLogin.jsx";
import DoctorSignup from "./components/Landing/DoctorSignup.jsx";

// Services page
import Services from "./components/Landing/Services.jsx";
import NotFound from "./components/Landing/NotFound.jsx"; // optional 404 page

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<App />} />

        {/* Role Selection */}
        <Route path="/check" element={<CheckUserDoctor />} />

        {/* User routes */}
        <Route path="/user">
          <Route path="login" element={<UserLogin />} />
          <Route path="signup" element={<UserSignup />} />
        </Route>

        {/* Doctor routes */}
        <Route path="/doctor">
          <Route path="login" element={<DoctorLogin />} />
          <Route path="signup" element={<DoctorSignup />} />
        </Route>

        {/* Services */}
        <Route path="/services" element={<Services />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
