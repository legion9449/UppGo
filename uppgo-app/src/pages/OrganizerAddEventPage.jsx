import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function OrganizerAddEventPage() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("location", location);
      formData.append("category", category);

      if (image) {
        formData.append("image", image);
      }

      await api.post("/events", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Event submitted for approval");

      navigate("/organizer");

    } catch (err) {

      console.log(err);
      alert("Error creating event");

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

          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-full border p-3 rounded-lg"
            rows="4"
            required
          />

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="date"
              value={date}
              onChange={(e)=>setDate(e.target.value)}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
              className="w-full border p-3 rounded-lg"
              required
            />

          </div>

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="file"
            onChange={(e)=>setImage(e.target.files[0])}
            className="w-full"
          />

          <button
            type="submit"
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