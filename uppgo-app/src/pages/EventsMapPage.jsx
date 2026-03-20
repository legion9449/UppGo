import { useEffect, useState } from "react";
import api from "../api";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ FIX MARKER ICON (VERY IMPORTANT)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// ✅ FIX MAP SIZE BUG
function FixMapSize() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);

  return null;
}

function EventsMapPage() {

  const [events, setEvents] = useState([]);

  useEffect(() => {

    api.get("/events")
      .then((res) => {
        const allEvents = res.data.data || res.data;
        setEvents(allEvents);
      })
      .catch((err) => console.error(err));

  }, []);

  return (
    <div className="pt-28 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Events Map
        </h1>

        {/* ✅ FIXED CONTAINER */}
        <div className="relative z-0 w-full h-[600px] rounded-2xl overflow-hidden shadow-lg">

          <MapContainer
            center={[59.8586, 17.6389]}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full"
          >

            <FixMapSize />

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {events.map((event) => {

              if (!event.latitude || !event.longitude) return null;

              return (
                <Marker
                  key={event.id}
                  position={[
                    Number(event.latitude),
                    Number(event.longitude)
                  ]}
                >
                  <Popup>

                    <div>

                      <h3 className="font-bold mb-1">
                        {event.title}
                      </h3>

                      <p className="text-sm text-gray-600">
                        {event.date}
                      </p>

                      <Link
                        to={`/events/${event.id}`}
                        className="text-blue-600 text-sm"
                      >
                        View Event
                      </Link>

                    </div>

                  </Popup>
                </Marker>
              );
            })}

          </MapContainer>

        </div>

      </div>

    </div>
  );
}

export default EventsMapPage;