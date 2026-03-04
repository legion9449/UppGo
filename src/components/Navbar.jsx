import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.reload();
  };

  const linkBase =
    "relative text-gray-300 hover:text-white transition duration-300 group";

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-xl shadow-lg py-4 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-white text-2xl font-bold tracking-wide"
        >
          UppGo
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 items-center">

          <li>
            <NavLink to="/" end className={linkBase}>
              {({ isActive }) => (
                <>
                  Home
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/events" className={linkBase}>
              {({ isActive }) => (
                <>
                  Events
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          </li>

          {/* Login / Logout */}
          <li>
            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-white transition"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login" className={linkBase}>
                Login
              </NavLink>
            )}
          </li>

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

          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-white"
          >
            Home
          </NavLink>

          <NavLink
            to="/events"
            onClick={() => setMenuOpen(false)}
            className="text-white"
          >
            Events
          </NavLink>

          {isAdmin ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-red-400"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-white"
            >
              Login
            </NavLink>
          )}

        </div>
      )}
    </nav>
  );
}

export default Navbar;