import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import LocationPicker from "../components/LocationPicker";

function EditEventPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    category: "",
    eventType: "",
    description: "",
    featured: false,
    image: null
  });

  const [currentImage, setCurrentImage] = useState("");

  // 🔥 NEW COORD STATE
  const [coords, setCoords] = useState({
    latitude: null,
    longitude: null
  });

  // ================= LOAD EVENT =================
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
          eventType: event.eventType || "",
          description: event.description || "",
          featured: event.featured || false,
          image: null
        });

        setCurrentImage(event.image);

        // 🔥 LOAD EXISTING COORDS
        setCoords({
          latitude: event.latitude,
          longitude: event.longitude
        });

      })
      .catch((err) => console.log(err));

  }, [id]);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // ================= IMAGE =================
  const handleImageChange = (e) => {
    setForm({
      ...form,
      image: e.target.files[0]
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.eventType) {
      alert("Please select event type");
      return;
    }

    if (!coords.latitude || !coords.longitude) {
      alert("Please pick location on map");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("date", form.date);
      formData.append("location", form.location);
      formData.append("category", form.category);
      formData.append("eventType", form.eventType);
      formData.append("description", form.description);
      formData.append("featured", form.featured ? 1 : 0);

      // 🔥 FROM MAP (NO MORE BUGS)
      formData.append("latitude", coords.latitude);
      formData.append("longitude", coords.longitude);

      if (form.image) {
        formData.append("image", form.image);
      }

      await api.post(`/events/${id}?_method=PUT`, formData);

      alert("✅ Event updated successfully");

      navigate(-1);

    } catch (error) {
      console.log(error);
      alert("❌ Update failed");
    }

  };

  return (

    <div className="min-h-screen pt-32 px-6 bg-gray-100">

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        <h2 className="text-3xl font-bold mb-8">
          Admin Edit Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border p-3 rounded-lg"
            required
          />

          {/* 🔥 MAP PICKER */}
          <div>
            <p className="font-semibold mb-2">Pick Location on Map</p>

            <LocationPicker onSelect={(c) => setCoords(c)} />

            {coords.latitude && (
              <p className="text-sm text-gray-500 mt-2">
                {coords.latitude}, {coords.longitude}
              </p>
            )}
          </div>

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
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
            placeholder="Description"
            className="w-full border p-3 rounded-lg"
            rows="4"
          />

          {currentImage && (
            <img
              src={currentImage}
              className="w-full h-60 object-cover rounded-lg"
            />
          )}

          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border p-3 rounded-lg"
          />

          <div className="flex justify-between pt-4">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border rounded-lg"
            >
              Back
            </button>

            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg"
            >
              Update Event
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default EditEventPage;