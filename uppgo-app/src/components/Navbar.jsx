import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(); // ✅ NEW

  // ================= LOAD USER =================
  useEffect(() => {

    const loadUser = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    loadUser();

    window.addEventListener("authChange", loadUser);

    return () => {
      window.removeEventListener("authChange", loadUser);
    };

  }, []);

  // ================= CLOSE ON OUTSIDE CLICK =================
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // ================= DASHBOARD REDIRECT =================
  const goDashboard = () => {

    setOpen(false);

    if (!user) return;

    if (user.role === "admin") navigate("/admin");
    else if (user.role === "organizer") navigate("/organizer");
    else navigate("/user");
  };

  return (

    <nav className="fixed top-0 left-0 w-full bg-black text-white px-8 py-5 flex justify-between items-center z-50">

      <Link to="/" className="text-2xl font-bold">
        UppGo
      </Link>

      <div className="flex items-center gap-6">

        <Link to="/events">Events</Link>

        {!user ? (

          <Link to="/login">Login</Link>

        ) : (

          <div className="relative" ref={dropdownRef}>

            <button
              onClick={() => setOpen(!open)}
              className="font-semibold"
            >
              {user.name}
            </button>

            {open && (
              <div className="absolute right-0 mt-3 bg-white text-black rounded shadow w-48">

                <button
                  onClick={goDashboard}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
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

    </nav>
  );
}

export default Navbar;