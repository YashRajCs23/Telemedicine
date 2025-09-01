import Navbar from "./components/Landing/Navbar";
import Herosection from "./components/Landing/Herosection";
import Background from "./components/Landing/Background";
import Footer from "./components/Landing/Footer";
import AboutSection from './components/Landing/About/AboutSection.jsx'
import Services from "./components/Landing/Services.jsx";
import Last from "./components/Landing/Last.jsx";

import "./App.css";
import SomePoints from "./components/Landing/somepoints.jsx";

function App() {
  return (
    <>
      <Navbar />
      
      {/* Home Section - Background and Hero combined */}
      <section id="home">
        <Background />
        <Herosection />
      </section>
      
      {/* About Section */}
      <section id="AboutSection">
        <AboutSection />
      </section>
      
      {/* Services Section */}
      <section id="Services">
        <Services />
        <SomePoints />
      </section>
      
      {/* Contact/Connect Section */}
      <section id="Last">
        <Last />
      </section>
      
      <Footer />
    </>
  );
}

export default App;