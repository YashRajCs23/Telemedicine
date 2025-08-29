// src/App.jsx

// Landing Components
import Navbar from "./components/Landing/Navbar";
import Herosection from "./components/Landing/Herosection";
import Background from "./components/Landing/Background";
import Footer from "./components/Landing/Footer";
import AboutSection from "./components/Landing/About/AboutSection.jsx";
import Services from "./components/Landing/Services.jsx";
import Last from "./components/Landing/Last.jsx";

import "./App.css";
import SomePoints from "./components/Landing/somepoints.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Background />
      <Herosection />
      <AboutSection />
      <Services />
      <SomePoints/>
      <Last />
      <Footer />
    </>
  );
}

export default App;
