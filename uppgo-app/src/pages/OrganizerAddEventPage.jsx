import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function OrganizerAddEventPage() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    category: "",
    eventType: "Non-Nations",
    description: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  // IMAGE PREVIEW
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🌍 GEOLOCATION FUNCTION (AUTO LAT/LNG)
  const geocodeAddress = async (address) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`
      );

      const data = await res.json();

      if (data && data.length > 0) {
        return {
          latitude: data[0].lat,
          longitude: data[0].lon
        };
      }

      return null;

    } catch (err) {
      console.error("Geocode error:", err);
      return null;
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      let coords = await geocodeAddress(form.location);

      // 🔥 fallback (IMPORTANT)
      if (!coords) {
        alert("Location not found, using default (Uppsala)");
        coords = {
          latitude: 59.8586,
          longitude: 17.6389
        };
      }

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("date", form.date);
      formData.append("location", form.location);
      formData.append("category", form.category);
      formData.append("eventType", form.eventType);
      formData.append("description", form.description);

      // ✅ AUTO GEO DATA
      formData.append("latitude", coords.latitude);
      formData.append("longitude", coords.longitude);

      // ✅ USER LINK
      formData.append("user_id", user.id);

      // ✅ IMAGE
      if (image) {
        formData.append("image", image);
      }

      await api.post("/events", formData);

      alert("✅ Event submitted for approval");

      navigate("/organizer");

    } catch (err) {

      console.error(err);
      alert("❌ Error creating event");

    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-gray-100 pt-24 pb-20">

      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Create Event
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-5">

          {/* TITLE */}
          <input
            name="title"
            placeholder="Event Title"
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* DATE */}
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* LOCATION */}
          <input
            name="location"
            placeholder="Location (e.g. Uppsala Castle)"
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* CATEGORY */}
          <input
            name="category"
            placeholder="Category"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* EVENT TYPE */}
          <select
            name="eventType"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="Nations">Nations</option>
            <option value="Non-Nations">Non-Nations</option>
          </select>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* IMAGE */}
          <div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-full h-48 object-cover rounded"
              />
            )}

          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="bg-black text-white py-3 rounded-full hover:opacity-90"
          >
            {loading ? "Submitting..." : "Submit Event"}
          </button>

        </form>

      </div>

    </div>

  );
}

export default OrganizerAddEventPage;