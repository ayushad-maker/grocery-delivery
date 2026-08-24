import Feature from "../components/Home/Feature";
import Hero from "../components/Home/Hero";
import HomeCategories from "../components/Home/HomeCategories";
import PopularProducts from "../components/Home/PopularProducts";


const Home = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Hero />
      <Feature />
      <HomeCategories />
      <PopularProducts />
    </div>
  );
};

export default Home;
