import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function EditEventPage() {

  const { id } = useParams();
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

  const [currentImage, setCurrentImage] = useState("");

  // Load event
  useEffect(() => {

    api.get(`/events/${id}`)
      .then((res) => {

        const event = res.data;

        setForm({
          title: event.title || "",
          date: event.date || "",
          location: event.location || "",
          category: event.category || "",
          eventType: event.eventType || "Non-Nations",
          description: event.description || "",
          featured: event.featured || false,
          image: null
        });

        setCurrentImage(event.image);

      })
      .catch((err) => {
        console.error(err);
      });

  }, [id]);



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

      await api.post(`/events/${id}?_method=PUT`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Event updated");

      navigate("/admin/events");

    } catch (error) {

      console.error(error);
      alert("Update failed");

    }

  };



  return (
    <div className="min-h-screen p-10">

      <h2 className="text-3xl font-bold mb-8">
        Edit Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
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

        {/* Current Image */}
        {currentImage && (
          <div>
            <p className="mb-2">Current Image</p>
            <img
              src={`http://127.0.0.1:8000${currentImage}`}
              alt="Event"
              className="w-full h-60 object-cover rounded mb-4"
            />
          </div>
        )}

        {/* Upload New Image */}
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full border p-3"
        />

        {/* Featured */}
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
          Update Event
        </button>

      </form>

    </div>
  );
}

export default EditEventPage;