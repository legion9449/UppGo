import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadEvent = async () => {
    try {
      const response = await fetch("/events.json");
      const defaultEvents = await response.json();

      const adminEvents =
        JSON.parse(localStorage.getItem("adminEvents")) || [];

      const allEvents = [...defaultEvents, ...adminEvents];

      const foundEvent = allEvents.find(
        (item) => item.id === Number(id)
      );

      setEvent(foundEvent);
      setLoading(false);
    } catch (error) {
      console.error("Error loading event:", error);
      setLoading(false);
    }
  };

  loadEvent();
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

  // ✅ Custom Marker Icon (Stable CDN version)
  const customIcon = new L.Icon({
    iconUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="min-h-screen pt-32 px-6 pb-24">
      <div className="max-w-4xl mx-auto">

        {/* Image */}
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-96 object-cover rounded-2xl mb-8"
        />

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">
          {event.title}
        </h1>

        {/* Date */}
        <p className="text-lg text-gray-600 mb-2">
          📅 {event.date}
        </p>

        {/* Location */}
        <p className="text-lg text-gray-600 mb-6">
          📍 {event.location}
        </p>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-10">
          {event.description}
        </p>

        {/* 🗺 Leaflet Map */}
        {event.coordinates && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">
              Event Location
            </h2>

            <MapContainer
              center={[event.coordinates.lat, event.coordinates.lng]}
              zoom={15}
              className="h-96 w-full rounded-2xl shadow-lg"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[
                  event.coordinates.lat,
                  event.coordinates.lng,
                ]}
                icon={customIcon}
              >
                <Popup>{event.title}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-10 border border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition"
        >
          ← Back
        </button>

      </div>
    </div>
  );
}

export default EventDetail;