import React from "react";
import { Link } from "react-router-dom";
import BookButton from "./BookButton";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center px-[2vw] py-[1vw] 
      fixed top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20 
      shadow-lg">
      
      {/* Logo */}
      <div className="logo flex-[1] font-extrabold text-[2vw] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
        <Link to="/">TeleMed</Link>
      </div>

      {/* Navigation Links */}
      <div className="Links flex text-black/80 font-medium justify-center items-center flex-[2] gap-[2.5vw] text-[1.2vw]">
        {["Home", "About", "Services", "Community"].map((item, i) => (
          <Link
            key={i}
            to={`/${item === "Home" ? "" : item}`}
            className="relative group"
          >
            <span>{item}</span>
            {/* underline effect */}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-sky-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </div>

      {/* Button */}
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
