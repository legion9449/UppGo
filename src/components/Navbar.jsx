import { useState, useEffect } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-white text-2xl font-bold">UppGo</h1>

        <ul className="hidden md:flex space-x-8 text-white">
          <li className="hover:text-gray-300 cursor-pointer">Explore</li>
          <li className="hover:text-gray-300 cursor-pointer">Events</li>
          <li className="hover:text-gray-300 cursor-pointer">Stay</li>
          <li className="hover:text-gray-300 cursor-pointer">Contact</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;