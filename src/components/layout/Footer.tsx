import { FaRegCopyright } from "react-icons/fa6";
import { Link } from "react-router-dom";

// Classes for links
const linkClass =
  "text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white duration-150" +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black rounded";

const Footer = () => {
  return (
    <footer className="w-full bg-white/70 dark:bg-black/60 backdrop-blur-xl border-t border-slate-800/60 dark:border-white/10">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 py-10">
        <div className="grid gap-10 md:grid-cols-3 md:items-start border-b border-slate-200/60 dark:border-white/10 pb-10">
          <div className="flex flex-col gap-3 md:max-w-sm">
            <Link
              to="/"
              className="text-3xl lg:text-4xl font-bold bg-linear-to-b from-[#60A5FA] via-[#3B82F6] to-[#3B82F6]/80 bg-clip-text text-transparent tracking-wider leading-none w-fit"
              aria-label="Movix home"
            >
              Movix
            </Link>

            <div className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
              Discover movies, trailers, cast, and reviews in one place.
            </div>
          </div>

          <nav
            aria-label="Footer explore"
            className="flex flex-col gap-3 md:justify-self-center"
          >
            <div className="font-bold text-xl text-slate-900 dark:text-white">
              Explore
            </div>

            <div className="grid gap-2 text-sm">
              <Link to="/" className={linkClass}>
                Home
              </Link>
              <Link to="/movies/now-playing" className={linkClass}>
                Now playing
              </Link>
              <Link to="/movies/discover" className={linkClass}>
                Discover
              </Link>
              <Link to="/movies/top-rated" className={linkClass}>
                Top Rated
              </Link>
              <Link to="/watchlist" className={linkClass}>
                Watchlist
              </Link>
            </div>
          </nav>

          <div className="flex flex-col gap-3 md:justify-self-end w-full md:max-w-sm">
            <div className="font-bold text-xl text-slate-900 dark:text-white">
              Credits
            </div>

            <div className="flex w-full gap-3 rounded-2xl p-4 items-start border border-slate-200/60 bg-slate-100/40 dark:border-white/10 dark:bg-white/5">
              <div
                className="shrink-0 bg-linear-to-b from-[#60A5FA] via-[#3B82F6] to-[#3B82F6]/50 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm h-11 w-14 sm:w-16"
                aria-hidden="true"
              >
                TMDB
              </div>

              <div className="min-w-0">
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  Powered by TMDB
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
                  This product uses the TMDB API but is not endorsed or
                  certified by TMDB.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-slate-600 dark:text-gray-300 text-sm">
          <div className="flex items-center gap-2">
            <FaRegCopyright aria-hidden="true" />
            <span>2026 Movix. All rights reserved.</span>
          </div>

          <div className="text-xs opacity-80">
            Built for learning & portfolio • React + TMDB
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
