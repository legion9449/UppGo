import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">

      <h1 className="text-6xl font-bold mb-6">404</h1>

      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-black text-white px-8 py-3 rounded-full hover:opacity-80 transition"
      >
        Go Back Home
      </button>

    </div>
  );
}

export default NotFound;