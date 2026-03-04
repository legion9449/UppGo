import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Events() {

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [eventTypeFilter, setEventTypeFilter] = useState("All");

  useEffect(() => {
    api.get("/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const categories = [
    "All",
    "Music",
    "Food",
    "Nature",
    "Sports",
    "Culture"
  ];

  const eventTypes = [
    "All",
    "Nations",
    "Non-Nations"
  ];

  const filteredEvents = events.filter((event) => {

    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      event.category === categoryFilter;

    const matchesType =
      eventTypeFilter === "All" ||
      (event.eventType || "Non-Nations") === eventTypeFilter;

    return matchesSearch && matchesCategory && matchesType;

  });

  return (
    <section className="pt-28 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold mb-8">
          Events in Uppsala
        </h2>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 mb-6 rounded"
        />

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap gap-3 mb-6">

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full border ${
                categoryFilter === cat
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              {cat}
            </button>
          ))}

        </div>

        {/* EVENT TYPE FILTER */}
        <div className="mb-10">

          <select
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
            className="border p-3 rounded"
          >
            {eventTypes.map((type) => (
              <option key={type}>
                {type}
              </option>
            ))}
          </select>

        </div>

        {/* EVENTS GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {filteredEvents.map((event) => (

            <Link
              to={`/events/${event.id}`}
              key={event.id}
              className="rounded-xl overflow-hidden shadow-lg group"
            >

              {event.image && (
                <img
                  src={`http://127.0.0.1:8000${event.image}`}
                  alt={event.title}
                  className="w-full h-60 object-cover group-hover:scale-105 transition"
                />
              )}

              <div className="p-4">

                <h3 className="text-xl font-bold mb-2">
                  {event.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  {event.date}
                </p>

                <p className="text-gray-600 text-sm">
                  {event.location}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Events;