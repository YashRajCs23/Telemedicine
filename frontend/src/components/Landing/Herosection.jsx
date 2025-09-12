import React from "react";
import { Link } from "react-router-dom";
import BookButton from "./BookButton";
import imagehome from "./Image/unnamed.png"

const Herosection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center px-6 md:px-12 pt-16 pb-8 w-full min-h-[88vh] gap-8 lg:gap-16">

      {/* Left Section */}
      <div className="left w-[40vw] lg:w-[40%] flex flex-col justify-center gap-4 md:gap-6 text-black ">
        <div>
          <h1 className="text-7xl sm:text-4xl md:text-5xl font-bold">Enabling exceptional</h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-sky-300">telehealth</span> at every
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">touchpoint</h1>
        </div>

        <p className="text-base md:text-lg text-gray-500 max-w-lg">
          Empowering patients and doctors through seamless, unbiased telehealth solutions. No one is left behind—your health matters, your data stays secure, and every consultation is treated equally.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <BookButton color="bg-black" textColor="text-white" />

          {/* Redirect to role selection (CheckUserDoctor page) */}
          <Link
            to="/check"
            className="px-6 py-2 border border-sky-400 text-sky-600 font-semibold rounded-lg hover:bg-sky-400 hover:text-white transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Right Section (Image) */}
       
<div className="image w-[60vw] lg:w-[55%] flex justify-center items-center mt-8 lg:mt-0">
        <img
          src={imagehome}
          alt="Telehealth Illustration"
          className="w-full h-auto max-w-xs lg:max-w-sm rounded-2xl shadow-2xl hover:scale-105 transition duration-500"
        />
      </div>
    </div>
  );
};

export default Herosection;