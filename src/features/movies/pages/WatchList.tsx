import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import { useGetWatchlistQuery } from "@/services/watchlistApiSlice";
import { IoMdArrowDropdown as DropdownIcon } from "react-icons/io";
import { useEffect, useMemo, useRef, useState } from "react";

const WatchList = () => {
  const { data: movies = [] } = useGetWatchlistQuery();

  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [sortByValue, setSortByValue] = useState<string>("date.asc");
  const ref = useRef<HTMLDivElement>(null);

  const sortByOptions = [
    { name: "Date added (Newest → Oldest)", value: "date.desc" },
    { name: "Date added (Oldest → Newest)", value: "date.asc" },
    { name: "Title (A → Z)", value: "title.asc" },
    { name: "Title (Z → A)", value: "title.desc" },
  ];

  const sortByLabel =
    sortByOptions.find((o) => o.value === sortByValue)?.name ?? "Sort by";

  const sortedMovies = useMemo(() => {
    const arr = [...movies];

    switch (sortByValue) {
      case "date.asc":
        return arr.sort(
          (a, b) =>
            new Date(a.created_at ?? "").getTime() -
            new Date(b.created_at ?? "").getTime()
        );
      case "date.desc":
        return arr.sort(
          (a, b) =>
            new Date(b.created_at ?? "").getTime() -
            new Date(a.created_at ?? "").getTime()
        );
      case "title.asc":
        return arr.sort((a, b) =>
          a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
        );
      case "title.desc":
        return arr.sort((a, b) =>
          b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
        );
      default:
        return arr;
    }
  }, [movies, sortByValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) setIsSortByOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full h-full p-12 flex flex-col justify-center gap-6 text-slate-900 dark:text-white">
      <h1 className="font-bold text-2xl">My Watchlist</h1>

      <div className="text-slate-600 dark:text-white/70">
        {sortedMovies.length} Movies saved
      </div>

      <div
        ref={ref}
        onClick={() => setIsSortByOpen((prev) => !prev)}
        className="group w-fit text-center px-3 py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer relative select-none
  bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200 hover:border-slate-300
  dark:bg-white/10 dark:text-white dark:border-white/10 dark:hover:bg-white/15"
      >
        <span>{sortByLabel}</span>
        <DropdownIcon className="text-md opacity-80" />

        <div
          className={`${
            isSortByOpen ? "flex" : "hidden"
          } absolute w-64 left-0 top-14 z-10 rounded-2xl font-medium flex-col overflow-hidden
    bg-slate-50 border border-slate-200 shadow-xl
    dark:bg-[#0D0D0D] dark:border-white/10 dark:shadow-none`}
          onClick={(e) => e.stopPropagation()}
        >
          {sortByOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                setSortByValue(option.value);
                setIsSortByOpen(false);
              }}
              className="text-start py-2.5 px-4 duration-150
        text-slate-800 hover:bg-slate-200/70
        dark:text-white dark:hover:bg-white/10"
            >
              {option.name}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center flex-wrap justify-start gap-8">
        {sortedMovies.map((movie) => (
          <Link key={movie.movie_id} to={`/${movie.type}/${movie.movie_id}`}>
            <MovieCard
              name={movie.title}
              date={movie.release_date}
              rating={movie.rating}
              imgURL={movie.image_url}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
