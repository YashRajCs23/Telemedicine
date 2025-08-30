<<<<<<< HEAD
import React from "react"; 
import BookButton from "./BookButton"; 
// import logoimage from "./Images/o.png"; // <- corrected path 
import logodoxy from "./Image/logo-removebg-preview.png"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center px-[2vw] py-[1vw] bg-white shadow-md drop-shadow-[0_4px_3px_rgba(0,0,0,0.25)] z-10 fixed top-0 ">
      {/* Logo */}
      <div className="logo flex-[1] font-bold text-[2vw] text-blue-600">
        <Link to="/">DOXY</Link>
      </div>

      {/* Navigation Links */}
      <div className="Links flex text-black font-light justify-center items-center flex-[2] gap-[2vw] text-[1.3vw]">
        <a href="#" className="hover:font-bold">
          Home
        </a>
        <a href="#AboutSection" className="hover:font-bold">
          About
        </a>
        <a href="#Services" className="hover:font-bold">
          Services
        </a>
        <a href="#Last" className="hover:font-bold">
          Community
        </a>
      </div>

      {/* Button */}
      <div className="flex-[1] flex justify-end text-[1.3vw]">
        <BookButton
          color="bg-black"
          textColor="text-white"
          hover="bg-sky-300"
        />
      </div>
    </div>
  );
};
=======
import React from "react";
import BookButton from "./BookButton";
import logodoxy from "./Image/logo-removebg-preview.png";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center px-[2vw] py-[1vw]  
      fixed top-0 z-50 backdrop-blur-md bg-black/90 shadow-xl/20 ">
>>>>>>> 57e95d347cab54a53f963bd6664ddca27442f6f7

      {/* Logo - Left */}
      <div className="logo flex-[1] font-extrabold text-[2vw] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
        <a href="#home">
          <img src={logodoxy} alt="Logo" className="w-auto h-[4vw]" />
        </a>
      </div>

      {/* Navigation Links - Center */}
      <div className="Links flex text-white/80 font-bold justify-center items-center flex-[2] gap-[2.5vw] text-[1.2vw]">
        <a href="#home" className="relative group">
          <span>Home</span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-sky-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#AboutSection" className="relative group">
          <span>About</span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-sky-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#Services" className="relative group">
          <span>Services</span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-sky-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#Last" className="relative group">
          <span>Connect Us</span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-sky-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      {/* Button - Right */}
      <div className="flex-[1] flex justify-end text-[1.1vw]">
        <BookButton
          color="bg-gradient-to-r from-blue-600 to-sky-400"
          textColor="text-white"
          hover="hover:from-sky-400 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-300"
          
        />
      </div>
    </div>
  );
};

export default Navbar;