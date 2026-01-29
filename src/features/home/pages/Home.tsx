import Hero from "@/features/home/components/Hero";
import { useGetTrendingMoviesQuery } from "@/services/moviesApiSlice";
import FeaturedHero from "../components/FeaturedHero";
import { useState } from "react";
import WatchListSection from "../components/WatchlistSection";
import FeaturedHeroSkeleton from "../components/FeaturedHeroSkeleton";
import DataStateWrapper from "@/components/DataStateWrapper";
const Home = () => {
  const [toggleFeaturedOption, setToggleFeaturedOption] = useState<
    "day" | "week"
  >("day");
  const { data, isLoading, isError } =
    useGetTrendingMoviesQuery(toggleFeaturedOption);

  return (
    <main aria-label="Home page">
      <Hero />

      <section aria-label="Featured section">
        <div className="flex gap-4 items-center px-12">
          <h2 id="featured-title" className="font-bold text-3xl text-[#60A5FA]">
            Featured
          </h2>

          <div
            role="radiogroup"
            aria-labelledby="featured-title"
            aria-label="Trending time range"
            className="flex items-center overflow-hidden justify-around rounded-xl border border-blue-400 mt-2 w-40 h-8"
          >
            <button
              type="button"
              role="radio"
              aria-checked={toggleFeaturedOption === "day"}
              onClick={() => setToggleFeaturedOption("day")}
              className={`${
                toggleFeaturedOption === "day" && "bg-blue-400"
              } transition-all duration-250 rounded-xl flex-1 h-full flex items-center justify-center cursor-pointer`}
            >
              Today
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={toggleFeaturedOption === "week"}
              onClick={() => setToggleFeaturedOption("week")}
              className={`${
                toggleFeaturedOption === "week" && "bg-blue-400"
              } rounded-xl transition-all duration-250 flex-1 h-full flex items-center justify-center cursor-pointer`}
            >
              This Week
            </button>
          </div>
        </div>

        <DataStateWrapper
          isLoading={isLoading}
          isError={isError}
          skeleton={<FeaturedHeroSkeleton />}
        >
          <FeaturedHero movies={data ?? []} />
        </DataStateWrapper>
      </section>

      <WatchListSection />
    </main>
  );
};

export default Home;
