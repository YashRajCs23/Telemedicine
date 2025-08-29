import React from "react";
import { Link } from "react-router-dom";
import BookButton from "./BookButton";

const Herosection = () => {
  return (
    <div className="flex justify-center items-center px-[4vw] py-[1vw] w-full h-[88vh] gap-[2vw]">
      
      {/* Left Section */}
      <div className="left w-[40vw] h-full flex flex-col justify-center gap-6 text-black">
        <div>
          <h1 className="text-5xl font-bold">Enabling exceptional</h1>
          <h1 className="text-5xl font-bold">
            <span className="text-sky-300">telehealth</span> at every
          </h1>
          <h1 className="text-5xl font-bold">touchpoint</h1>
        </div>

        <p className="text-lg text-gray-500 max-w-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          fugit! Empowering patients and doctors through seamless telehealth
          solutions.
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
      <div className="image w-[60vw] h-full flex justify-center items-center">
        <img
          src="https://media.istockphoto.com/id/2190554545/photo/smiling-black-doctor-holding-tablet-talking-to-senior-patient-in-consultation.webp?a=1&b=1&s=612x612&w=0&k=20&c=kpZrZUYqw7qnRC-oADKju22R044DS8iaGvmEJODE06g="
          alt="Telehealth Illustration"
          className="w-[80%] h-[80%] object-cover rounded-[2vw] shadow-lg"
        />
      </div>
    </div>
  );
};

export default Herosection;
