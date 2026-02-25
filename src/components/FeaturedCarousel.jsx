import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function FeaturedCarousel() {
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => {
        const featured = data.filter((e) => e.featured);
        setEvents(featured);
      });
  }, []);

  // Auto slide
  useEffect(() => {
    if (events.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [events, current]);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === events.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? events.length - 1 : prev - 1
    );
  };

  // Swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  if (events.length === 0) return null;

  return (
    <section
      className="relative h-[650px] md:h-[750px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="min-w-full relative"
          >
            {/* Parallax Background */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-110 transition-transform duration-[6000ms]"
              style={{
                backgroundImage: `url(${event.image})`,
              }}
            ></div>

            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">

              {/* Branding */}
              <p className="uppercase tracking-widest text-sm mb-2 opacity-80">
                Discover Uppsala
              </p>

              {/* Featured Badge */}
              <span className="mb-4 bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">
                Featured Event
              </span>

              {/* Title */}
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                {event.title}
              </h2>

              {/* Info */}
              <p className="mb-6 text-lg">
                {event.location} • {event.date}
              </p>

              {/* CTA */}
              <Link
                to={`/events/${event.id}`}
                className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
              >
                View Event
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-4xl z-20"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-4xl z-20"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {events.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              index === current
                ? "bg-white"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedCarousel;