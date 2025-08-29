import React from "react";
import BookButton from "./BookButton";

const Last = () => {
  return (
    <section className=" py-16 px-6 text-center text-black">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Catchy Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Hey, don’t waste your time!  
          <br /> Consult a doctor today.
        </h2>

        {/* Supporting Text */}
        <p className="text-lg md:text-xl text-gray-600">
          Get expert medical advice, anytime, anywhere. Take the first step
          towards better health now.
        </p>

        {/* Book Now Button */}
        <div>
          <BookButton color="bg-black" textColor="text-white" />
        </div>
      </div>
    </section>
  );
};

export default Last;
