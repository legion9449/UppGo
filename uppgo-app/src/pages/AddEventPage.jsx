import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AddEventPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    category: "",
    eventType: "Non-Nations",
    description: "",
    featured: false,
    image: null
  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });

  };

  const handleImageChange = (e) => {

    setForm({
      ...form,
      image: e.target.files[0]
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("date", form.date);
      formData.append("location", form.location);
      formData.append("category", form.category);
      formData.append("eventType", form.eventType);
      formData.append("description", form.description);
      formData.append("featured", form.featured ? 1 : 0);

      if (form.image) {
        formData.append("image", form.image);
      }

      await api.post("/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Event created successfully");

      navigate("/admin/events");

    } catch (error) {

      console.error(error);
      alert("Error creating event");

    }

  };

  return (
    <div className="p-10 max-w-xl">

      <h2 className="text-3xl font-bold mb-6">
        Add Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event title"
          className="w-full border p-3"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-3"
          required
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-3"
          required
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-3"
        />

        <select
          name="eventType"
          value={form.eventType}
          onChange={handleChange}
          className="w-full border p-3"
        >
          <option>Nations</option>
          <option>Non-Nations</option>
        </select>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-3"
        />

        {/* Image Upload */}
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full border p-3"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured Event
        </label>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Create Event
        </button>

      </form>

    </div>
  );
}

export default AddEventPage;