import { useGetPopularQuery } from "@/services/moviesApiSlice";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";
import PaginationBar from "../components/PaginationBar";
import { useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
type GenreOption = { name: string; value: number };

export type Filters = {
  genreIds: number[];
  sortBy: string;
  language: string;
  yearRange: [number, number];
};

const PopularMovies = () => {
  const [page, setPage] = useState(1);

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

  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    genreIds: [],
    sortBy: "popularity",
    language: "en",
    yearRange: [2000, 2025],
  });

  const { isLoading, isError, data, isFetching } = useGetPopularQuery({
    page,
    genreIds: appliedFilters.genreIds,
    language: appliedFilters.language,
    minYear: appliedFilters.yearRange[0],
    maxYear: appliedFilters.yearRange[1],
    sortBy: appliedFilters.sortBy,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>There was an error loading movies</p>;

  return (
    <div className="w-full flex flex-col justify-center items-center text-xl bg-[#0D0D0D] p-12">
      <h1 className="font-bold text-white text-3xl mb-10">Popular Movies</h1>

      <div className="flex w-full gap-6">
        <FilterBar
          movieGenres={movieGenres}
          onApply={(filters) => {
            setAppliedFilters(filters);
            setPage(1);
          }}
        />

        <div className="flex flex-wrap justify-around gap-10 w-[80%]">
          {isFetching
            ? Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-[200px] flex flex-col gap-2">
                  <Skeleton height={280} borderRadius={16} />
                  <Skeleton width="80%" height={18} />
                  <Skeleton width="40%" height={14} />
                </div>
              ))
            : data?.movies.map((item) => (
                <MovieCard
                  key={item.id}
                  imgURL={item.imgUrl}
                  rating={item.rating}
                  name={item.title}
                  date={item.year}
                />
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
