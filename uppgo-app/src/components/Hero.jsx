import heroImage from "../assets/explore/background.jpg";

function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6">
          Discover Uppsala
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
          Explore events, culture, food, and experiences in one of Sweden’s most beautiful cities.
        </p>

        <button className="bg-white text-black px-10 py-4 rounded-full text-lg font-semibold hover:scale-105 hover:bg-gray-200 transition-all duration-300 shadow-lg">
          Explore More
        </button>
      </div>
    </section>
  );
}

export default Hero;