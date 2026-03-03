import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("allEvents")) || [];
    setEvents(stored);
  }, []);

  const deleteEvent = (id) => {
    const updated = events.filter(e => e.id !== id);
    localStorage.setItem("allEvents", JSON.stringify(updated));
    setEvents(updated);
  };

  const start = (page - 1) * itemsPerPage;
  const paginated = events.slice(start, start + itemsPerPage);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Manage Events
      </h1>

      <div className="space-y-4">
        {paginated.map(event => (
          <div key={event.id} className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.date}</p>
            </div>

            <div className="space-x-4">
              <Link
                to={`/admin/edit/${event.id}`}
                className="text-blue-600"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteEvent(event.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Prev
        </button>

        <button
          disabled={start + itemsPerPage >= events.length}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default AdminEvents;