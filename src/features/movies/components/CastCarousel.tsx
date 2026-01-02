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
    slidesToScroll: 1 ,
  });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="text-white group">
      <div className="relative">
        <PrevArrow
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 text-4xl group-hover:opacity-70 cursor-pointer hover:opacity-90 duration-150"
        />
        <NextArrow
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 text-4xl group-hover:opacity-70 cursor-pointer hover:opacity-90 duration-150"
        />
        {/* viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {cast.map((e, i) => (
              <div key={i} className="shrink-0 text-center">
                <img
                  src={e.profileUrl}
                  className="mx-auto h-40 w-40 rounded-full object-cover"
                  alt="actor"
                />
                <div className="mt-4 font-bold">{e.name}</div>
                <div className="text-white/60 text-md">{e.character}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastCarousel;
