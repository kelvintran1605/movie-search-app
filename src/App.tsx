import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import PopularMovies from "./features/movies/pages/PopularMovies";
import Home from "./features/home/pages/Home";
import MovieDetail from "./features/movies/pages/MovieDetail";
import WatchList from "./features/movies/pages/WatchList";
import NowPlaying from "./features/movies/pages/NowPlaying";
import AccountSettings from "./features/account/pages/AccountSettings";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="movies/popular" element={<PopularMovies />}></Route>
        <Route path="movies/now-playing" element={<NowPlaying />} />
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route path="watchlist" element={<WatchList />} />
        <Route path="account-settings" element={<AccountSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
