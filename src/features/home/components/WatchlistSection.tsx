import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import MovieCard from "@/features/movies/components/MovieCard";
import { getYear } from "@/lib/tmdb.mapper";
import { useGetWatchlistQuery } from "@/services/watchlistApiSlice";
import type { WatchlistMovie } from "@/types/movie";
import { useEffect, useMemo, useState } from "react";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const WatchListSection = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [watchListMovies, setWatchListMovies] = useState<WatchlistMovie[]>([]);

  const { data } = useGetWatchlistQuery(undefined, {
    skip: !user,
  });

  useEffect(() => {
    setWatchListMovies(data ?? []);
  }, [data]);

  return (
    <section
      className={`${className ?? ""} px-4 sm:px-6 lg:px-12
      text-slate-900 dark:text-white`}
    >
      <div className="flex items-start sm:items-center justify-between gap-3">
        <h3
          onClick={() => navigate("/watchlist")}
          className="pl-2 text-xl sm:text-2xl font-bold border-l-4 border-yellow-500
          hover:text-slate-600 dark:hover:text-gray-300 duration-150 cursor-pointer"
        >
          From your Watchlist
        </h3>

        <button
          type="button"
          onClick={() => navigate("/watchlist")}
          className="shrink-0 flex items-center text-base sm:text-xl
          text-slate-700 hover:text-[#60A5FA]
          dark:text-slate-200 dark:hover:text-[#60A5FA]
          cursor-pointer duration-150"
        >
          <span className="hidden sm:inline">See all</span>
          <span className="sm:hidden">All</span>
          <MdKeyboardArrowRight className="text-2xl" />
        </button>
      </div>

      {!user ? (
        <WatchListGuest />
      ) : (
        <WatchlistUser watchList={watchListMovies} />
      )}
    </section>
  );
};

export default WatchListSection;

const WatchlistUser = ({ watchList }: { watchList: WatchlistMovie[] }) => {
  const displayList = useMemo(() => watchList.slice(0, 12), [watchList]);

  if (!displayList.length) {
    return (
      <div
        className="mt-8 rounded-xl border p-6 text-sm
        border-slate-200 bg-slate-50 text-slate-600
        dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
      >
        Your watchlist is empty.
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
      {displayList.slice(3).map((movie) => (
        <Link to={`/${movie.type}/${movie.movie_id}`}>
          <MovieCard
            key={`${movie.title}-${movie.created_at}`}
            name={movie.title}
            date={getYear(movie.created_at) || ""}
            rating={movie.rating}
            imgURL={movie.image_url}
          />
        </Link>
      ))}
    </div>
  );
};

const WatchListGuest = () => {
  const { openSignIn } = useUI();

  return (
    <div className="w-full mt-6 sm:mt-8 flex flex-col justify-center items-center gap-2 text-center px-2">
      <BsBookmarkPlusFill className="text-4xl sm:text-5xl text-slate-900 dark:text-white" />

      <div className="mt-1 font-bold text-base sm:text-md text-slate-900 dark:text-white">
        Sign in to view your Watchlist.
      </div>

      <div className="text-sm sm:text-base max-w-xl text-slate-600 dark:text-gray-200/90">
        Save movies and TV shows so you never lose track of what to watch next.
      </div>

      <button
        type="button"
        onClick={openSignIn}
        className="bg-[#60A5FA] px-4 py-2 rounded-xl mt-3 sm:mt-4 cursor-pointer hover:scale-105 duration-150 text-sm sm:text-base
        text-white"
      >
        Sign In to Movix
      </button>
    </div>
  );
};
