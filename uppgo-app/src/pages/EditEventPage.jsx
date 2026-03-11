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

  useEffect(() => {
  window.scrollTo(0,0);
},[]);

  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {

    // 🔹 force page to top
    window.scrollTo(0, 0);

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
        console.log(err);
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

      alert("Event updated successfully");

      navigate(-1);

    } catch (error) {

      console.log(error);
      alert("Update failed");

    }

  };

  return (

    <div className="min-h-screen pt-32 px-6 bg-gray-100">

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        <h2 className="text-3xl font-bold mb-8">
         Admin Edit Event
        </h2>

        <p className="text-gray-500 mb-6">
         Changes will update the live approved event.
       </p>

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
          >
            <option>Nations</option>
            <option>Non-Nations</option>
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

            <div>

              <p className="font-semibold mb-2">
                Current Image
              </p>

              <img
                src={`http://127.0.0.1:8000${currentImage}`}
                alt="Event"
                className="w-full h-60 object-cover rounded-lg"
              />

            </div>

          )}

          <div>

            <p className="font-semibold mb-2">
              Upload New Image
            </p>

            <input
              type="file"
              onChange={handleImageChange}
              className="w-full border p-3 rounded-lg"
            />

          </div>

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