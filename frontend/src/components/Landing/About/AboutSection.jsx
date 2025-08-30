import React, { useState, useEffect } from "react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ patients: 0, professionals: 0, satisfaction: 0 });

  

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate counters
          const duration = 2000;
          const steps = 60;
          const increment = duration / steps;
          
          let currentStep = 0;
          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            
            setCounters({
              patients: Math.floor(285 * progress),
              professionals: Math.floor(500 * progress),
              satisfaction: Math.floor(99 * progress)
            });
            
            if (currentStep >= steps) {
              clearInterval(timer);
              setCounters({ patients: 285, professionals: 500, satisfaction: 99 });
            }
          }, increment);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about-stats');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Quick Diagnostics",
      description: "AI based Chatbot that helps users to get quick problem to there solution"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Expert Medical Team",
      description: "Board-certified physicians and specialists with decades of combined experience"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "24/7 Patient Support",
      description: "Round-the-clock medical assistance and emergency care services"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Comprehensive Records",
      description: "Integrated digital health records and seamless care coordination"
    }
  ];

  const achievements = [
    {
      number: counters.patients,
      suffix: "K+",
      title: "Patients Served",
      description: "Successfully treated patients across our comprehensive healthcare network with exceptional outcomes and personalized care.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: "from-blue-600 via-blue-700 to-indigo-800"
    },
    {
      number: counters.professionals,
      suffix: "+",
      title: "Medical Professionals",
      description: "Highly qualified healthcare specialists, nurses, and support staff dedicated to providing world-class medical care.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
        </svg>
      ),
      gradient: "from-emerald-600 via-green-700 to-teal-800"
    },
    {
      number: counters.satisfaction,
      suffix: "%",
      title: "Patient Satisfaction",
      description: "Exceptional patient satisfaction rate through our commitment to quality care, innovation, and patient-centered approach.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      gradient: "from-purple-600 via-violet-700 to-purple-800"
    }
  ];

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        
        {/* Header Section */}
        <div className="text-center mb-20 lg:mb-28">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            Excellence in Healthcare
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-6 tracking-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Our Mission
            </span>
          </h1>
          
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-8"></div>
          
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Transforming healthcare through innovation, compassion, and unwavering commitment to patient excellence.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-28">
          
          {/* Content Side */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Comprehensive{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Healthcare
                </span>{" "}
                Solutions
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                We deliver exceptional medical care through cutting-edge technology, 
                expert clinical teams, and a patient-first approach that ensures the 
                highest standards of healthcare excellence.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="group p-6 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-blue-600 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Modern Healthcare Facility"
                className="w-full h-[600px] object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/10 rounded-full backdrop-blur-sm border border-white/20"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-500/10 rounded-full backdrop-blur-sm border border-white/20"></div>
            
            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 max-w-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Quality Assured</p>
                  <p className="text-gray-600 text-sm">Accredited Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics */}
        <div id="about-stats" className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Track Record of Excellence
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that reflect our commitment to exceptional healthcare delivery and patient satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`text-transparent bg-clip-text bg-gradient-to-r ${achievement.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {achievement.icon}
                </div>
                
                {/* Number */}
                <div className="mb-4">
                  <span className={`text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${achievement.gradient}`}>
                    {achievement.number}
                  </span>
                  <span className={`text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${achievement.gradient}`}>
                    {achievement.suffix}
                  </span>
                </div>
                
                {/* Title */}
                <h4 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                  {achievement.title}
                </h4>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {achievement.description}
                </p>
                
                {/* Progress Bar */}
                <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${achievement.gradient} group-hover:w-full transition-all duration-700 delay-100`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-indigo-600 to-sky-600 rounded-3xl p-12 lg:p-16 text-white">
          <h3 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Experience Excellence in Healthcare?
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust us with their healthcare needs.
          </p>
          <a className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105" href="#Last">
            Schedule Your Consultation
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;