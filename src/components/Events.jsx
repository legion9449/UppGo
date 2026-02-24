function Events() {
  const events = [
    {
      title: "Uppsala Music Festival",
      date: "May 18, 2026",
      location: "Uppsala Castle",
      image:
        "https://gratisuppsala.se/wp-content/uploads/2024/09/pexels-vishnurnair-1105666-1-scaled.jpg",
    },
    {
      title: "Spring Food Market",
      date: "June 2, 2026",
      location: "Stora Torget",
      image:
        "https://gratisuppsala.se/wp-content/uploads/2024/08/sam-kimber-cOVNILtRceQ-unsplash.jpg",
    },
    {
      title: "River Walk & Nature Tour",
      date: "June 10, 2026",
      location: "Fyrisån",
      image:
        "https://destinationuppsala.se/wp-content/uploads/2019/05/dragontorpet-05574-6-1200x630.jpg",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12 flex-col md:flex-row gap-6">
          <div>
            <h2 className="text-4xl font-bold mb-3">
              Upcoming Events
            </h2>
            <p className="text-gray-600">
              Don’t miss the latest happenings around the city.
            </p>
          </div>

          <button className="border border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition">
            View All Events
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full text-sm font-semibold shadow">
                  {event.date}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600">
                  {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Events;