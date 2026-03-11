import { useEffect, useState } from "react";
import api from "../api";

function AdminEvents() {

  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showReject, setShowReject] = useState(false);

  useEffect(() => {
    loadEvents();
  }, [page]);

  const loadEvents = async () => {

    try {

      const res = await api.get(`/admin/pending-events?page=${page}`);

      const data = res.data;

      // Ensure events is always an array
      if (Array.isArray(data)) {
        setEvents(data);
      } else if (data.data) {
        setEvents(data.data);
        setLastPage(data.last_page);
      } else {
        setEvents([]);
      }

    } catch (err) {

      console.log(err);
      setEvents([]);

    }

  };

  const approveEvent = async (id) => {

    try {

      await api.put(`/events/${id}/approve`);

      setSelectedEvent(null);

      loadEvents();

    } catch (err) {

      console.log(err);

    }

  };

  const rejectEvent = async (id) => {

    if (!rejectReason) {
      alert("Please enter rejection reason");
      return;
    }

    try {

      await api.put(`/events/${id}/reject`, {
        reason: rejectReason
      });

      setSelectedEvent(null);
      setRejectReason("");
      setShowReject(false);

      loadEvents();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="p-10">

      <h2 className="text-3xl font-bold mb-8">
        Pending Event Approvals
      </h2>

      {events.length === 0 && (
        <p>No pending events</p>
      )}

      {/* EVENTS GRID */}

      <div className="grid md:grid-cols-3 gap-6">

        {events.map((event)=>(
          <div
            key={event.id}
            onClick={()=>setSelectedEvent(event)}
            className="cursor-pointer border rounded-xl overflow-hidden shadow hover:shadow-lg"
          >

            {event.image && (
              <img
                src={`http://127.0.0.1:8000${event.image}`}
                className="w-full h-40 object-cover"
              />
            )}

            <div className="p-4">

              <h3 className="font-bold">
                {event.title}
              </h3>

              <p className="text-sm text-gray-500">
                {event.date}
              </p>

              <p className="text-sm text-gray-600">
                {event.location}
              </p>

            </div>

          </div>
        ))}

      </div>


      {/* PAGINATION */}

      <div className="flex justify-center gap-3 mt-10">

        <button
          disabled={page === 1}
          onClick={()=>setPage(page-1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          ◀ Previous
        </button>

        {Array.from({length:lastPage},(_,i)=>i+1).map((p)=>(
          <button
            key={p}
            onClick={()=>setPage(p)}
            className={`px-4 py-2 border rounded ${
              p===page ? "bg-black text-white":""
            }`}
          >
            {p}
          </button>
        ))}

        <button
          disabled={page === lastPage}
          onClick={()=>setPage(page+1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next ▶
        </button>

      </div>


      {/* EVENT MODAL */}

      {selectedEvent && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-white max-w-xl w-full p-8 rounded-xl max-h-[90vh] overflow-y-auto">

            <h2 className="text-2xl font-bold mb-4">
              {selectedEvent.title}
            </h2>

            {selectedEvent.image && (
              <img
                src={`http://127.0.0.1:8000${selectedEvent.image}`}
                className="w-full h-60 object-cover mb-4 rounded"
              />
            )}

            <p><b>Date:</b> {selectedEvent.date}</p>
            <p><b>Location:</b> {selectedEvent.location}</p>
            <p><b>Category:</b> {selectedEvent.category}</p>

            <p className="mt-4">
              {selectedEvent.description}
            </p>

            {!showReject && (

              <div className="flex justify-between mt-6">

                <div className="flex gap-4">

                  <button
                    onClick={()=>approveEvent(selectedEvent.id)}
                    className="bg-green-600 text-white px-5 py-2 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={()=>setShowReject(true)}
                    className="bg-red-600 text-white px-5 py-2 rounded"
                  >
                    Reject
                  </button>

                </div>

                <button
                  onClick={()=>setSelectedEvent(null)}
                  className="border px-5 py-2 rounded"
                >
                  Back
                </button>

              </div>

            )}

            {showReject && (

              <div className="mt-6">

                <textarea
                  placeholder="Enter rejection reason..."
                  value={rejectReason}
                  onChange={(e)=>setRejectReason(e.target.value)}
                  className="w-full border p-3 rounded mb-4"
                />

                <div className="flex justify-between">

                  <button
                    onClick={()=>rejectEvent(selectedEvent.id)}
                    className="bg-red-600 text-white px-5 py-2 rounded"
                  >
                    Confirm Reject
                  </button>

                  <button
                    onClick={()=>setShowReject(false)}
                    className="border px-5 py-2 rounded"
                  >
                    Back
                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );

}

export default AdminEvents;