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
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "date.desc":
        return arr.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
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
    <div className="w-full h-full p-12 text-white flex flex-col justify-center gap-6">
      <h1 className="text-white font-bold text-2xl">My Watchlist</h1>

      <div>{sortedMovies.length} Movies saved</div>

      <div
        ref={ref}
        onClick={() => setIsSortByOpen((prev) => !prev)}
        className="bg-white group text-black w-fit text-center p-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-300
        cursor-pointer duration-450 relative"
      >
        <span>{sortByLabel}</span>
        <DropdownIcon className="text-md" />

        <div
          className={`${
            isSortByOpen ? "flex" : "hidden"
          } duration-450 absolute w-60 bg-white left-0 top-14 z-10 rounded-xl font-medium flex-col overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {sortByOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                setSortByValue(option.value);
                setIsSortByOpen(false);
              }}
              className="text-start hover:bg-[#60A5FA]/40 duration-150 py-2 px-4"
            >
              {option.name}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center flex-wrap justify-start gap-8">
        {sortedMovies.map((movie) => (
          <Link key={movie.movie_id} to={`/movie/${movie.movie_id}`}>
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
