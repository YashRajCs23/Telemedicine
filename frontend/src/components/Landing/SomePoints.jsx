import React from 'react';

// Main application component
const SomePoints= () => {
  // Data for each of the four steps
  const stepsData = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Sign up with your basic information and medical history',
    },
    {
      number: '02',
      title: 'Book Appointment',
      description: 'Choose your preferred doctor and available time slot',
    },
    {
      number: '03',
      title: 'Connect Securely',
      description: 'Join your video consultation from any device',
    },
    {
      number: '04',
      title: 'Get Treatment',
      description: 'Receive personalized care and follow-up instructions',
    },
  ];

  return (
    <div className="bg-gray-50 flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl w-full">
        {/* Title and subtitle section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sky-600 bg-emerald-100 text-sm font-semibold mb-4">
            How it Works
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 mb-4">
            Get Started in 4 Simple Steps
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Our streamlined process makes it easy to access quality healthcare from the comfort of your home.
          </p>
        </div>

        {/* The four step cards section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stepsData.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105">
              {/* Step number circle */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-sky-300 text-white font-bold text-2xl mb-6">
                {step.number}
              </div>
              
              {/* Step title */}
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {step.title}
              </h2>
              
              {/* Step description */}
              <p className="text-sm text-gray-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SomePoints;