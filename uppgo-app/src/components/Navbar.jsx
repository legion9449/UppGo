import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();

  // ✅ Load user initially
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    setUser(stored);
  }, []);

  // ✅ Listen for login/logout changes
  useEffect(() => {

    const updateUser = () => {
      const stored = JSON.parse(localStorage.getItem("user"));
      setUser(stored);
    };

    window.addEventListener("authChange", updateUser);

    return () => window.removeEventListener("authChange", updateUser);

  }, []);

  // ✅ Close dropdown when route changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.dispatchEvent(new Event("authChange"));

    navigate("/login");
  };

  return (

    <nav className="fixed top-0 w-full bg-black text-white z-50 shadow-lg">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold">
          UppGo
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">

          {!user ? (

            <Link to="/login" className="hover:underline">
              Login
            </Link>

          ) : (

            <div className="relative" ref={dropdownRef}>

              {/* USER BUTTON */}
              <button
                onClick={() => setOpen(!open)}
                className="font-semibold hover:underline"
              >
                {user.name}
              </button>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 mt-3 w-52 bg-white text-black rounded-xl shadow-lg overflow-hidden">

                  {/* ADMIN */}
                  {user.role === "admin" && (
                    <button
                      onClick={() => navigate("/admin")}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </button>
                  )}

                  {/* ORGANIZER */}
                  {user.role === "organizer" && (
                    <button
                      onClick={() => navigate("/organizer")}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      Organizer Dashboard
                    </button>
                  )}

                  {/* USER */}
                  {user.role === "user" && (
                    <button
                      onClick={() => navigate("/user-dashboard")}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      My Profile
                    </button>
                  )}

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-100"
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