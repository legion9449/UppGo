import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    category: "Music",
    description: "",
    image: "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedEvents =
      JSON.parse(localStorage.getItem("adminEvents")) || [];

    const newEvent = {
      ...formData,
      id: Date.now(),
      coordinates: {
        lat: 59.8586,
        lng: 17.6369,
      },
    };

    const updatedEvents = [...savedEvents, newEvent];

    localStorage.setItem(
      "adminEvents",
      JSON.stringify(updatedEvents)
    );

    alert("Event Added Successfully!");

    navigate("/events");
  };

  return (
    <div className="min-h-screen pt-32 px-6 pb-24">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Admin Panel
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-2xl shadow-lg"
        >

          <input
            type="text"
            name="title"
            placeholder="Event Title"
            required
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            type="date"
            name="date"
            required
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            required
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <select
            name="category"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          >
            <option>Music</option>
            <option>Food</option>
            <option>Nature</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            required
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL (must be in /public/images)"
            required
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              onChange={handleChange}
            />
            Featured Event
          </label>

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-full hover:opacity-90 transition"
          >
            Add Event
          </button>

        </form>
      </div>
    </div>
  );
}

export default AdminPage;