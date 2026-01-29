import { useNavigate } from "react-router-dom";

const EmptyWatchlist = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center px-4 my-10">
      <div className="w-full max-w-2xl bg-zinc-900 flex flex-col items-center gap-6 sm:gap-8 justify-center p-6 sm:p-10 rounded-3xl text-center">
        <img
          className="w-28 sm:w-36 md:w-40"
          src="/empty-watchlist.svg"
          alt="Empty watchlist illustration"
        />

        <h2 className="text-xl sm:text-2xl font-bold">
          Your watchlist is empty
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-md">
          Start saving movies you want to watch. Build your personal collection
          and never forget a great film.
        </p>

        <button
          onClick={() => navigate("/movies/discover")}
          className="text-base sm:text-lg cursor-pointer bg-[#60A5FA] hover:bg-[#60A5FA]/90 shadow-indigo-600/30 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full transition"
        >
          Browse Movies
        </button>
      </div>
    </div>
  );
};

export default EmptyWatchlist;
