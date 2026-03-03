import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [eventTypeFilter, setEventTypeFilter] = useState("All");
  const [sortOption, setSortOption] = useState("newest");

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const storedEvents =
      JSON.parse(localStorage.getItem("allEvents")) || [];
    setEvents(storedEvents);
  }, []);

  // Unique categories
  const categories = [
    ...new Set(events.map((event) => event.category)),
  ];

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(
        selectedCategories.filter((c) => c !== cat)
      );
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearch("");
    setEventTypeFilter("All");
    setSortOption("newest");
  };

  // FILTERING
  let filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(event.category);

    const matchesType =
      eventTypeFilter === "All" ||
      (event.eventType || "Non-Nations") === eventTypeFilter;

    return matchesSearch && matchesCategory && matchesType;
  });

  // SORTING
  filteredEvents = filteredEvents.sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.date) - new Date(a.date);
    }

    if (sortOption === "oldest") {
      return new Date(a.date) - new Date(b.date);
    }

    if (sortOption === "az") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });

  return (
    <section className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Upcoming Events
          </h2>
          <p className="text-gray-600">
            Discover what's happening in Uppsala.
          </p>
        </div>

        {/* Search + Filters + Sorting */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          {/* Search */}
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border px-5 py-3 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Type Filter */}
          <select
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
            className="border px-5 py-3 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="All">All Types</option>
            <option value="Nations">Nations</option>
            <option value="Non-Nations">Non-Nations</option>
          </select>

          {/* Sorting */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border px-5 py-3 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">Title A–Z</option>
          </select>

        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat) => {
            const active = selectedCategories.includes(cat);

            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-5 py-2 rounded-full border transition-all duration-300 ${
                  active
                    ? "bg-black text-white border-black scale-105"
                    : "bg-white text-black border-gray-300 hover:bg-black hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}

          {(selectedCategories.length > 0 ||
            search ||
            eventTypeFilter !== "All") && (
            <button
              onClick={clearFilters}
              className="px-5 py-2 rounded-full border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Event Count */}
        <div className="mb-6 text-gray-500">
          {filteredEvents.length} event(s) found
        </div>

        {/* Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            No events found.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
              >

                <Link to={`/events/${event.id}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full text-sm font-semibold shadow">
                      {event.date}
                    </div>
                  </div>
                </Link>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {event.location}
                  </p>

                  <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                    {event.category}
                  </span>

                  {isAdmin && (
                    <div className="mt-4">
                      <Link
                        to={`/admin/edit/${event.id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Events;