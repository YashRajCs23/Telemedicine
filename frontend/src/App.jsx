// src/App.jsx

// Landing Components
import Navbar from "./components/Landing/Navbar";
import Herosection from "./components/Landing/Herosection";
import Background from "./components/Landing/Background";
import Footer from "./components/Landing/Footer";

import './App.css';


import './App.css'
import UserLogin from './components/Landing/UserLogin.jsx'
import UserSignup from './components/Landing/UserSignup.jsx'
import DoctorLogin from './components/Landing/DoctorLogin'
import DoctorSignup from './components/Landing/UserLogin.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router'
import AboutSection from './components/Landing/About/AboutSection.jsx'

  

function App() {
  return (
    <>
      <Navbar />
      <Background />
      <Herosection />
      <AboutSection/>
      <Footer />
    </>
  );
}

export default App;
