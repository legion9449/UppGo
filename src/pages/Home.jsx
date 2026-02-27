import Hero from "../components/Hero";
import Explore from "../components/Explore";
import Events from "../components/Events";
import FeaturedCarousel from "../components/FeaturedCarousel";

function Home() {
  return (
    <>
    
      {/*<Hero />*/}
      <FeaturedCarousel />
      <Explore />
      <Events />
    </>
  );
}

export default Home;