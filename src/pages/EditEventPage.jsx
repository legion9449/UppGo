import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const events =
      JSON.parse(localStorage.getItem("allEvents")) || [];

    const eventToEdit = events.find(
      (event) => event.id === Number(id)
    );

    if (!eventToEdit) {
      navigate("/admin");
      return;
    }

    // Ensure eventType exists
    setFormData({
      ...eventToEdit,
      eventType: eventToEdit.eventType || "Non-Nations",
    });
  }, [id, navigate]);

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const events =
      JSON.parse(localStorage.getItem("allEvents")) || [];

    const updatedEvents = events.map((event) =>
      event.id === Number(id) ? formData : event
    );

    localStorage.setItem(
      "allEvents",
      JSON.stringify(updatedEvents)
    );

    navigate("/admin");
  };

  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-lg">

        <h2 className="text-3xl font-bold mb-8">
          Edit Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border px-4 py-3 rounded-lg"
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border px-4 py-3 rounded-lg"
          />

          {/* Category */}
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border px-4 py-3 rounded-lg"
          />

          {/* Event Type Dropdown */}
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          >
            <option value="Nations">Nations</option>
            <option value="Non-Nations">Non-Nations</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border px-4 py-3 rounded-lg"
          />

          {/* Image */}
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border px-4 py-3 rounded-lg"
          />

          {/* Featured Toggle */}
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured || false}
              onChange={handleChange}
            />
            Featured Event
          </label>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full"
          >
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditEventPage;