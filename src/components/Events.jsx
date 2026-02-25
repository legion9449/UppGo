import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showUpcoming, setShowUpcoming] = useState(false);

  // ⭐ Favorites stored in localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
  Promise.all([
    fetch("/events.json").then((res) => res.json()),
  ]).then(([defaultEvents]) => {
    const adminEvents =
      JSON.parse(localStorage.getItem("adminEvents")) || [];

    setEvents([...defaultEvents, ...adminEvents]);
  });
}, []);

  const toggleFavorite = (eventId) => {
    let updatedFavorites;

    if (favorites.includes(eventId)) {
      updatedFavorites = favorites.filter((id) => id !== eventId);
    } else {
      updatedFavorites = [...favorites, eventId];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const today = new Date();

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    const matchesUpcoming =
      !showUpcoming || new Date(event.date) >= today;

    return matchesSearch && matchesCategory && matchesUpcoming;
  });

  return (
    <section className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-8 text-center">
          Upcoming Events
        </h2>

        {/* 🔎 Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-between">

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-3 rounded-lg border w-full md:w-1/3"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-lg border w-full md:w-1/4"
          >
            <option>All</option>
            <option>Music</option>
            <option>Food</option>
            <option>Nature</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showUpcoming}
              onChange={() => setShowUpcoming(!showUpcoming)}
            />
            Upcoming only
          </label>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Link key={event.id} to={`/events/${event.id}`}>
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">

                {/* Image */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover"
                />

                {/* ❤️ Favorite Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(event.id);
                  }}
                  className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-full"
                >
                  {favorites.includes(event.id) ? (
                    <HeartSolid className="w-7 h-7 text-red-500 hover:scale-110 transition-transform duration-200" />
                  ) : (
                    <HeartOutline className="w-7 h-7 text-white hover:text-red-400 hover:scale-110 transition-all duration-200" />
                  )}
                </button>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    {event.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    {event.date}
                  </p>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <p className="text-center mt-10 text-gray-500">
            No events found.
          </p>
        )}

      </div>
    </section>
  );
}

export default Events;