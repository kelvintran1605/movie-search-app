import Hero from "@/features/home/components/Hero";
import { useGetTrendingMoviesQuery } from "@/services/moviesApiSlice";
import FeaturedHero from "../components/FeaturedHero";
import { useState } from "react";
import WatchListSection from "../components/WatchlistSection";

const Home = () => {
  const [toggleFeaturedOption, setToggleFeaturedOption] = useState<
    "day" | "week"
  >("day");
  const { data } = useGetTrendingMoviesQuery(toggleFeaturedOption);

  return (
    <div>
      <Hero />
      <div className="flex gap-4 items-center px-12">
        <h2 className="font-bold text-3xl text-[#60A5FA]">Featured</h2>

        {/* Toggle Button for Day/Week state */}
        <button className="flex items-center overflow-hidden justify-around rounded-xl border border-blue-400 mt-2 w-40 h-8 cursor-pointer">
          <div
            onClick={() => setToggleFeaturedOption("day")}
            className={`${toggleFeaturedOption === "day" && "bg-blue-400"} transition-all duration-250 rounded-xl flex-1 h-full flex items-center justify-center`}
          >
            Today
          </div>
          <div
            onClick={() => setToggleFeaturedOption("week")}
            className={`${toggleFeaturedOption === "week" && "bg-blue-400"} rounded-xl transition-all duration-250 flex-1 h-full flex items-center justify-center`}
          >
            This Week
          </div>
        </button>
      </div>
      <FeaturedHero movies={data ?? []} />
      <WatchListSection />
    </div>
  );
};

export default Home;
