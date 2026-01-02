import type { TmdbMovieReview } from "@/types/movie";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import {
  FaArrowAltCircleRight as NextArrow,
  FaArrowAltCircleLeft as PrevArrow,
} from "react-icons/fa";
import { IoStar as StarIcon } from "react-icons/io5";

const ReviewCarousel = ({ reviews }: { reviews: TmdbMovieReview[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
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
            {reviews.length === 0 ? (
              <div className="text-xl">No review yet.</div>
            ) : (
              reviews.map((review, i) => (
                <div
                  key={i}
                  className="tracking-wider shrink-0 basis-90 h-50 bg-[#FFFFFF26] flex flex-col gap-4 p-3 px-5  border-2 border-transparent cursor-pointer hover:border-white duration-150"
                >
                  <div className="flex items-center gap-2">
                    <img
                      className="w-11 h-11 rounded-full object-cover"
                      src={review.profileUrl}
                    />
                    <div className="text-left">
                      <div className="text-md font-bold text-gray-200">
                        A review by {review.name || "Movix User"}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex gap-1 items-center px-2 bg-black/60 rounded-md">
                          <StarIcon /> {review.rating || "No Rating"}
                        </span>
                        {review.createdTime}
                      </div>
                    </div>
                  </div>
                  <div className="line-clamp-4">{review.content}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCarousel;
