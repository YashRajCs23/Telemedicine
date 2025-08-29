import { Bot, Video, Shield, Users } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Bot,
      title: "AI Medical Chatbot",
      description:
        "Get instant medical guidance with our advanced AI assistant. Available 24/7 to answer your health questions and provide preliminary assessments.",
      features: [
        "24/7 Availability",
        "Instant Responses",
        "Medical Knowledge Base",
        "Symptom Assessment",
      ],
    },
    {
      icon: Video,
      title: "1-on-1 Video Consultations",
      description:
        "Connect directly with certified doctors through secure video calls. Get personalized medical advice from the comfort of your home.",
      features: [
        "Certified Doctors",
        "Secure Video Calls",
        "Prescription Services",
        "Follow-up Support",
      ],
    },
    {
      icon: Shield,
      title: "Secure Data Protection",
      description:
        "Your health information is protected with enterprise-grade security. We ensure complete privacy and compliance with healthcare regulations.",
      features: [
        "HIPAA Compliant",
        "End-to-End Encryption",
        "Secure Storage",
        "Privacy Controls",
      ],
    },
    {
      icon: Users,
      title: "Best Local Doctors",
      description:
        "Access a network of top-rated doctors in your area. We connect you with specialists and general practitioners near you.",
      features: [
        "Verified Professionals",
        "Local Network",
        "Specialist Access",
        "Quality Ratings",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Healthcare
              <span className="block text-blue-600">At Your Fingertips</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Bringing quality medical care to rural communities through
              innovative telemedicine solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white text-lg px-8 py-4 rounded-xl hover:bg-blue-700 transition">
                Get Started Today
              </button>
              <button className="border border-gray-300 text-lg px-8 py-4 rounded-xl hover:bg-gray-100 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive telemedicine solutions designed specifically for
              rural communities, ensuring everyone has access to quality
              healthcare.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white shadow-md hover:shadow-lg transition cursor-pointer border"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
