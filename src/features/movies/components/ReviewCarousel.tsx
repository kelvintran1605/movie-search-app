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
            {reviews.length === 0 ? (
              <div className="text-xl text-slate-600 dark:text-white/70">
                No review yet.
              </div>
            ) : (
              reviews.map((review, i) => (
                <div
                  key={i}
                  className="tracking-wider shrink-0 basis-90 h-50 flex flex-col gap-4 p-3 px-5 cursor-pointer duration-150 rounded-xl
                  bg-slate-100 border border-slate-200 hover:border-slate-300
                  dark:bg-white/15 dark:border-transparent dark:hover:border-white/70"
                >
                  <div className="flex items-center gap-2">
                    <img
                      className="w-11 h-11 rounded-full object-cover ring-1 ring-slate-200 dark:ring-white/10"
                      src={review.profileUrl}
                      alt={review.name || "User avatar"}
                    />
                    <div className="text-left">
                      <div className="text-md font-bold text-slate-900 w-full dark:text-gray-200 line-clamp-1">
                        A review by {review.name || "Movix User"}
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 dark:text-white/70">
                        <span
                          className="flex gap-1 items-center px-2 rounded-md
                        bg-slate-900/10 text-slate-900
                        dark:bg-black/60 dark:text-white"
                        >
                          <StarIcon />
                          {review.rating || (
                            <span className="text-sm">No Rating</span>
                          )}
                        </span>
                        <span>{review.createdTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="line-clamp-4 text-slate-700 dark:text-white/80">
                    {review.content}
                  </div>
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
