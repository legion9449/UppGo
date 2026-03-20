import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function OrganizerEditEventPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    category: "",
    eventType: "", // ✅ FIX (no forced default)
    description: "",
    image: null
  });

  const [currentImage, setCurrentImage] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {

    window.scrollTo(0, 0);

    api.get(`/events/${id}`)
      .then((res) => {

        const event = res.data;

        setForm({
          title: event.title || "",
          date: event.date || "",
          location: event.location || "",
          category: event.category || "",
          eventType: event.eventType || "", // ✅ FIX
          description: event.description || "",
          image: null
        });

        setCurrentImage(event.image);

      })
      .catch((err) => console.log(err));

  }, [id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    setForm({
      ...form,
      image: file
    });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // ✅ VALIDATION
    if (!form.eventType) {
      alert("Please select event type");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("date", form.date);
      formData.append("location", form.location);
      formData.append("category", form.category);
      formData.append("eventType", form.eventType); // ✅ FIXED
      formData.append("description", form.description);

      if (form.image) {
        formData.append("image", form.image);
      }

      await api.post(`/events/${id}?_method=PUT`, formData);

      alert("✅ Event updated");

      navigate("/organizer");

    } catch (err) {

      console.log(err);
      alert("❌ Update failed");

    }

  };

  return (

    <div className="min-h-screen pt-32 px-6 bg-gray-100">

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Edit Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* ✅ FIXED SELECT */}
          <select
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          >
            <option value="">Select Event Type</option>
            <option value="Nations">Nations</option>
            <option value="Non-Nations">Non-Nations</option>
          </select>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* CURRENT IMAGE */}
          {currentImage && !preview && (

            <div>

              <p className="mb-2 font-semibold">Current Image</p>

              <img
                src={currentImage}
                className="w-full h-60 object-cover rounded"
                alt="Current"
              />

            </div>

          )}

          {/* NEW PREVIEW */}
          {preview && (

            <div>

              <p className="mb-2 font-semibold">New Image Preview</p>

              <img
                src={preview}
                className="w-full h-60 object-cover rounded"
                alt="Preview"
              />

            </div>

          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded w-full hover:opacity-90"
          >
            Update Event
          </button>

        </form>

      </div>

    </div>

  );

}

export default OrganizerEditEventPage;