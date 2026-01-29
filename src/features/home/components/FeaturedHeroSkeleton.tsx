import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FeaturedHeroSkeleton = () => {
  return (
    <div
      className="w-full px-4 sm:px-6 lg:px-12 py-6 sm:py-8
      bg-white text-slate-900
      dark:bg-[#0D0D0D] dark:text-white
      flex flex-col lg:flex-row gap-6 lg:gap-8 items-start"
    >
      <div className="w-full lg:w-3/5">
        <div className="relative overflow-hidden">
          <div className="flex gap-4 mt-2">
            <FeaturedCard />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 items-center w-full lg:w-2/5">
        {/* Title skeleton */}
        <Skeleton
          height={30}
          containerClassName="w-full"
          className="rounded-md bg-slate-200 dark:bg-white/10 mt-3"
        />

        {/* List skeletons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6 lg:gap-8 w-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              height={150}
              containerClassName="w-full sm:w-1/2 lg:w-full"
              className="rounded-xl bg-slate-200 dark:bg-white/10"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const FeaturedCard = () => {
  return (
    <div className="w-full h-[420px] sm:h-[520px] lg:h-[592px]">
      <Skeleton className="w-full h-full rounded-2xl bg-slate-200 dark:bg-white/10" />
    </div>
  );
};

export default FeaturedHeroSkeleton;
