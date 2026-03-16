import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { API_BASE } from "../config";

function AdminDashboard() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [tab, setTab] = useState("pending");
  const [selected, setSelected] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadEvents();
  }, [tab, page]);

  useEffect(() => {

    const filtered = events.filter((event) => {

      const text = search.toLowerCase();

      return (
        event.title?.toLowerCase().includes(text) ||
        event.location?.toLowerCase().includes(text) ||
        event.category?.toLowerCase().includes(text)
      );

    });

    setFilteredEvents(filtered);

  }, [search, events]);


  const loadEvents = async () => {

    let url = "";

    if (tab === "pending") url = `/admin/pending-events?page=${page}`;
    if (tab === "approved") url = `/admin/approved-events?page=${page}`;
    if (tab === "rejected") url = `/admin/rejected-events?page=${page}`;

    try {

      const res = await api.get(url);

      setEvents(res.data.data || []);
      setLastPage(res.data.last_page || 1);

    } catch (err) {

      console.log(err);
      setEvents([]);

    }

  };


  const toggleFeatured = async (id) => {

    try {

      await api.put(`/events/${id}/feature`);

      loadEvents();
      setSelected(null);

    } catch (err) {

      console.log(err);

    }

  };


  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Admin Event Moderation
      </h1>


      {/* SEARCH BAR */}

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="w-full border p-3 rounded mb-6"
      />


      {/* TABS */}

      <div className="flex gap-4 mb-8">

        <button
          onClick={()=>{setTab("pending"); setPage(1);}}
          className={`px-4 py-2 rounded ${
            tab==="pending" ? "bg-black text-white":"border"
          }`}
        >
          Pending
        </button>

        <button
          onClick={()=>{setTab("approved"); setPage(1);}}
          className={`px-4 py-2 rounded ${
            tab==="approved" ? "bg-black text-white":"border"
          }`}
        >
          Approved
        </button>

        <button
          onClick={()=>{setTab("rejected"); setPage(1);}}
          className={`px-4 py-2 rounded ${
            tab==="rejected" ? "bg-black text-white":"border"
          }`}
        >
          Rejected
        </button>

      </div>


      {/* EVENTS GRID */}

      <div className="grid md:grid-cols-3 gap-6">

        {filteredEvents.map((event)=>(
          <div
            key={event.id}
            onClick={()=>setSelected(event)}
            className="cursor-pointer border rounded-xl overflow-hidden shadow hover:shadow-lg"
          >

            {event.image && (

              <img
                src={event.image}
                className="w-full h-40 object-cover"
                alt={event.title}
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

        {Array.from({length: lastPage}, (_,i)=>i+1).map((p)=>(
          <button
            key={p}
            onClick={()=>setPage(p)}
            className={`px-4 py-2 border rounded ${
              p === page ? "bg-black text-white":""
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

      {selected && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white max-w-xl w-full p-8 rounded-xl max-h-[90vh] overflow-y-auto">

            <h2 className="text-2xl font-bold mb-4">
              {selected.title}
            </h2>

            {selected.image && (
              <img
                src={`${API_BASE}${selected.image}`}
                className="w-full h-60 object-cover mb-4 rounded"
                alt={selected.title}
              />
            )}

            <p><b>Date:</b> {selected.date}</p>
            <p><b>Location:</b> {selected.location}</p>
            <p><b>Category:</b> {selected.category}</p>

            <p className="mt-4">
              {selected.description}
            </p>


            {selected.status === "rejected" && (

              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">

                <b>Rejection Reason</b>

                <p className="text-red-700 mt-2">
                  {selected.rejection_reason}
                </p>

              </div>

            )}


            <div className="flex justify-between mt-8">

              {selected.status === "approved" && (

                <div className="flex gap-3">

                  <button
                    onClick={()=>navigate(`/admin/edit/${selected.id}`)}
                    className="bg-black text-white px-4 py-2 rounded"
                  >
                    Edit Event
                  </button>

                  <button
                    onClick={()=>toggleFeatured(selected.id)}
                    className={`px-4 py-2 rounded ${
                      selected.featured
                      ? "bg-yellow-500 text-white"
                      : "border"
                    }`}
                  >
                    {selected.featured
                      ? "Remove Featured"
                      : "Make Featured"}
                  </button>

                </div>

              )}

              <button
                onClick={()=>setSelected(null)}
                className="border px-5 py-2 rounded"
              >
                Back
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default AdminDashboard;