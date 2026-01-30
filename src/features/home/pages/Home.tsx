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
    <main aria-label="Home page" className="w-full">
      <Hero />

      <section aria-label="Featured section" className="w-full">
        {/* Header */}
        <div
          className="
            flex flex-col gap-3
            sm:flex-row sm:items-center sm:justify-between
            px-4 py-6
            sm:px-6
            lg:px-12
          "
        >
          <div className="flex items-center gap-3 flex-wrap">
            <h2
              id="featured-title"
              className="font-bold text-2xl sm:text-3xl text-[#60A5FA]"
            >
              Featured
            </h2>
          </div>

          {/* Toggle */}
          <div
            role="radiogroup"
            aria-labelledby="featured-title"
            aria-label="Trending time range"
            className="
              flex items-center overflow-hidden justify-around
              rounded-xl border border-blue-400
              w-full max-w-[220px]
              h-10 sm:h-9
            "
          >
            <button
              type="button"
              role="radio"
              aria-checked={toggleFeaturedOption === "day"}
              onClick={() => setToggleFeaturedOption("day")}
              className={`
                flex-1 h-full flex items-center justify-center font-bold
                cursor-pointer transition-all duration-200 rounded-xl
                text-sm sm:text-[15px]
                ${
                  toggleFeaturedOption === "day"
                    ? "bg-blue-400 text-black"
                    : "bg-transparent text-inherit"
                }
              `}
            >
              Today
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={toggleFeaturedOption === "week"}
              onClick={() => setToggleFeaturedOption("week")}
              className={`
                flex-1 h-full flex items-center justify-center
                cursor-pointer transition-all duration-200 rounded-xl
                text-sm sm:text-[15px] font-bold
                ${
                  toggleFeaturedOption === "week"
                    ? "bg-blue-400 text-black"
                    : "bg-transparent text-inherit"
                }
              `}
            >
              This Week
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-12">
          <DataStateWrapper
            isLoading={isLoading}
            isError={isError}
            skeleton={<FeaturedHeroSkeleton />}
          >
            <FeaturedHero movies={data ?? []} />
          </DataStateWrapper>
        </div>
      </section>

      <div className="px-4 sm:px-6 lg:px-12">
        <WatchListSection />
      </div>
    </main>
  );
};

export default Home;
