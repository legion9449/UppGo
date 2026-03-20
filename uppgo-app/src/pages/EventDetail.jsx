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

  // 🔥 SMART DESCRIPTION PARSER
  const renderDescription = (text) => {

    if (!text) return null;

    const regex =
      /(https?:\/\/[^\s]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,})|(\+?\d[\d\s\-]{7,}\d)/g;

    return text.split(regex).map((part, index) => {

      // 🌐 URL
      if (part?.match(/^https?:\/\//)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {part}
          </a>
        );
      }

      // 📧 EMAIL
      if (part?.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/)) {
        return (
          <a
            key={index}
            href={`mailto:${part}`}
            className="text-green-600 underline"
          >
            {part}
          </a>
        );
      }

      // 📞 PHONE
      if (part?.match(/^\+?\d[\d\s\-]{7,}\d$/)) {
        return (
          <a
            key={index}
            href={`tel:${part.replace(/\s|-/g, "")}`}
            className="text-purple-600 underline"
          >
            {part}
          </a>
        );
      }

      return part;
    });

  };

  return (

    <div className="min-h-screen pt-32 px-6">

      <div className="max-w-4xl mx-auto">

        {/* IMAGE */}
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-96 object-cover rounded-2xl mb-8"
        />

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-4">
          {event.title}
        </h1>

        {/* DATE */}
        <p className="text-gray-600 mb-2">
          📅 {event.date}
        </p>

        {/* LOCATION */}
        <p className="text-gray-600 mb-6">
          📍 {event.location}
        </p>

        {/* ✅ FIXED DESCRIPTION */}
        <p className="text-gray-700 mb-8 whitespace-pre-line">
          {renderDescription(event.description)}
        </p>

        {/* MAP */}
        <EventMap
          latitude={Number(event.latitude)}
          longitude={Number(event.longitude)}
          title={event.title}
        />

        {/* BACK BUTTON */}
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