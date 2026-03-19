import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute({ children, role }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkUser = () => {
      const stored = localStorage.getItem("user");

      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    checkUser();

    // 🔥 listen for login/logout
    window.addEventListener("authChange", checkUser);

    return () => window.removeEventListener("authChange", checkUser);

  }, []);

  // ⏳ wait before redirect
  if (loading) return null;

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ wrong role
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // ✅ allowed
  return children;
}

export default ProtectedRoute;