import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const linkBase =
    "relative text-gray-300 hover:text-white transition duration-300";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out
      ${visible ? "translate-y-0" : "-translate-y-full"}
      ${
        isHome && !scrolled
          ? "bg-transparent backdrop-blur-0 py-6"
          : "bg-black/80 backdrop-blur-lg shadow-xl py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 transition-all duration-500">

        {/* Logo */}
        <NavLink
          to="/"
          className={`text-white font-bold transition-all duration-500 ${
            scrolled ? "text-xl" : "text-2xl"
          }`}
        >
          UppGo
        </NavLink>

        {/* Menu */}
        <ul className="hidden md:flex space-x-10">

          {[
            { name: "Home", path: "/", end: true },
            { name: "Events", path: "/events", end: false },
            { name: "Stay", path: "/stay" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.end}
                className={linkBase}
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300
                      ${
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
      </div>
    </nav>
  );
}

export default Navbar;