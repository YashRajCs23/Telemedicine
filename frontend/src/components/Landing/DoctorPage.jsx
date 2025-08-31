import { Phone, Mail, MapPin, Stethoscope } from "lucide-react";
// import Navbar from "./Navbar";
import logodoxy from "./Image/logo-removebg-preview.png";
import BookButton from "./BookButton";
import { Link } from "react-router";

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    qualification: "MBBS, MD (Cardiology) | 12+ years experience",
    email: "sarah.johnson@telehealth.com",
    phone: "+91 98765 43210",
    location: "New Delhi, India",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Dr. Rajesh Kumar",
    specialty: "Dermatologist",
    qualification: "MBBS, MD (Dermatology) | 10+ years experience",
    email: "rajesh.kumar@telehealth.com",
    phone: "+91 91234 56789",
    location: "Mumbai, India",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Dr. Emily Carter",
    specialty: "Pediatrician",
    qualification: "MBBS, DCH | 8+ years experience",
    email: "emily.carter@telehealth.com",
    phone: "+91 99876 54321",
    location: "Bengaluru, India",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Dr. Arjun Mehta",
    specialty: "Orthopedic Surgeon",
    qualification: "MBBS, MS (Ortho) | 15+ years experience",
    email: "arjun.mehta@telehealth.com",
    phone: "+91 90012 34567",
    location: "Chennai, India",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Dr. Priya Nair",
    specialty: "Gynecologist",
    qualification: "MBBS, MD (Gynecology) | 11+ years experience",
    email: "priya.nair@telehealth.com",
    phone: "+91 93456 78901",
    location: "Kochi, India",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "Dr. Michael Brown",
    specialty: "Neurologist",
    qualification: "MBBS, DM (Neuro) | 14+ years experience",
    email: "michael.brown@telehealth.com",
    phone: "+91 97654 32109",
    location: "Hyderabad, India",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
  },
  {
    name: "Dr. Ananya Sharma",
    specialty: "Psychiatrist",
    qualification: "MBBS, MD (Psychiatry) | 9+ years experience",
    email: "ananya.sharma@telehealth.com",
    phone: "+91 94567 12345",
    location: "Pune, India",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    name: "Dr. David Wilson",
    specialty: "Oncologist",
    qualification: "MBBS, MD (Oncology) | 13+ years experience",
    email: "david.wilson@telehealth.com",
    phone: "+91 92345 67890",
    location: "Delhi, India",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
  },
  {
    name: "Dr. Kavita Reddy",
    specialty: "Endocrinologist",
    qualification: "MBBS, DM (Endocrinology) | 12+ years experience",
    email: "kavita.reddy@telehealth.com",
    phone: "+91 95432 10987",
    location: "Ahmedabad, India",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    name: "Dr. Thomas Lee",
    specialty: "General Physician",
    qualification: "MBBS, MD | 7+ years experience",
    email: "thomas.lee@telehealth.com",
    phone: "+91 99812 34560",
    location: "Kolkata, India",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
  },
];

export default function DoctorList() {
  return (
    <>
    <div className="w-full flex justify-between items-center px-[2vw] py-[1vw]  
      fixed top-0 z-50 backdrop-blur-md bg-black/90 shadow-xl/20 ">

      {/* Logo - Left */}
      <div className="logo flex-[1] font-extrabold text-[2vw] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
        <Link to="/">
          <img src={logodoxy} alt="Logo" className="w-auto h-[4vw]" />
        </Link>
      </div>


      {/* Button - Right */}
      <div className="flex-[1] flex justify-end text-[1.1vw]">
        <BookButton
          color="bg-gradient-to-r from-blue-600 to-sky-400"
          textColor="text-white"
          hover="hover:from-sky-400 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-300"
          
        />
      </div>
    </div>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-6 mt-20">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-12">
        Meet Our Doctors
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {doctors.map((doc, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition"
          >
            <div className="bg-blue-900 flex items-center justify-center p-6">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">
                {doc.name}
              </h2>
              <p className="text-lg text-gray-600 flex items-center mb-1">
                <Stethoscope className="h-5 w-5 text-blue-500 mr-2" />
                {doc.specialty}
              </p>
              <p className="text-gray-500 mb-4">{doc.qualification}</p>
              <div className="space-y-2 text-gray-600 text-sm">
                <p className="flex items-center">
                  <Mail className="h-4 w-4 text-blue-500 mr-2" /> {doc.email}
                </p>
                <p className="flex items-center">
                  <Phone className="h-4 w-4 text-blue-500 mr-2" /> {doc.phone}
                </p>
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 text-blue-500 mr-2" /> {doc.location}
                </p>
              </div>
              <div className="flex space-x-3 mt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md transition">
                  Book Appointment
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-blue-700 text-sm font-semibold px-4 py-2 rounded-lg shadow-md transition">
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}