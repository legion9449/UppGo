import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function AdminEvents() {

  const [events, setEvents] = useState([]);

  const loadEvents = () => {
    api.get("/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const deleteEvent = async (id) => {

    if (!confirm("Delete this event?")) return;

    try {

      await api.delete(`/events/${id}`);

      setEvents(events.filter((e) => e.id !== id));

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          Manage Events
        </h2>

        {/* Add Event Button */}
        <Link
          to="/admin/add"
          className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          + Add Event
        </Link>

      </div>

      {events.length === 0 && (
        <p>No events found</p>
      )}

      {/* Event Grid */}
      <div className="grid md:grid-cols-3 gap-6">

        {events.map((event) => (

          <div
            key={event.id}
            className="border rounded-xl overflow-hidden shadow bg-white"
          >

            {event.image && (
              <img
                src={`http://127.0.0.1:8000${event.image}`}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
            )}

            <div className="p-4">

              <h3 className="text-lg font-bold">
                {event.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {event.date}
              </p>

              <p className="text-gray-600 text-sm mb-4">
                {event.location}
              </p>

              <div className="flex gap-4">

                <Link
                  to={`/admin/edit/${event.id}`}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteEvent(event.id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminEvents;