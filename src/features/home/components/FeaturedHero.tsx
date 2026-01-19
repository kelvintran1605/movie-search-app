import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState } from "react";
import {
  FaArrowAltCircleRight as NextArrow,
  FaArrowAltCircleLeft as PrevArrow,
} from "react-icons/fa";
import type { MovieDetail } from "@/types/movie";
const FeaturedHero = ({ movies }: { movies: MovieDetail[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    setSelectedIndex((prev) => (prev - 1 < 0 ? 13 : prev - 1));
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    setSelectedIndex((prev) => (prev + 1 > 13 ? 0 : prev + 1));
  }, [emblaApi]);

  return (
    <div className="w-full p-12 flex gap-8 items-start">
      {/* Left Column */}
      <div className="text-slate-900 dark:text-white w-3/5">
        <div className="relative">
          <PrevArrow
            onClick={scrollPrev}
            className="absolute left-2 top-2/5 -translate-y-1/2 z-10 text-5xl cursor-pointer duration-150
            text-slate-900/70 hover:text-slate-900
            dark:text-white/70 dark:hover:text-white"
          />
          <NextArrow
            onClick={scrollNext}
            className="absolute right-2 top-2/5 -translate-y-1/2 z-10 text-5xl cursor-pointer duration-150
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

      {/* Right Column */}
      <div className="flex flex-col gap-2 items-center">
        <div className="font-semibold text-cyan-400 text-2xl mt-2">Up next</div>
        {Array.from({ length: 3 }).map((e) => (
          <div className="flex">
            <div className="w-10 h-20 bg-red-500"></div>
          </div>
        ))}
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
      className="relative hero shrink-0 flex items-end bg-base-200 h-140 w-full cursor-pointer hover:brightness-95 duration-150"
    >
      <div className="absolute bg-linear-to-t from-black via-black/20 to-transparent inset-0 w-full h-full"></div>
      <div className="hero-content flex-col lg:flex-row lg:items-end">
        <img src={url} className="w-45 rounded-lg shadow-2xl" />
        <div className="pb-2">
          <h1 className="text-4xl font-semibold">{name}</h1>
          <div className="text-gray-300 text-xl">Watch the Trailer</div>
          <div></div>
        </div>
      </div>
    </Link>
  );
};
export default FeaturedHero;
