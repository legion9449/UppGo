import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";

function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const username = localStorage.getItem("username") || "Admin";

  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  };

  const linkBase =
    "relative text-gray-300 hover:text-white transition duration-300 group";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isAdminPage
          ? "bg-black py-4 shadow-lg"
          : scrolled
          ? "bg-black/90 backdrop-blur-xl shadow-lg py-4"
          : "bg-black py-6"
      }`}
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
            <NavLink to="/" className={linkBase}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/events" className={linkBase}>
              Events
            </NavLink>
          </li>

          {/* USER MENU */}
          <li className="relative" ref={dropdownRef}>

            {!isAdmin ? (
              <NavLink to="/login" className={linkBase}>
                Login
              </NavLink>
            ) : (
              <div>

                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 text-white hover:text-gray-300 transition"
                >
                  <UserCircleIcon className="w-6 h-6" />

                  {username}

                  <span className="text-sm">▼</span>
                </button>

                {userMenu && (
                  <div className="absolute right-0 mt-3 w-44 bg-white text-black rounded-xl shadow-xl overflow-hidden">

                    <button
                      onClick={() => {
                        navigate("/admin");
                        setUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={() => {
                        handleLogout();
                        setUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>

                  </div>
                )}

              </div>
            )}

          </li>

        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-white mb-1"></span>
          <span className="w-6 h-0.5 bg-white mb-1"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center py-8 space-y-6 md:hidden">

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

          {!isAdmin ? (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-white"
            >
              Login
            </NavLink>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/admin");
                  setMenuOpen(false);
                }}
                className="text-white"
              >
                Dashboard
              </button>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-red-400"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;