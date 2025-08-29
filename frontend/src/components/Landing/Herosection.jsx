import React from "react";
import BookButton from "./BookButton";
import Background from "./Background";

const Herosection = () => {
  return (
    
    <div className="flex justify-center items-center px-[2vw] py-[2vw] w-full h-[80vh] gap-[2vw] bg-white z-10">
    
      {/* Left Section */}
      <div className="left w-1/2 h-full flex flex-col justify-center gap-6 text-black">
        <div className="">
          <h1 className="text-5xl font-bold">Enabling exceptional</h1>
          <h1 className="text-5xl font-bold">
            <span className="text-sky-300 ">telehealth</span> at every
          </h1>
          <h1 className="text-5xl font-bold">touchpoint</h1>
        </div>

        <p className="text-lg text-gray-400 max-w-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          fugit!
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <BookButton color="bg-black" textColor="text-white" />
          <a
            href="#"
            className="px-6 py-2 border border-white text-blue-800 font-semibold rounded-lg  hover:bg-sky-200 hover:text-white  transition"
          >
            Sign Up
          </a>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="image w-1/2 h-full flex justify-center items-center">
        <img src="https://www.pexels.com/photo/woman-with-stethoscope-around-her-neck-5407252/"
          alt="Telehealth Illustration"
          className="w-[80%] h-[80%] object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Herosection;
