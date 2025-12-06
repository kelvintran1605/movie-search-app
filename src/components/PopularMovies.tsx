import { useGetPopularQuery } from "../services/moviesApiSlice";

const PopularMovies = () => {
  const { data, isLoading, error } = useGetPopularQuery(1);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error Loading State</p>;
  return (
    <div>
      <ul>
        {data?.results?.map((movie: any) => (
          <li key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PopularMovies;
