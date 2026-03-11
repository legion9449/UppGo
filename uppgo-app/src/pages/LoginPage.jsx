import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function LoginPage() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await api.post("/login", {
        username,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      // redirect by role
      if (role === "admin") {
        navigate("/admin");
      }

      else if (role === "organizer") {
        navigate("/organizer-dashboard");
      }

      else {
        navigate("/user-dashboard");
      }

      // force navbar refresh
      window.location.reload();

    } catch {

      setError("Invalid username or password");

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-24">

      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-xl w-96"
      >

        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          className="w-full border px-4 py-3 rounded-lg mb-4"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border px-4 py-3 rounded-lg mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-full"
        >
          Login
        </button>

        <div className="flex justify-between mt-6 text-sm">

          <Link to="/signup" className="text-blue-600">
            Sign Up
          </Link>

          <Link to="/forgot-password" className="text-blue-600">
            Forgot Password
          </Link>

        </div>

      </form>

    </div>
  );
}

export default LoginPage;