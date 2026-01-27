import { Link } from "react-router-dom";

const MovieCarousel = ({
  knownForMovies,
}: {
  knownForMovies: {
    url: string;
    title?: string;
    name?: string;
    id: number;
    type: string;
  }[];
}) => {
  return (
    <div className="w-full flex items-center overflow-x-scroll gap-3 pb-5">
      {knownForMovies.map((m) => (
        <Link
          to={`/${m.type}/${m.id}`}
          className="flex flex-col items-center shrink-0 w-33 hover:scale-105 cursor-pointer duration-150"
        >
          <img
            loading="lazy"
            src={m.url}
            className="h-50 w-33 rounded-x object-cover"
          />
          <div className="line-clamp-1">{m.title || m.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default MovieCarousel;
