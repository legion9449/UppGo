import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import EventMap from "../components/EventMap";

function EventDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api.get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!event) {
    return <p className="pt-32 text-center">Loading...</p>;
  }

  const url = window.location.href;

  // ================= COPY LINK (FIXED + AUTO CLOSE) =================
  const copyLink = async () => {

    try {

      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
        setShowShare(false); // ✅ auto close modal
      }, 1200);

    } catch {
      alert("Copy failed");
    }

  };

  // ================= SOCIAL =================
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(url)}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const twitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;

  // ================= SMART DESCRIPTION =================
  const renderDescription = (text) => {

    if (!text) return null;

    const regex =
      /(https?:\/\/[^\s]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,})|(\+?\d[\d\s\-]{7,}\d)/g;

    return text.split(regex).map((part, index) => {

      if (part?.match(/^https?:\/\//)) {
        return <a key={index} href={part} target="_blank" className="text-blue-600 underline">{part}</a>;
      }

      if (part?.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        return <a key={index} href={`mailto:${part}`} className="text-green-600 underline">{part}</a>;
      }

      if (part?.match(/^\+?\d[\d\s\-]{7,}\d$/)) {
        return <a key={index} href={`tel:${part.replace(/\s|-/g, "")}`} className="text-purple-600 underline">{part}</a>;
      }

      return part;
    });
  };

  return (

    <div className="min-h-screen pt-32 px-6">

      <div className="max-w-4xl mx-auto">

        {/* IMAGE */}
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-96 object-cover rounded-2xl mb-8"
        />

        {/* TITLE + SHARE */}
        <div className="flex justify-between items-center mb-4">

          <h1 className="text-4xl font-bold">
            {event.title}
          </h1>

          <button
            onClick={() => setShowShare(true)}
            className="bg-black text-white px-5 py-2 rounded-full hover:scale-105 transition"
          >
            Share
          </button>

        </div>

        <p className="text-gray-600 mb-2">📅 {event.date}</p>
        <p className="text-gray-600 mb-6">📍 {event.location}</p>

        <p className="text-gray-700 mb-8 whitespace-pre-line">
          {renderDescription(event.description)}
        </p>

        <EventMap
          latitude={Number(event.latitude)}
          longitude={Number(event.longitude)}
          title={event.title}
        />

        <button
          onClick={() => navigate(-1)}
          className="mt-8 border px-6 py-3 rounded-full hover:bg-black hover:text-white transition"
        >
          ← Back
        </button>

      </div>

      {/* ================= SHARE MODAL ================= */}
      {showShare && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[380px] rounded-2xl shadow-2xl p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Share Event</h2>
              <button
                onClick={() => setShowShare(false)}
                className="text-gray-500 hover:text-black text-xl"
              >
                ×
              </button>
            </div>

            {/* EVENT PREVIEW */}
            <div className="flex gap-3 mb-5">

              <img
                src={event.image}
                alt=""
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div>
                <p className="font-semibold text-sm">{event.title}</p>
                <p className="text-gray-500 text-xs">{event.date}</p>
                <p className="text-gray-400 text-xs">{event.location}</p>
              </div>

            </div>

            {/* COPY BOX */}
            <div className="flex mb-4">

              <input
                value={url}
                readOnly
                className="flex-1 border p-2 rounded-l-lg text-sm"
              />

              <button
                onClick={copyLink}
                className="bg-black text-white px-4 rounded-r-lg hover:opacity-90"
              >
                Copy
              </button>

            </div>

            {/* SOCIAL */}
            <div className="grid grid-cols-3 gap-3">

              <a href={whatsapp} target="_blank"
                className="flex flex-col items-center p-3 border rounded-xl hover:bg-gray-100 transition">
                <span className="text-xs mt-1">WhatsApp</span>
              </a>

              <a href={facebook} target="_blank"
                className="flex flex-col items-center p-3 border rounded-xl hover:bg-gray-100 transition">
                <span className="text-xs mt-1">Facebook</span>
              </a>

              <a href={twitter} target="_blank"
                className="flex flex-col items-center p-3 border rounded-xl hover:bg-gray-100 transition">
                <span className="text-xs mt-1">Twitter</span>
              </a>

            </div>

          </div>

        </div>
      )}

      {/* ================= COPY SUCCESS OVERLAY (FIXED) ================= */}
      {copied && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">

          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          <div className="relative bg-white px-8 py-6 rounded-2xl shadow-2xl flex flex-col items-center">

            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mb-3">
              <span className="text-white text-2xl">✓</span>
            </div>

            <p className="text-sm font-semibold text-gray-800">
              Link copied
            </p>

          </div>

        </div>
      )}

    </div>
  );
}

export default EventDetail;