import React from "react";

const AboutSection = () => {
  return (
    <div className="w-full min-h-screen bg-white px-4 md:px-8 py-8 md:py-12 shadow-lg shadow-blue-100">
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-6 md:gap-8">
        {/* Title Section */}
        <div className="h-auto md:h-[20vw] flex items-center justify-center md:justify-start">
          <h1 className="text-gray-400 text-[40vw] md:text-5xl lg:text-6xl xl:text-[4vw] px-2 md:px-4 py-4 font-medium">
            About Us
          </h1>
        </div>
        
        {/* Image Section */}
        <div className="flex justify-center md:justify-end">
          <img 
            className="w-full max-w-md md:w-[21vw] md:h-[21vw] rounded-2xl md:rounded-[2vw] object-cover" 
            src="data:image/png;base64,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" 
            alt="About Us" 
          />
        </div>
        
        {/* Description Section */}
        <div className="bg-white col-span-1 md:col-span-2 p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-[2.5vw] font-medium mb-2 md:mb-4">
            We provide Comprehensive{" "}
            <span className="text-sky-300 font-bold">healthcare</span> solutions
          </h1>
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-[2.5vw] font-medium mb-2 md:mb-4">
            From experts in medical support
          </h1>
          <h1 className="text-gray-500 text-xl md:text-2xl lg:text-3xl xl:text-[2.5vw] font-medium mb-2 md:mb-4">
            Diagnostics and customer care runs smoothly
          </h1>
          <h1 className="text-gray-500 text-xl md:text-2xl lg:text-3xl xl:text-[2.5vw] font-medium">
            Efficiently managing patient requirements and user support
          </h1>
        </div>
        
        {/* Stats Section */}
        <div className="bg-white col-span-1 md:col-span-2 p-4 md:p-8 flex items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
            <div className="bg-white border border-blue-200 h-auto p-4 md:p-6 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[1.8vw] font-bold mb-2">285K+</h2>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg xl:text-[1vw]">
                Patients treated with care and expertise across our network
              </p>
            </div>
            <div className="bg-white border border-blue-200 h-auto p-4 md:p-6 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[1.8vw] font-bold mb-2">500+</h2>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg xl:text-[1vw]">
                Medical professionals providing expert care and support
              </p>
            </div>
            <div className="bg-white border border-blue-200 h-auto p-4 md:p-6 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[1.8vw] font-bold mb-2">99%</h2>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg xl:text-[1vw]">
                Patient satisfaction rate with our comprehensive services
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;