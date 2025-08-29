import React from "react";
import { Link } from "react-router-dom";
import BookButton from "./BookButton";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center px-[2vw] py-[1vw] bg-white shadow-md drop-shadow-[0_4px_3px_rgba(0,0,0,0.25)] fixed top-0 ">
      {/* Logo */}
      <div className="logo flex-[1] font-bold text-[2vw] text-blue-600">
        <Link to="/">TeleMed</Link>
      </div>

      {/* Navigation Links */}
      <div className="Links flex text-black font-light justify-center items-center flex-[2] gap-[2vw] text-[1.3vw]">
        <Link to="/" className="hover:font-bold">
          Home
        </Link>
        <Link to="/AboutSection" className="hover:font-bold">
          About
        </Link>
        <Link to="#Services" className="hover:font-bold">
          Services
        </Link>
        <Link to="/Last" className="hover:font-bold">
          Community
        </Link>
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

export default Navbar;