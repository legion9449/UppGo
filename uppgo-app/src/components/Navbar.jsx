import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");

    window.location.reload();

  };

  const getDashboardLink = () => {

    if (!user) return "/";

    if (user.role === "admin") return "/admin";

    if (user.role === "organizer") return "/organizer-dashboard";

    return "/user-dashboard";

  };

  const getDashboardLabel = () => {

    if (!user) return "";

    if (user.role === "admin") return "Admin Panel";

    if (user.role === "organizer") return "My Events";

    return "My Dashboard";

  };

  return (

    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <NavLink to="/" className="text-2xl font-bold">
          UppGo
        </NavLink>

        <div className="flex items-center gap-6">

          <NavLink to="/events">
            Events
          </NavLink>

          {!user && (
            <NavLink to="/login">
              Login
            </NavLink>
          )}

          {user && (

            <div className="relative" ref={dropdownRef}>

              <button
                onClick={() => setDropdown(!dropdown)}
                className="font-semibold"
              >
                {user.name}
              </button>

              {dropdown && (

                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg">

                  <button
                    onClick={() => {

                      navigate(getDashboardLink());

                      setDropdown(false);

                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {getDashboardLabel()}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          )}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;