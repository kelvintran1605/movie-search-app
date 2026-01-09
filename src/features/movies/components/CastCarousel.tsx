import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import {
  FaArrowAltCircleRight as NextArrow,
  FaArrowAltCircleLeft as PrevArrow,
} from "react-icons/fa";

const CastCarousel = ({
  cast,
}: {
  cast: { id: number; name: string; profileUrl: string; character: string }[];
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="group text-slate-900 dark:text-white">
      <div className="relative">
        <PrevArrow
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 text-4xl cursor-pointer duration-150
          group-hover:opacity-70 hover:opacity-90
          text-slate-900/70 hover:text-slate-900
          dark:text-white/70 dark:hover:text-white"
        />
        <NextArrow
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 text-4xl cursor-pointer duration-150
          group-hover:opacity-70 hover:opacity-90
          text-slate-900/70 hover:text-slate-900
          dark:text-white/70 dark:hover:text-white"
        />

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {cast.map((e) => (
              <div key={e.id} className="shrink-0 text-center">
                <img
                  src={e.profileUrl}
                  className="mx-auto h-40 w-40 rounded-full object-cover ring-1 ring-slate-200 dark:ring-white/10"
                  alt={e.name}
                />
                <div className="mt-4 font-bold">{e.name}</div>
                <div className="text-slate-500 text-md dark:text-white/60 truncate w-40">
                  {e.character}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastCarousel;
