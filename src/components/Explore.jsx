function Explore() {
  const items = [
    {
      title: "Events",
      image:
        "https://visitsweden.com/_next/image/?url=https%3A%2F%2Fs3-eu-north-1.amazonaws.com%3A443%2Fpy3.visitsweden.com%2Foriginal_images%2FBrnnbollsyraniUme_CMSTemplate.jpg&w=1980&q=75",
    },
    {
      title: "Food & Drink",
      image:
        "https://visitsweden.com/_next/image/?url=https%3A%2F%2Fs3-eu-north-1.amazonaws.com%3A443%2Fpy3.visitsweden.com%2Foriginal_images%2Fweb_farmers20market_mat_kristin_Lagerqvist-310-CMSTemplate_BoYNUq8.jpg&w=1980&q=75",
    },
    {
      title: "Nature",
      image:
        "https://www.city-guide-stockholm.com/_bibli/pages_images/95/adobestock-242174221-uppsala.jpg",
    },
    {
      title: "Stay",
      image:
        "https://destinationuppsala.se/wp-content/uploads/2025/09/kapellskars-camping-press.webp",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Explore Uppsala</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover experiences, culture, food and nature in one of Sweden’s most beautiful cities.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Explore;