import { Link } from "react-router-dom";
import logoFull from "../assets/logo-full.png";

function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <img
              src={logoFull}
              alt="UppGo"
              className="h-24 object-contain mb-6"
            />
            <p className="text-gray-400">
              Discover events, culture, food, and experiences
              in one of Sweden’s most beautiful cities.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/events" className="hover:text-white">
                  Events
                </Link>
              </li>
              <li className="hover:text-white cursor-pointer">Food & Drink</li>
              <li className="hover:text-white cursor-pointer">Nature</li>
              <li className="hover:text-white cursor-pointer">Stay</li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-gray-400">

              <li>
                <Link to="/about" className="hover:text-white">
                  About
                </Link>
              </li>

              <li>
                <a href="mailto:info@uppgo.com" className="hover:text-white">
                  Contact
                </a>
              </li>

              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">
              Uppsala, Sweden
            </p>
            <p className="text-gray-400 mb-2">
              info@uppgo.com
            </p>
            <p className="text-gray-400">
              +46 123 456 789
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} UppGo. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;