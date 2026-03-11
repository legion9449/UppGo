import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function FeaturedCarousel() {

  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(0);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  useEffect(() => {

    api.get("/events?featured=1")
      .then((res) => {

        const eventsData = res.data.data || res.data;

        setEvents(eventsData);

      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  useEffect(() => {

    if (events.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);

  }, [events]);



  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + events.length) % events.length);
  };



  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {

    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) nextSlide();
    if (distance < -minSwipeDistance) prevSlide();
  };



  if (events.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden h-[650px] md:h-[750px]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >

      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >

        {events.map((event) => (

          <Link
            key={event.id}
            to={`/events/${event.id}`}
            className="min-w-full relative block"
          >

            <img
              src={`http://127.0.0.1:8000${event.image}`}
              alt={event.title}
              className="w-full h-[650px] md:h-[750px] object-cover"
            />

            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-6">

              <p className="uppercase tracking-widest text-sm mb-2 opacity-80">
                Discover Uppsala
              </p>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                {event.title}
              </h1>

              <p className="mb-6">
                {event.location}
              </p>

            </div>

          </Link>

        ))}

      </div>



      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">

        {events.map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white"
            }`}
          />

        ))}

      </div>

    </section>
  );
}

export default FeaturedCarousel;