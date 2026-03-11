import { useState } from "react";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    alert("Password reset link sent (demo)");

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-24">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-96"
      >

        <h2 className="text-3xl font-bold mb-6 text-center">
          Reset Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-3 rounded-lg mb-6"
        />

        <button
          className="w-full bg-black text-white py-3 rounded-full"
        >
          Send Reset Link
        </button>

      </form>

    </div>
  );
}

export default ForgotPassword;