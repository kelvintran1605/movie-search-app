import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import PopularMovies from "./features/movies/pages/PopularMovies";
import Home from "./features/home/pages/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="movies/popular" element={<PopularMovies />} />
      </Route>
    </Routes>
  );
}

export default App;
