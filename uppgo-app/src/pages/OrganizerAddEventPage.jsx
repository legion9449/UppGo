import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function OrganizerAddEventPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    category: "",
    eventType: "Non-Nations",
    description: "",
    image: null
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
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

      if (form.image) {
        formData.append("image", form.image);
      }

      await api.post("/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Event submitted for approval");

      navigate("/organizer-dashboard");

    } catch (err) {

      console.log(err);
      alert("Failed to submit event");

    }

  };

  return (

    <div className="min-h-screen pt-32 px-6 bg-gray-100">

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Submit New Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            placeholder="Event Title"
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            name="category"
            placeholder="Category"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <select
            name="eventType"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option>Nations</option>
            <option>Non-Nations</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded w-full"
          >
            Submit Event
          </button>

        </form>

      </div>

    </div>

  );

}

export default OrganizerAddEventPage;