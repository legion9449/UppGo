import { Link } from "react-router-dom";
import Events from "../components/Events";

function EventsPage() {

  return (
    <div className="pt-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Top Bar */}
        <div className="flex justify-end mb-8">

          <Link
            to="/events-map"
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
          >
            View Map
          </Link>

        </div>

        <Events />

      </div>

    </div>
  );

}

export default EventsPage;