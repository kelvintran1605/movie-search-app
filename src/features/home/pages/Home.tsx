import Hero from "@/features/home/components/Hero";
import { useGetTrendingMoviesQuery } from "@/services/moviesApiSlice";
import FeaturedHero from "../components/FeaturedHero";

const Home = () => {
  const { data } = useGetTrendingMoviesQuery("day");

  // Get only 13 movies
  const trendingMovies = data?.slice(0, 14);
  console.log(trendingMovies);
  return (
    <div>
      <Hero />
      <FeaturedHero movies={data ?? []} />
    </div>
  );
};

export default Home;
