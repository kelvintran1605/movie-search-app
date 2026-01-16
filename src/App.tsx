import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import PopularMovies from "./features/movies/pages/PopularMovies";
import Home from "./features/home/pages/Home";
import MovieDetail from "./features/movies/pages/MovieDetail";
import WatchList from "./features/movies/pages/WatchList";
import NowPlaying from "./features/movies/pages/NowPlaying";
import AccountSettings from "./features/account/pages/AccountSettings";
import TvDetail from "./features/movies/pages/TvDetail";
import CastDetail from "./features/movies/pages/CastDetail";
import SearchResults from "./features/movies/pages/SearchResults";
import ScrollToTop from "./features/movies/components/ScrollToTop";
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
          <Route path="watchlist" element={<WatchList />} />
          <Route path="account-settings" element={<AccountSettings />} />
          <Route path="search" element={<SearchResults />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
