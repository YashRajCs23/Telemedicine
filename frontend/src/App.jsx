// src/App.jsx

// Landing Components
import Navbar from "./components/Landing/Navbar";
import Herosection from "./components/Landing/Herosection";
import Background from "./components/Landing/Background";
import Footer from "./components/Landing/Footer";

import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Background />
      <Herosection />
      <Footer />
    </>
  );
}

export default App;
