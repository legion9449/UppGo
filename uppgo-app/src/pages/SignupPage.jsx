import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function SignupPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    interests: []
  });

  const [error, setError] = useState("");

  const interestOptions = [
    "Music",
    "Sports",
    "Food",
    "Culture",
    "Nature"
  ];

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleCheckbox = (e) => {

    const value = e.target.value;

    if (form.interests.includes(value)) {

      setForm({
        ...form,
        interests: form.interests.filter(i => i !== value)
      });

    } else {

      setForm({
        ...form,
        interests: [...form.interests, value]
      });

    }

  };

  const validatePassword = (password) => {

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    return regex.test(password);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validatePassword(form.password)) {

      setError(
        "Password must contain uppercase, lowercase, number and special character"
      );

      return;

    }

    if (form.password !== form.confirmPassword) {

      setError("Passwords do not match");

      return;

    }

    if (form.interests.length === 0) {

      setError("Select at least one interest");

      return;

    }

    try {

      const res = await api.post("/signup", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/user-dashboard");

    } catch {

      setError("Signup failed");

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-24">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-[420px]"
      >

        <h2 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">
            {error}
          </div>
        )}

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded-lg mb-4"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded-lg mb-4"
          required
        />

        {/* Role Dropdown */}
        <div className="mb-4">

          <label className="block mb-2 font-semibold">
            Account Type
          </label>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          >

            <option value="user">User</option>
            <option value="organizer">Organizer</option>

          </select>

        </div>

        {/* Interests */}
        <div className="mb-4">

          <p className="font-semibold mb-2">
            Interested Type
          </p>

          {interestOptions.map((interest) => (

            <label key={interest} className="flex gap-2 mb-1">

              <input
                type="checkbox"
                value={interest}
                onChange={handleCheckbox}
              />

              {interest}

            </label>

          ))}

        </div>

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded-lg mb-4"
          required
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded-lg mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-full"
        >
          Sign Up
        </button>

      </form>

    </div>
  );

}

export default SignupPage;