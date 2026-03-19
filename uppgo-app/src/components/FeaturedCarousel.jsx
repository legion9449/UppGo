import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function FeaturedCarousel() {

  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {

    api.get("/events?featured=1")
      .then((res) => {
        const data = res.data.data || res.data;
        setSlides(data);
      })
      .catch((err) => console.log(err));

  }, []);

  useEffect(() => {

    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);

  }, [slides]);

  if (slides.length === 0) return null;

  const current = slides[index];

  return (

    <section
      className="relative h-[70vh] overflow-hidden cursor-pointer"
      onClick={() => navigate(`/events/${current.id}`)}
    >

      {/* IMAGES */}
      {slides.map((event, i) => (

        <img
          key={event.id}
          src={event.image}
          alt={event.title}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />

      ))}

      {/* OVERLAY */}
      {/* OVERLAY */}
<div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">

  <div className="text-white px-6 max-w-2xl">

    {/* TITLE */}
    <h1 className="text-3xl md:text-5xl font-bold mb-4">
      {current.title}
    </h1>

    {/* LOCATION */}
    <p className="text-lg mb-2">
      📍 {current.location || "Unknown location"}
    </p>

    {/* DATE */}
    <p className="text-md text-gray-300">
      📅 {current.date}
    </p>

    {/* CTA */}
    <p className="mt-4 text-sm text-gray-300">
      Click to view event →
    </p>

  </div>

</div>
    </section>

  );

}

export default FeaturedCarousel;