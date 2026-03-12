import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }

    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };

  }, []);

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/");

    window.location.reload();

  };

  const goDashboard = () => {

    if (!user) return;

    if (user.role === "admin") {
      navigate("/admin");
    }
    else if (user.role === "organizer") {
      navigate("/organizer");
    }
    else {
      navigate("/user-dashboard");
    }

    setOpen(false);

  };

  return (

    <nav className="fixed top-0 w-full bg-black text-white z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        <Link to="/" className="text-2xl font-bold">
          UppGo
        </Link>

        <div className="flex items-center gap-6">

          <Link to="/events">
            Events
          </Link>

          {!user && (
            <Link to="/login">
              Login
            </Link>
          )}

          {user && (

            <div className="relative" ref={dropdownRef}>

              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 hover:opacity-80"
              >
                {user.name} ▼
              </button>

              {open && (

                <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden">

                  <button
                    onClick={goDashboard}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                  >

                    {user.role === "admin" && "Admin Dashboard"}

                    {user.role === "organizer" && "Organizer Dashboard"}

                    {user.role === "user" && "My Profile"}

                  </button>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
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