import { useGetPopularQuery } from "@/services/moviesApiSlice";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";
import PaginationBar from "../components/PaginationBar";
import { useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSearchParams, Link } from "react-router-dom";
import type { GenreOption } from "@/types/movie";

const PopularMovies = () => {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  // We use useMemo here because it will not be created again once the component re-render
  const movieGenres: GenreOption[] = useMemo(
    () => [
      { name: "Action", value: 28 },
      { name: "Adventure", value: 12 },
      { name: "Animation", value: 16 },
      { name: "Comedy", value: 35 },
      { name: "Crime", value: 80 },
      { name: "Documentary", value: 99 },
      { name: "Drama", value: 18 },
      { name: "Fantasy", value: 14 },
      { name: "Horror", value: 27 },
      { name: "Mystery", value: 9648 },
      { name: "Romance", value: 10749 },
      { name: "Sci-Fi", value: 878 },
      { name: "Thriller", value: 53 },
      { name: "Western", value: 37 },
    ],
    []
  );

  const filters = useMemo(() => {
    const genreIds =
      searchParams.get("genreIds")?.split(",").filter(Boolean).map(Number) ??
      [];
    const sortBy = searchParams.get("sortBy") ?? "popularity.desc";
    const language = searchParams.get("language") ?? "";
    const yearStr = searchParams.get("year") ?? "2000-2025";
    const [minY, maxY] = yearStr.split("-").map(Number);
    return {
      genreIds,
      sortBy,
      language,
      yearRange: [minY || 2000, maxY || 2025] as [number, number],
    };
  }, [searchParams]);

  const { data, isFetching } = useGetPopularQuery({
    page,
    genreIds: filters.genreIds,
    language: filters.language,
    minYear: filters.yearRange[0],
    maxYear: filters.yearRange[1],
    sortBy: filters.sortBy,
  });

  return (
    <div className="w-full flex flex-col justify-center items-center text-xl bg-[#0D0D0D] p-12">
      <h1 className="font-bold text-white text-3xl mb-10">Popular Movies</h1>

      <div className="flex w-full gap-12">
        <FilterBar movieGenres={movieGenres} />

        <div className="flex flex-wrap justify-start gap-6 w-[80%]">
          {isFetching
            ? Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-[200px] flex flex-col gap-2">
                  <Skeleton height={280} borderRadius={16} />
                  <Skeleton width="80%" height={18} />
                  <Skeleton width="40%" height={14} />
                </div>
              ))
            : data?.movies.map((item) => (
                <Link to={`/movie/${item.id}`}>
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
        totalPages={500}
      />
    </div>
  );
};

export default PopularMovies;
