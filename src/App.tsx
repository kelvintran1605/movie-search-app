import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import PopularMovies from "./features/movies/pages/DiscoverMovies";
import Home from "./features/home/pages/Home";
import MovieDetail from "./features/movies/pages/MovieDetail";
import WatchList from "./features/movies/pages/WatchList";
import NowPlaying from "./features/movies/pages/NowPlaying";
import AccountSettings from "./features/account/pages/AccountSettings";
import TvDetail from "./features/movies/pages/TvDetail";
import CastDetail from "./features/movies/pages/CastDetail";
import SearchResults from "./features/movies/pages/SearchResults";
import ScrollToTop from "./features/movies/components/ScrollToTop";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import ReviewDetail from "./features/movies/pages/ReviewDetail";
import UpcomingMovies from "./features/movies/pages/UpcomingMovies";
import TopRatedMovies from "./features/movies/pages/TopRatedMovies";
import DiscoverTvs from "./features/movies/pages/DiscoverTvs";
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movies/popular" element={<PopularMovies />}></Route>
          <Route path="/tv/:id" element={<TvDetail />} />
          <Route path="movies/now-playing" element={<NowPlaying />} />
          <Route path="person/:id" element={<CastDetail />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="review/:id" element={<ReviewDetail />}></Route>
          <Route path="movies/upcoming" element={<UpcomingMovies />} />
          <Route path="movies/top-rated" element={<TopRatedMovies />} />
          <Route path="tv/discover" element={<DiscoverTvs />} />
          <Route
            path="watchlist"
            element={
              <ProtectedRoute>
                <WatchList />
              </ProtectedRoute>
            }
          />
          <Route
            path="account-settings"
            element={
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            }
          />
          <Route path="search" element={<SearchResults />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
