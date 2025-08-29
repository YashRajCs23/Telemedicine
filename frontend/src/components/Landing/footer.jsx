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
            <li>
              <a 
                href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200545490" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="https://www.amazon.in/gp/help/customer/display.html?nodeId=GTPXEPY46C2PZ83M" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition"
              >
                Our Services
              </a>
            </li>
            <li>
              <a 
                href="https://www.amazon.in/b?node=976419031" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition"
              >
                Doctors (Health Products)
              </a>
            </li>
            <li>
              <a 
                href="https://www.amazon.in/gp/help/customer/display.html" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a 
                href="https://www.amazon.in/gp/help/customer/display.html" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition"
              >
                Help Center
              </a>
            </li>
            <li>
              <a 
                href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200545940" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a 
                href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200545930" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition"
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a 
                href="https://www.amazon.in/gp/help/customer/display.html?nodeId=202123010" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition"
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a 
                href="mailto:support@telehealth.com" 
                className="hover:text-white transition"
              >
                Email: support@telehealth.com
              </a>
            </li>
            <li>
              <a 
                href="tel:+919876543210" 
                className="hover:text-white transition"
              >
                Phone: +91 98765 43210
              </a>
            </li>
            <li>
              <a 
                href="https://www.amazon.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition"
              >
                Location: New Delhi, India
              </a>
            </li>
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
