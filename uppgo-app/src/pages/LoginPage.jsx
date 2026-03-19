import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function LoginPage() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/login", {
        username,
        password
      });

      const { user, token } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      window.dispatchEvent(new Event("authChange"));

      // ✅ FIXED REDIRECT (ONLY CHANGE)
      if (user.role === "admin") navigate("/admin", { replace: true });
      else if (user.role === "organizer") navigate("/organizer", { replace: true });
      else navigate("/user", { replace: true }); // 🔥 FIX HERE

    } catch {
      setError("Invalid username or password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to your UppGo account
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
              error ? "border-red-400" : "focus:ring-black"
            }`}
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
              error ? "border-red-400" : "focus:ring-black"
            }`}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <div className="flex justify-between items-center text-sm">

            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>

          </div>

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>

      </div>

    </div>
  );
}

export default LoginPage;