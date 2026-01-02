import { useMemo, useState } from "react";
import type { GenreOption } from "@/types/movie";
import FilterBar from "../components/FilterBar";
import { Link, useSearchParams } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import { useGetNowPlayingQuery } from "@/services/moviesApiSlice";
import MovieCard from "../components/MovieCard";
import Skeleton from "react-loading-skeleton";
const NowPlaying = () => {
  const [page, setPage] = useState(1);
  const { isFetching, data } = useGetNowPlayingQuery({ page });

  return (
    <div className="w-full flex flex-col justify-center items-center text-xl bg-[#0D0D0D] p-12">
      <h1 className="font-bold text-white text-4xl mb-5">Now Playing</h1>
      <div className="text-gray-300 w-[50%] text-base mb-10 font-semibold">
        The Now Playing page displays currently screening movies using real-time
        data from TMDB, featuring pagination, genre filtering, and responsive
        movie cards for an optimal browsing experience.
      </div>
      <div className="flex w-full gap-12">
        <div className="flex flex-wrap justify-start gap-16 w-full">
          {isFetching
            ? Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-[200px] flex flex-col gap-2">
                  <Skeleton height={280} borderRadius={16} />
                  <Skeleton width="80%" height={18} />
                  <Skeleton width="40%" height={14} />
                </div>
              ))
            : data?.movies.map((item) => (
                <Link key={item.id} to={`/movie/${item.id}`}>
                  <MovieCard
                    key={item.id}
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
        totalPages={data?.totalPages ?? 500}
      />
    </div>
  );
};

export default NowPlaying;
