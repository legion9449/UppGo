import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import EventMap from "../components/EventMap";

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!event) {
    return <p className="pt-32 text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">

        <img
          src={`http://127.0.0.1:8000${event.image}`}
          alt={event.title}
          className="w-full h-96 object-cover rounded-2xl mb-8"
        />

        <h1 className="text-4xl font-bold mb-4">
          {event.title}
        </h1>

        <p className="text-gray-600 mb-2">
          📅 {event.date}
        </p>

        <p className="text-gray-600 mb-6">
          📍 {event.location}
        </p>

        <p className="text-gray-700 mb-8">
          {event.description}
        </p>

        {/* ✅ MAP SECTION */}
        <EventMap
          latitude={Number(event.latitude)}
          longitude={Number(event.longitude)}
          title={event.title}
        />

        <button
          onClick={() => navigate(-1)}
          className="mt-8 border border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition"
        >
          ← Back
        </button>

      </div>
    </div>
  );
}

export default EventDetail;