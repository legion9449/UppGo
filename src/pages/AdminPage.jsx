import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents =
      JSON.parse(localStorage.getItem("allEvents")) || [];
    setEvents(storedEvents);
  }, []);

  const deleteEvent = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    const updatedEvents = events.filter(
      (event) => event.id !== id
    );

    localStorage.setItem(
      "allEvents",
      JSON.stringify(updatedEvents)
    );

    setEvents(updatedEvents);
  };

  // Dashboard Stats
  const totalEvents = events.length;
  const nationsCount = events.filter(
    (e) => e.eventType === "Nations"
  ).length;
  const nonNationsCount = events.filter(
    (e) => e.eventType === "Non-Nations"
  ).length;
  const featuredCount = events.filter(
    (e) => e.featured
  ).length;

  return (
    <div className="min-h-screen pt-32 px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">

        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <Link
            to="/admin/add"
            className="bg-black text-white px-6 py-3 rounded-full"
          >
            + Add Event
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm">
              Total Events
            </h3>
            <p className="text-3xl font-bold">
              {totalEvents}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm">
              Nations
            </h3>
            <p className="text-3xl font-bold">
              {nationsCount}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm">
              Non-Nations
            </h3>
            <p className="text-3xl font-bold">
              {nonNationsCount}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm">
              Featured
            </h3>
            <p className="text-3xl font-bold">
              {featuredCount}
            </p>
          </div>

        </div>

        {/* Events Table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-left">

            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Date</th>
                <th className="p-4">Type</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center text-gray-500"
                  >
                    No events found.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">
                      {event.title}
                    </td>

                    <td className="p-4">
                      {event.date}
                    </td>

                    <td className="p-4">
                      {event.eventType || "Non-Nations"}
                    </td>

                    <td className="p-4 space-x-4">

                      <Link
                        to={`/admin/edit/${event.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default AdminPage;