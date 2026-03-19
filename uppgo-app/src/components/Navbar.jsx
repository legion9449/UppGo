import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();
    window.addEventListener("authChange", loadUser);

    return () => window.removeEventListener("authChange", loadUser);

  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  return (

    <nav className="fixed top-0 w-full bg-black text-white z-50 shadow-md">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:opacity-80"
        >
          UppGo
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6 text-lg">

          {!user && (
            <Link
              to="/login"
              className="hover:text-gray-300 transition"
            >
              Login
            </Link>
          )}

          {user && (
            <div className="relative">

              <button
                onClick={() => setOpen(!open)}
                className="hover:text-gray-300 transition"
              >
                {user.name} ▼
              </button>

              {open && (

                <div className="absolute right-0 mt-3 w-52 bg-white text-black rounded-xl shadow-lg overflow-hidden">

                  {user.role === "admin" && (
                    <button
                      onClick={() => navigate("/admin")}
                      className="w-full text-left px-5 py-3 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </button>
                  )}

                  {user.role === "organizer" && (
                    <button
                      onClick={() => navigate("/organizer")}
                      className="w-full text-left px-5 py-3 hover:bg-gray-100"
                    >
                      Organizer Dashboard
                    </button>
                  )}

                  {user.role === "user" && (
                    <button
                      onClick={() => navigate("/user")}
                      className="w-full text-left px-5 py-3 hover:bg-gray-100"
                    >
                      User Dashboard
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-red-600 hover:bg-gray-100"
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