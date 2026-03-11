import { useEffect, useState } from "react";
import api from "../api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

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

        <MapContainer
          center={[59.8586, 17.6389]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "600px", width: "100%" }}
          className="rounded-2xl shadow-lg"
        >

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
  );
}

export default EventsMapPage;