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
    role: "",
    interests: []
  });

  const [errors, setErrors] = useState({});
  const [showPasswordHint, setShowPasswordHint] = useState(false);

  const categories = ["Music", "Sports", "Food", "Culture", "Nature"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const handleCheckbox = (category) => {

    let updated = [...form.interests];

    if (updated.includes(category)) {
      updated = updated.filter((c) => c !== category);
    } else {
      updated.push(category);
    }

    setForm({
      ...form,
      interests: updated
    });

    setErrors({
      ...errors,
      interests: ""
    });
  };

  // 🔐 VALIDATION
  const validate = () => {

    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.role) newErrors.role = "Select account type";
    if (form.interests.length === 0) newErrors.interests = "Select at least one";

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(form.password)
    ) {
      newErrors.password = "Weak password";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {

      // ✅ SEND DATA (NO username)
      const res = await api.post("/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        interests: form.interests
      });

      const { user, token } = res.data;

      // 🔥 SAVE AUTH
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 🔥 UPDATE NAVBAR
      window.dispatchEvent(new Event("authChange"));

      // 🔥 ROLE REDIRECT
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "organizer") {
        navigate("/organizer");
      } else {
        navigate("/user");
      }

    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-24">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-lg border w-full max-w-md"
      >

        <h2 className="text-2xl font-bold text-center mb-4">
          Create Account
        </h2>

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className={`w-full p-3 rounded mb-2 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-black`}
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={`w-full p-3 rounded mb-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-black`}
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

        {/* ROLE */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className={`w-full p-3 rounded mb-2 border ${
            errors.role ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Account Type</option>
          <option value="user">User</option>
          <option value="organizer">Organizer</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm mb-2">{errors.role}</p>}

        {/* INTERESTS */}
        <div className="mb-3">
          <p className="font-medium mb-1">Interested Type</p>

          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={() => handleCheckbox(cat)}
                className="accent-black"
              />
              {cat}
            </label>
          ))}

          {errors.interests && (
            <p className="text-red-500 text-sm mt-1">{errors.interests}</p>
          )}
        </div>

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onFocus={() => setShowPasswordHint(true)}
          className={`w-full p-3 rounded mb-2 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          value={form.password}
          onChange={handleChange}
        />

        {showPasswordHint && (
          <p className="text-xs text-gray-500 mb-2">
            Must contain uppercase, lowercase, number & special character
          </p>
        )}

        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password}</p>
        )}

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className={`w-full p-3 rounded mb-2 border ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          }`}
          value={form.confirmPassword}
          onChange={handleChange}
        />

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-3">
            {errors.confirmPassword}
          </p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-full hover:opacity-90 transition"
        >
          Sign Up
        </button>

      </form>

    </div>
  );
}

export default SignupPage;