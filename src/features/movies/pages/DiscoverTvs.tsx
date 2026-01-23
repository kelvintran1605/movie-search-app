import { useGetPopularQuery } from "@/services/moviesApiSlice";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";
import PaginationBar from "../components/PaginationBar";
import { useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSearchParams, Link } from "react-router-dom";
import type { GenreOption } from "@/types/movie";
import { useGetDiscoverTvsQuery } from "@/services/tvApiSlice";

const DiscoverTvs = () => {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();

  const tvGenres: GenreOption[] = [
    { name: "Action & Adventure", value: 10759 },
    { name: "Animation", value: 16 },
    { name: "Comedy", value: 35 },
    { name: "Crime", value: 80 },
    { name: "Documentary", value: 99 },
    { name: "Drama", value: 18 },
    { name: "Family", value: 10751 },
    { name: "Kids", value: 10762 },
    { name: "Mystery", value: 9648 },
    { name: "News", value: 10763 },
    { name: "Reality", value: 10764 },
    { name: "Sci-Fi & Fantasy", value: 10765 },
    { name: "Soap", value: 10766 },
    { name: "Talk", value: 10767 },
    { name: "War & Politics", value: 10768 },
    { name: "Western", value: 37 },
  ];

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

  const { data, isFetching } = useGetDiscoverTvsQuery({
    page,
    genreIds: filters.genreIds,
    language: filters.language,
    minYear: filters.yearRange[0],
    maxYear: filters.yearRange[1],
    sortBy: filters.sortBy,
  });

  return (
    <div className="w-full flex flex-col items-center text-xl bg-gray-100 text-black dark:bg-[#0D0D0D] dark:text-white px-4 py-8 sm:px-6 sm:py-10 lg:px-12 lg:py-12">
      <h1 className="font-bold text-2xl sm:text-3xl mb-6 sm:mb-10 text-black dark:text-white">
        Discover TVs
      </h1>

      <div className="flex w-full flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="w-full lg:w-[20%]">
          <FilterBar movieGenres={tvGenres} />
        </div>

        <div className="w-full lg:w-[80%]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-stretch gap-4 sm:gap-6">
            {isFetching
              ? Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="w-full flex flex-col gap-2">
                    <Skeleton
                      height={280}
                      borderRadius={16}
                      baseColor="#e5e7eb"
                      highlightColor="#f3f4f6"
                      className="dark:opacity-100"
                    />
                    <Skeleton
                      width="80%"
                      height={18}
                      baseColor="#e5e7eb"
                      highlightColor="#f3f4f6"
                      className="dark:opacity-100"
                    />
                    <Skeleton
                      width="40%"
                      height={14}
                      baseColor="#e5e7eb"
                      highlightColor="#f3f4f6"
                      className="dark:opacity-100"
                    />
                  </div>
                ))
              : data?.tvs.map((item) => (
                  <Link key={item.id} to={`/tv/${item.id}`} className="w-full">
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
      </div>

      <div className="mt-8 sm:mt-10">
        <PaginationBar
          onPageChange={setPage}
          currentPage={page}
          totalPages={500}
        />
      </div>
    </div>
  );
};

export default DiscoverTvs;
