import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function OrganizerDashboard() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [tab, setTab] = useState("pending");
  const [selected, setSelected] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    if (!user) return;

    loadEvents();

  }, [tab, page]);

  const loadEvents = async () => {

    try {

      const res = await api.get(
        `/organizer/events/${user.id}?status=${tab}&page=${page}`
      );

      setEvents(res.data.data || []);
      setLastPage(res.data.last_page || 1);

    } catch (err) {

      console.log(err);
      setEvents([]);

    }

  };

  return (

    <div className="pt-32 px-8 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        Organizer Event Management
      </h1>

      <div className="mb-8">

        <button
          onClick={()=>navigate("/organizer/add")}
          className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-80"
        >
          + Add Event
        </button>

      </div>

      <div className="flex gap-4 mb-10">

        <button
          onClick={()=>{setTab("pending"); setPage(1);}}
          className={`px-5 py-2 rounded ${
            tab==="pending" ? "bg-black text-white":"border"
          }`}
        >
          Pending
        </button>

        <button
          onClick={()=>{setTab("approved"); setPage(1);}}
          className={`px-5 py-2 rounded ${
            tab==="approved" ? "bg-black text-white":"border"
          }`}
        >
          Approved
        </button>

        <button
          onClick={()=>{setTab("rejected"); setPage(1);}}
          className={`px-5 py-2 rounded ${
            tab==="rejected" ? "bg-black text-white":"border"
          }`}
        >
          Rejected
        </button>

      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {events.map((event)=>(

          <div
            key={event.id}
            onClick={()=>setSelected(event)}
            className="cursor-pointer border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >

            {event.image && (

              <img
                src={`http://127.0.0.1:8000${event.image}`}
                className="w-full h-36 object-cover"
              />

            )}

            <div className="p-4">

              <h3 className="font-bold text-lg">
                {event.title}
              </h3>

              <p className="text-sm text-gray-500">
                {event.date}
              </p>

            </div>

          </div>

        ))}

      </div>

      <div className="flex justify-center gap-4 mt-12">

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

      {selected && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white max-w-xl w-full p-8 rounded-xl max-h-[90vh] overflow-y-auto">

            <h2 className="text-2xl font-bold mb-4">
              {selected.title}
            </h2>

            {selected.image && (

              <img
                src={`http://127.0.0.1:8000${selected.image}`}
                className="w-full h-60 object-cover mb-4 rounded"
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

            {selected.status === "pending" && (

              <button
                onClick={()=>navigate(`/organizer/edit/${selected.id}`)}
                className="bg-black text-white px-4 py-2 rounded mt-6"
              >
                Edit Event
              </button>

            )}

            <div className="flex justify-end mt-6">

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

export default OrganizerDashboard;