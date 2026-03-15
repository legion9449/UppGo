import { useEffect, useState } from "react";
import api from "../api";

function FeaturedCarousel() {

  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

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

  if (slides.length === 0) {
    return null;
  }

  return (

    <section className="relative h-[70vh] overflow-hidden">

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

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

        <h1 className="text-white text-5xl font-bold text-center px-6">
          {slides[index].title}
        </h1>

      </div>

    </section>

  );

}

export default FeaturedCarousel;