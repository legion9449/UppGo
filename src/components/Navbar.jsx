import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const location = useLocation();
  const isHome = location.pathname === "/";

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (currentScrollY / totalHeight) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logo load animation (separate hook!)
  useEffect(() => {
    setLoaded(true);
  }, []);

  const linkBase =
    "relative text-gray-300 hover:text-white transition duration-300 group";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out
      ${
        isHome && !scrolled
          ? "bg-transparent backdrop-blur-0 py-8"
          : "bg-gradient-to-r from-black/90 via-black/80 to-black/90 backdrop-blur-xl py-4 shadow-xl border-b border-white/10"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[3px] bg-white transition-all duration-200"
        style={{ width: `${progress}%` }}
      />

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">

        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={logoIcon}
            alt="UppGo"
            className={`transition-all duration-700 ease-out transform object-contain
              ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }
              ${scrolled ? "h-10 scale-95" : "h-14 scale-100"}
            `}
          />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10">
          {[
            { name: "Home", path: "/", end: true },
            { name: "Events", path: "/events", end: false },
            { name: "Stay", path: "/stay" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <li key={item.name}>
              <NavLink to={item.path} end={item.end} className={linkBase}>
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                        isActive
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl flex flex-col items-center py-8 space-y-6 md:hidden">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/events" onClick={() => setMenuOpen(false)}>Events</NavLink>
          <NavLink to="/stay" onClick={() => setMenuOpen(false)}>Stay</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;