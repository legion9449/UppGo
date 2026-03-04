import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function CreateEventPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    category: "",
    eventType: "Non-Nations",
    description: "",
    image: "",
    featured: false,
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const geocodeAddress = async (address) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
    );

    const data = await response.json();

    if (data.length > 0) {
      return {
        latitude: data[0].lat,
        longitude: data[0].lon,
      };
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 Convert location to coordinates
      const coords = await geocodeAddress(form.location);

      if (coords) {
        form.latitude = coords.latitude;
        form.longitude = coords.longitude;
      } else {
        alert("Could not find location coordinates");
        return;
      }

      await api.post("/events", form);

      navigate("/admin/events");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="title" placeholder="Title" onChange={handleChange} required className="w-full p-2 border rounded" />

        <input name="date" type="date" onChange={handleChange} required className="w-full p-2 border rounded" />

        <input name="location" placeholder="Location (e.g. Uppsala Castle)" onChange={handleChange} required className="w-full p-2 border rounded" />

        <input name="category" placeholder="Category" onChange={handleChange} className="w-full p-2 border rounded" />

        <input name="image" placeholder="Image URL" onChange={handleChange} className="w-full p-2 border rounded" />

        <select name="eventType" onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Nations">Nations</option>
          <option value="Non-Nations">Non-Nations</option>
        </select>

        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded" />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" onChange={handleChange} />
          Featured Event
        </label>

        <button className="bg-black text-white px-4 py-2 rounded">
          Save Event
        </button>

      </form>
    </div>
  );
}

export default CreateEventPage;