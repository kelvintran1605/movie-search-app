import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import {
  FaArrowAltCircleRight as NextArrow,
  FaArrowAltCircleLeft as PrevArrow,
} from "react-icons/fa";
import type { MovieDetail } from "@/types/movie";

const FeaturedHero = ({ movies }: { movies: MovieDetail[] }) => {
  const getNextMovies = (selectedIndex: number) => {
    const nextMovies = [];
    for (let i = 1; i <= 3; i++) {
      nextMovies.push(movies[(selectedIndex + i) % movies.length]);
    }
    return nextMovies;
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    setSelectedIndex((prev) => (prev - 1 < 0 ? 16 : prev - 1));
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    setSelectedIndex((prev) => (prev + 1 > 16 ? 0 : prev + 1));
  }, [emblaApi]);

  return (
    <div
      className="w-full px-4 sm:px-6 lg:px-12 py-6 sm:py-8
      bg-white text-slate-900
      dark:bg-[#0D0D0D] dark:text-white
      flex flex-col lg:flex-row gap-6 lg:gap-8 items-start"
    >
      <div className="w-full lg:w-3/5">
        <div className="relative">
          <PrevArrow
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-4xl sm:text-5xl cursor-pointer duration-150
            text-slate-900/70 hover:text-slate-900
            dark:text-white/70 dark:hover:text-white"
          />
          <NextArrow
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-4xl sm:text-5xl cursor-pointer duration-150
            text-slate-900/70 hover:text-slate-900
            dark:text-white/70 dark:hover:text-white"
          />

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 mt-2">
              {movies.map((movie) => (
                <FeaturedCard
                  backdropUrl={movie.backdropUrl}
                  id={movie.id}
                  name={movie.title}
                  url={movie.imgUrl}
                  key={movie.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 items-center w-full lg:w-2/5">
        <div className="font-semibold text-[#60A5FA] text-xl sm:text-2xl mt-2 text-left w-full">
          Up next
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6 lg:gap-8 w-full">
          {getNextMovies(selectedIndex).map((e) => (
            <Link
              key={e?.id}
              to={`/movie/${e?.id}`}
              className="flex gap-3 items-center cursor-pointer w-full sm:w-1/2 lg:w-full
              rounded-xl p-2
              hover:bg-slate-100
              dark:hover:bg-white/5
              duration-150"
            >
              <img
                src={e?.imgUrl || ""}
                className="w-20 sm:w-23 rounded-xl h-28 sm:h-35 object-cover shrink-0"
              />
              <div className="flex flex-col gap-1 min-w-0">
                <div className="text-base sm:text-xl hover:text-blue-400 duration-150 truncate">
                  {e?.title}
                </div>
                <div className="text-slate-500 dark:text-gray-300 text-sm sm:text-base">
                  Watch the trailer
                </div>
                <div className="text-slate-700 dark:text-slate-200 text-sm sm:text-base">
                  {e?.year}
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 text-sm sm:text-base">
                  <AiOutlineLike /> {e?.rating.toFixed(1)}/10
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeaturedCard = ({
  name,
  url,
  id,
  backdropUrl,
}: {
  name: string;
  url: string;
  id: number;
  backdropUrl: string;
}) => {
  return (
    <Link
      to={`/movie/${id}`}
      style={{
        backgroundImage: `url(${backdropUrl})`,
      }}
      className="relative hero shrink-0 flex items-end bg-base-200
      h-[420px] sm:h-[520px] lg:h-148 w-full cursor-pointer hover:brightness-95 duration-150
      rounded-2xl overflow-hidden"
    >
      <div className="absolute bg-linear-to-t from-black via-black/20 to-transparent inset-0 w-full h-full"></div>

      <div className="hero-content flex-col lg:flex-row lg:items-end">
        <img src={url} className="w-28 sm:w-36 lg:w-45 rounded-lg shadow-2xl" />
        <div className="pb-2">
          <h1 className="text-2xl sm:text-4xl font-semibold text-white">
            {name}
          </h1>
          <div className="text-gray-200 text-base sm:text-xl">
            Watch the Trailer
          </div>
          <div></div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedHero;
