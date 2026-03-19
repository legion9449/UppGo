import Explore from "../components/Explore";
import Events from "../components/Events";
import FeaturedCarousel from "../components/FeaturedCarousel";

function Home() {
  return (

    <div className="space-y-16">

      {/* FEATURED */}
      <section>
        <FeaturedCarousel />
      </section>

      {/* EXPLORE */}
      <section className="px-6">
        <Explore />
      </section>

      {/* EVENTS */}
      <section className="px-6 pb-10">
        <Events />
      </section>

    </div>

  );
}

export default Home;