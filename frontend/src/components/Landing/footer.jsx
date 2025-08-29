import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-gray-200 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">TeleHealth</h2>
          <p className="text-sm text-gray-300">
            Your trusted telemedicine partner. Connect with doctors anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/services" className="hover:text-white transition">Our Services</Link></li>
            <li><Link to="/doctors" className="hover:text-white transition">Doctors</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/help" className="hover:text-white transition">Help Center</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
            <li><Link to="/faqs" className="hover:text-white transition">FAQs</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:support@telehealth.com" className="hover:text-white transition">support@telehealth.com</a></li>
            <li>Phone: <a href="tel:+919876543210" className="hover:text-white transition">+91 98765 43210</a></li>
            <li>Location: <span className="hover:text-white transition">New Delhi, India</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} TeleHealth. All rights reserved.
      </div>
    </footer>
  );
}
