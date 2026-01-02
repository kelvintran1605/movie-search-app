import { IoPlayCircleOutline as PlayIcon } from "react-icons/io5";
import {
  FaRegBookmark as BookMark,
  FaCheck as CheckIcon,
} from "react-icons/fa";
import { MdFavoriteBorder as FavoriteIcon } from "react-icons/md";
import { IoIosAdd as AddIcon } from "react-icons/io";
import { useState } from "react";
import { PiStarFill as StarIcon } from "react-icons/pi";
import MovieCarousel from "../components/CastCarousel";
import ReviewCarousel from "../components/ReviewCarousel";
import {
  useGetCreditQuery,
  useGetMovieDetailQuery,
  useGetReviewsQuery,
} from "@/services/moviesApiSlice";
import { useParams } from "react-router-dom";
import {
  useAddtoWatchListMutation,
  useGetWatchlistQuery,
  useRemoveFromWatchlistMutation,
} from "@/services/watchlistApiSlice";

const MovieDetail = () => {
  const [play, setPlay] = useState(false);
  const { data: watchListMovies } = useGetWatchlistQuery();
  const [addToWatchlist] = useAddtoWatchListMutation();
  const [removeFromWatchlist] = useRemoveFromWatchlistMutation();
  const { id } = useParams();
  const movieId = Number(id);

  // Variable to check if this movie is already in watchlist
  const isMovieInWatchlist = watchListMovies?.some(
    (movie) => movie.movie_id === movieId
  );
  // Get movie detail based on id params
  const { data } = useGetMovieDetailQuery(movieId);
  const { data: credit } = useGetCreditQuery(movieId);
  const { data: reviews } = useGetReviewsQuery(movieId);

  // Function to add movie to watchlist
  const handleAdd = async () => {
    if (!data) return;

    await addToWatchlist({
      movie_id: data.id,
      title: data.title,
      image_url: data?.imgUrl,
      release_date: data?.year,
      rating: data?.rating,
    });
  };

  // Function to remove movie from watchlist
  const handleRemove = async () => {
    if (!data) return;

    await removeFromWatchlist(movieId);
  };
  return (
    <div className="w-full px-12 py-4 text-white h-full flex flex-col gap-5">
      {/* Trailer Display */}
      <div className="w-full">
        {play ? (
          <iframe
            className="w-full h-[500px]"
            src="https://www.youtube.com/embed/PJrvkIgwFPI?autoplay=1&mute=1&controls=1"
            title="YouTube video"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="relative w-full h-[500px]">
            {/* Play button centered */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button
                onClick={() => setPlay(true)}
                className="cursor-pointer flex items-center gap-3 px-6 py-3 rounded-full bg-black/60 backdrop-blur text-white text-lg font-semibold hover:bg-[#60A5FA]/80 transition"
              >
                <PlayIcon className="text-4xl" />
                Play Trailer
              </button>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent z-0" />

            {/* Poster */}
            <img
              src={data?.backdropUrl}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      {/* Movie Detail */}
      <div className="flex gap-14">
        {/* Movie Image */}
        <img
          className="w-[300px] h-[450px] object-cover rounded-xl"
          src={data?.imgUrl}
        />
        {/* Movie Information */}
        <div className="flex flex-col gap-8 z-10 w-1/2">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-4xl">{data?.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            {data?.genres.map((genre, i) =>
              typeof genre === "number" ? null : (
                <div
                  className="border px-2 py-1 rounded-full border-gray-600 hover:bg-gray-800 cursor-pointer duration-150"
                  key={i}
                >
                  {genre.name}
                </div>
              )
            )}
          </div>

          <div className="flex gap-2 items-center">
            <div>{data?.year}</div>
            <span>•</span>
            <div>{data?.duration} minutes</div>
          </div>

          <div className="flex items-center gap-4">
            {isMovieInWatchlist ? (
              <button
                onClick={handleRemove}
                className="tracking-wide bg-green-500 text-white text-base font-bold cursor-pointer
               flex items-center gap-3 rounded-full p-2 px-3
               hover:bg-green-500/80 duration-150"
              >
                <CheckIcon className="text-md" />
                In Watchlist
              </button>
            ) : (
              <button
                onClick={handleAdd}
                className="tracking-wide bg-[#60A5FA] text-white text-base font-bold cursor-pointer
               flex items-center gap-1 rounded-full p-2
               hover:bg-[#60A5FA]/80 duration-150"
              >
                <AddIcon className="text-3xl" />
                Add to watchlist
              </button>
            )}

            {/* Bookmark */}
            <div className="relative group">
              <div
                className="rounded-full hover:bg-white hover:text-black
                 duration-150 cursor-pointer p-2"
              >
                <BookMark className="text-2xl" />
              </div>

              <span
                className="absolute top-full mb-2 left-1/2 -translate-x-1/2 translate-y-1/3
                 whitespace-nowrap rounded-md
                 bg-gray-800 text-white text-md px-2 py-1
                 opacity-0 group-hover:opacity-100
                 transition-opacity duration-150
                 pointer-events-none"
              >
                Add to Watchlist
              </span>
            </div>

            {/* Favorite */}
            <div className="relative group">
              <div
                className="rounded-full hover:bg-white hover:text-black
                 duration-150 cursor-pointer p-1"
              >
                <FavoriteIcon className="text-3xl" />
              </div>

              <span
                className="absolute top-full mb-2 left-1/2 -translate-x-1/2 translate-y-1/3
                 whitespace-nowrap rounded-md
                 bg-gray-800 text-white text-md px-2 py-1
                 opacity-0 group-hover:opacity-100
                 transition-opacity duration-150
                 pointer-events-none"
              >
                Add to Favorites
              </span>
            </div>
          </div>

          <div>{data?.overview}</div>

          <div className="flex items-center justify-between w-1/3">
            <div>
              <div className="font-bold">Director</div>
              <div className="text-gray-300">{credit?.director?.name}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <div className="text-slate-100 text-xl font-bold">USER SCORE</div>
            <div className="flex items-center gap-2">
              <StarIcon className="text-yellow-500 text-xl" />
              <div className="text-xl">
                <span className="font-bold text-2xl tracking-wider">
                  {data?.rating.toFixed(1)}
                </span>
                /10
              </div>
            </div>
          </div>

          <div>
            <div className="text-[#60A5FA] text-xl font-bold">Status</div>
            <div>{data?.status}</div>
          </div>

          <div>
            <div className="text-[#60A5FA] text-xl font-bold">
              Spoken Languages
            </div>
            <div className="flex gap-4 items-center">
              {data?.spokenLanguage.map((language) => (
                <span key={language.iso_639_1}>{language.name}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[#60A5FA] text-xl font-bold">Budget</div>
            <div>
              {data?.budget === 0
                ? "Not yet updated"
                : `$ ${data?.budget.toLocaleString()}`}
            </div>
          </div>

          <div>
            <div className="text-[#60A5FA] text-xl font-bold">Revenue</div>
            <div>
              {data?.revenue === 0
                ? "Not yet updated"
                : `$ ${data?.revenue.toLocaleString()}`}
            </div>
          </div>
        </div>
      </div>
      {/* Casts */}
      <h2 className="text-2xl font-bold">Cast of {data?.title}</h2>
      <MovieCarousel cast={credit?.cast ?? []} />

      {/* Reviews */}
      <h2 className="text-2xl font-bold">Reviews</h2>
      <ReviewCarousel reviews={reviews || []} />
    </div>
  );
};

export default MovieDetail;
