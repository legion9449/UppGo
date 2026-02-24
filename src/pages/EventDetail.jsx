import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/events.json")
      .then((response) => response.json())
      .then((data) => {
        const foundEvent = data.find(
          (item) => item.id === Number(id)
        );
        setEvent(foundEvent);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading event:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <p className="text-gray-500">Loading event...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Event Not Found
        </h1>
        <button
          onClick={() => navigate("/events")}
          className="bg-black text-white px-6 py-3 rounded-full"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-40 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">

        <img
          src={event.image}
          alt={event.title}
          className="w-full h-96 object-cover rounded-2xl mb-8"
        />

        <h1 className="text-4xl font-bold mb-4">
          {event.title}
        </h1>

        <p className="text-lg text-gray-600 mb-2">
          📅 {event.date}
        </p>

        <p className="text-lg text-gray-600 mb-6">
          📍 {event.location}
        </p>

        <p className="text-gray-700 leading-relaxed">
          {event.description}
        </p>

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