// src/App.jsx
import { Routes, Route } from "react-router-dom";

// Landing Components
import Navbar from "./components/Landing/Navbar";
import Herosection from "./components/Landing/Herosection";
import Background from "./components/Landing/Background";

// Auth Pages
import UserLogin from "./components/Landing/UserLogin";
import UserSignup from "./components/Landing/UserSignup";
import DoctorLogin from "./components/Landing/DoctorLogin";
import DoctorSignup from "./components/Landing/DoctorSignup"; 
import CheckUserDoctor from "./components/Landing/CheckUserDoctor";


import './App.css'
import UserLogin from './components/Landing/UserLogin.jsx'
import UserSignup from './components/Landing/UserSignup.jsx'
import DoctorLogin from './components/Landing/DoctorLogin'
import DoctorSignup from './components/Landing/UserLogin.jsx'

import Footer from './components/Landing/footer.jsx'
function App() {
  return (
    <>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Background />
              <Herosection />
            </>
          }
        />

        {/* Role Selection Page */}
        <Route path="/check" element={<CheckUserDoctor />} />

        {/* User Routes */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />

        {/* Doctor Routes */}
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/signup" element={<DoctorSignup />} />
      </Routes>
    </>
  );
}

export default App;