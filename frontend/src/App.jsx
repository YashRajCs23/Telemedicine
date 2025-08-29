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
import Services from "./components/Landing/Services.jsx";
import Last from "./components/Landing/Last.jsx";
import { createBrowserRouter } from "react-router";

  

function App() {

  return (
    <>
      <Navbar />
      <Background />
      <Herosection />
      <AboutSection/>
      <Services/>
      <Last/>
      <Footer />
    </>
  );
}

export default App;
