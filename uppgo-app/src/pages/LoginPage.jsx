import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function LoginPage() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", {
        username,
        password
      });

      const { user, token } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      window.dispatchEvent(new Event("authChange"));

      if (user.role === "admin") navigate("/admin");
      else if (user.role === "organizer") navigate("/organizer");
      else navigate("/user");

    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-3 mb-4 rounded"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-2 rounded"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <div className="text-right mb-4">
          <Link to="/forgot-password" className="text-blue-600 text-sm">
            Forgot Password?
          </Link>
        </div>

        <button className="w-full bg-black text-white py-3 rounded">
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign up
          </Link>
        </p>

      </form>
    </div>
  );
}

export default LoginPage;