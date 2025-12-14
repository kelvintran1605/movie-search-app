import { useGetPopularQuery } from "@/services/moviesApiSlice";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";
import PaginationBar from "../components/PaginationBar";
import { useState } from "react";
const PopularMovies = () => {
  const [page, setPage] = useState(1);
  const { isLoading, isError, data } = useGetPopularQuery(page);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>There was an error loading movies</p>;
  return (
    <div className="w-full flex flex-col justify-center items-center text-xl bg-[#0D0D0D] p-12">
      <h1 className="font-bold text-white text-3xl mb-10">Popular Movies</h1>
      <div className="flex w-full gap-6">
        {/* Filter Section */}
        <FilterBar />

        {/* Display Movies */}
        <div className="flex flex-wrap justify-around gap-10 w-[80%]">
          {data?.movies.map((item) => (
            <MovieCard
              imgURL={item.imgUrl}
              key={item.id}
              rating={item.rating}
              name={item.title}
              date={item.year}
            />
          ))}
        </div>
      </div>

      {/* Pagination Section */}
      <PaginationBar
        onPageChange={handlePageChange}
        currentPage={page}
        totalPages={500}
      />
    </div>
  );
};
export default PopularMovies;
