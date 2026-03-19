import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Events() {

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [eventTypeFilter, setEventTypeFilter] = useState("All");

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ================= FETCH EVENTS =================
  useEffect(() => {
    fetchEvents();
  }, [page, search, categoryFilter, eventTypeFilter]);

  const fetchEvents = async () => {

    setLoading(true);

    try {

      const res = await api.get("/events", {
        params: {
          page: page,
          search: search,
          category: categoryFilter,
          eventType: eventTypeFilter
        }
      });

      setEvents(res.data.data);
      setLastPage(res.data.last_page);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // ================= FILTER OPTIONS =================
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

  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-3">
            Upcoming Events
          </h2>

          <p className="text-gray-600 max-w-2xl">
            Discover events happening in Uppsala.
          </p>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="w-full border p-3 mb-6 rounded"
        />

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setPage(1);
                setCategoryFilter(cat);
              }}
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
            onChange={(e) => {
              setPage(1);
              setEventTypeFilter(e.target.value);
            }}
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
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500">
            No events found
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">

            {events.map((event) => (

              <Link
                to={`/events/${event.id}`}
                key={event.id}
                className="rounded-xl overflow-hidden shadow-lg group"
              >

                {event.image && (
                  <img
                    src={event.image}
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
        )}

        {/* ================= PAGINATION ================= */}

        <div className="flex justify-center gap-4 mt-10">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="flex items-center">
            Page {page} of {lastPage}
          </span>

          <button
            disabled={page === lastPage}
            onClick={() => setPage(page + 1)}
            className="px-5 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>

    </section>
  );

}

export default Events;