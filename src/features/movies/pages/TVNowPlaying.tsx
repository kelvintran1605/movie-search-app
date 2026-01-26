import { useState } from "react";
import { Link } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import MovieCard from "../components/MovieCard";
import Skeleton from "react-loading-skeleton";
import { useGetNowPlayingTvQuery } from "@/services/tvApiSlice";

const TVNowPlaying = () => {
  const [page, setPage] = useState(1);
  const { isFetching, data } = useGetNowPlayingTvQuery({ page });

  return (
    <div className="w-full flex flex-col items-center text-xl px-4 py-8 sm:px-6 sm:py-10 lg:px-12 lg:py-12 bg-slate-50 text-slate-900 dark:bg-[#0D0D0D] dark:text-white">
      <h1 className="font-bold text-3xl sm:text-4xl mb-4 sm:mb-5">
        Now Playing TV
      </h1>

      <div className="w-full max-w-4xl text-base mb-8 sm:mb-10 font-semibold text-slate-600 dark:text-gray-300 text-center">
        The Now Playing page displays currently screening movies using real-time
        data from TMDB, featuring pagination, genre filtering, and responsive
        movie cards for an optimal browsing experience.
      </div>

      <div className="w-full">
        <div className="grid w-full gap-4 sm:gap-6 xl:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5">
          {isFetching
            ? Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-full flex flex-col gap-2">
                  <Skeleton height={280} borderRadius={16} />
                  <Skeleton width="80%" height={18} />
                  <Skeleton width="40%" height={14} />
                </div>
              ))
            : data?.tvs.map((item) => (
                <Link key={item.id} to={`/movie/${item.id}`} className="w-full">
                  <MovieCard
                    imgURL={item.imgUrl}
                    rating={item.rating}
                    name={item.title}
                    date={item.year}
                  />
                </Link>
              ))}
        </div>
      </div>

      <PaginationBar
        onPageChange={setPage}
        currentPage={page}
        totalPages={65}
      />
    </div>
  );
};

export default TVNowPlaying;
