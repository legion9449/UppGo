import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="pt-24 bg-white min-h-screen px-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-black">
            About UppGo
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover, explore, and connect with events happening around you.
          </p>
        </div>

        {/* CONTENT CARD */}
        <div className="bg-white shadow-xl rounded-2xl p-10 border border-gray-100 mb-12">

          <p className="text-gray-700 leading-relaxed mb-6">
            UppGo is an event discovery and ticket management platform designed to help users easily find, explore, and attend events. Our mission is to simplify how people connect with events happening around them.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Whether it is concerts, university activities, workshops, or community gatherings, UppGo provides a simple and modern platform where users can discover events and manage their participation.
          </p>

          {/* LIST */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-black">
              UppGo allows users to:
            </h2>

            <ul className="space-y-3 text-gray-700">
              <li>✔ Browse upcoming events</li>
              <li>✔ View event details</li>
              <li>✔ Register and manage event participation</li>
              <li>✔ Organize events through an easy-to-use system</li>
            </ul>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            The platform is built using modern web technologies to ensure a fast, reliable, and user-friendly experience. UppGo is currently developed as a university project focusing on learning modern web development, cloud deployment, and scalable system design.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Our goal is to continue improving the platform and add more features that help communities and organizations promote and manage events effectively.
          </p>

        </div>

        {/* CTA */}
        <div className="text-center mb-16">

          <Link
            to="/events"
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
          >
            Explore Events
          </Link>

        </div>

      </div>

    </div>
  );
}