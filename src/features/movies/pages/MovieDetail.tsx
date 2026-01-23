import { IoPlayCircleOutline as PlayIcon } from "react-icons/io5";
import { FaCheck as CheckIcon } from "react-icons/fa";
import { IoIosAdd as AddIcon } from "react-icons/io";
import { useState } from "react";
import { PiStarFill as StarIcon } from "react-icons/pi";
import MovieCarousel from "../components/CastCarousel";
import ReviewCarousel from "../components/ReviewCarousel";
import {
  useGetCreditQuery,
  useGetMovieDetailQuery,
  useGetReviewsQuery,
  useGetTrailerQuery,
} from "@/services/moviesApiSlice";
import { useParams } from "react-router-dom";
import {
  useAddtoWatchListMutation,
  useGetWatchlistQuery,
  useRemoveFromWatchlistMutation,
} from "@/services/watchlistApiSlice";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useAuth } from "@/context/AuthContext";

const MovieDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const movieId = Number(id);
  const [play, setPlay] = useState(false);
  const { data: watchListMovies } = useGetWatchlistQuery();
  const [addToWatchlist, { isLoading: isAddLoading }] =
    useAddtoWatchListMutation();
  const [removeFromWatchlist, { isLoading: isRemoveLoading }] =
    useRemoveFromWatchlistMutation();
  const { data: trailerLink } = useGetTrailerQuery(movieId);

  const isMovieInWatchlist = watchListMovies?.some(
    (movie) => movie.movie_id === movieId,
  );

  const { data } = useGetMovieDetailQuery(movieId);
  const { data: credit } = useGetCreditQuery(movieId);
  const { data: reviews } = useGetReviewsQuery(movieId);

  const handleAdd = async () => {
    if (!data) return;

    if (!user) {
      toast.error("Sign in required to add");
      return;
    }
    await addToWatchlist({
      movie_id: data.id,
      title: data.title,
      image_url: data?.imgUrl,
      release_date: data?.year,
      rating: data?.rating,
      type: "movie",
    });
    toast.success("Added to Watchlist!");
  };

  const handleRemove = async () => {
    if (!data) return;
    await removeFromWatchlist(movieId);
    toast.success("Removed from Watchlist!");
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-4 h-full flex flex-col gap-5 text-slate-900 dark:text-white">
      <div className="w-full">
        {play ? (
          <iframe
            className="w-full h-[240px] sm:h-[360px] lg:h-[500px]"
            src={trailerLink}
            title="YouTube video"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="relative w-full h-[240px] sm:h-[360px] lg:h-[500px] overflow-hidden rounded-2xl">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button
                onClick={() => setPlay(true)}
                className="cursor-pointer flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full backdrop-blur text-base sm:text-lg font-semibold transition
                bg-white/70 text-slate-900 hover:bg-sky-400/70
                dark:bg-black/60 dark:text-white dark:hover:bg-[#60A5FA]/80"
              >
                <PlayIcon className="text-3xl sm:text-4xl" />
                Play Trailer
              </button>
            </div>

            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent z-0" />

            <img
              src={data?.backdropUrl}
              className="w-full h-full object-cover"
              alt={data?.title || "Movie backdrop"}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
        <img
          className="w-full max-w-[320px] sm:max-w-[360px] lg:w-[300px] h-auto lg:h-[450px] object-cover rounded-xl"
          src={data?.imgUrl}
          alt={data?.title || "Movie poster"}
        />

        <div className="flex flex-col gap-4 z-10 w-full lg:w-1/2">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
              {data?.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {data?.genres.map((genre, i) =>
              typeof genre === "number" ? null : (
                <div
                  className="border px-2 py-1 rounded-full cursor-pointer duration-150 text-sm sm:text-base
                  border-slate-300 hover:bg-slate-100
                  dark:border-gray-600 dark:hover:bg-gray-800"
                  key={i}
                >
                  {(genre as { name: string }).name}
                </div>
              ),
            )}
          </div>

          <div className="flex gap-2 items-center text-slate-700 dark:text-slate-300 text-sm sm:text-base">
            <div>{data?.year}</div>
            <span>•</span>
            <div>{data?.duration} minutes</div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {isMovieInWatchlist ? (
              <button
                onClick={handleRemove}
                className="tracking-wide text-sm sm:text-base font-bold cursor-pointer flex items-center gap-3 rounded-full p-2 px-3 duration-150
                bg-green-600 text-white hover:bg-green-600/80"
              >
                {isRemoveLoading ? (
                  <ClipLoader
                    color="#ffffff"
                    loading={isRemoveLoading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <>
                    <CheckIcon className="text-md" />
                    In Watchlist
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleAdd}
                className="tracking-wide text-sm sm:text-base font-bold cursor-pointer flex items-center gap-1 rounded-full p-2 duration-150
                bg-sky-500 text-white hover:bg-sky-500/80
                dark:bg-[#60A5FA] dark:hover:bg-[#60A5FA]/80"
              >
                {isAddLoading ? (
                  <ClipLoader
                    color="#ffffff"
                    loading={isAddLoading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <>
                    <AddIcon className="text-3xl" /> Add to Watchlist
                  </>
                )}
              </button>
            )}
          </div>

          <div className="text-slate-700 dark:text-slate-200 text-sm sm:text-base">
            {data?.overview}
          </div>

          <div className="flex items-center justify-between w-full sm:w-2/3 lg:w-1/3">
            <div>
              <div className="font-bold text-sm sm:text-base">Director</div>
              <div className="text-slate-600 dark:text-gray-300 text-sm sm:text-base">
                {credit?.director?.name}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8 w-full lg:w-auto">
          <div className="flex flex-col">
            <div className="text-slate-900 dark:text-slate-100 text-lg sm:text-xl font-bold">
              USER SCORE
            </div>
            <div className="flex items-center gap-2">
              <StarIcon className="text-yellow-500 text-lg sm:text-xl" />
              <div className="text-lg sm:text-xl">
                <span className="font-bold text-xl sm:text-2xl tracking-wider">
                  {data?.rating?.toFixed?.(1)}
                </span>
                /10
              </div>
            </div>
          </div>

          <div>
            <div className="text-sky-600 dark:text-[#60A5FA] text-lg sm:text-xl font-bold">
              Status
            </div>
            <div className="text-slate-700 dark:text-slate-200 text-sm sm:text-base">
              {data?.status}
            </div>
          </div>

          <div>
            <div className="text-sky-600 dark:text-[#60A5FA] text-lg sm:text-xl font-bold">
              Spoken Languages
            </div>
            <div className="flex gap-3 sm:gap-4 items-center flex-wrap text-slate-700 dark:text-slate-200 text-sm sm:text-base">
              {data?.spokenLanguage.map((language) => (
                <span key={language.iso_639_1}>{language.name}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sky-600 dark:text-[#60A5FA] text-lg sm:text-xl font-bold">
              Budget
            </div>
            <div className="text-slate-700 dark:text-slate-200 text-sm sm:text-base">
              {data?.budget === 0
                ? "Not yet updated"
                : `$ ${data?.budget.toLocaleString()}`}
            </div>
          </div>

          <div>
            <div className="text-sky-600 dark:text-[#60A5FA] text-lg sm:text-xl font-bold">
              Revenue
            </div>
            <div className="text-slate-700 dark:text-slate-200 text-sm sm:text-base">
              {data?.revenue === 0
                ? "Not yet updated"
                : `$ ${data?.revenue.toLocaleString()}`}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold">Cast of {data?.title}</h2>
      <MovieCarousel cast={credit?.cast ?? []} />

      <h2 className="text-xl sm:text-2xl font-bold">Reviews</h2>
      <ReviewCarousel reviews={reviews || []} />
    </div>
  );
};

export default MovieDetail;
