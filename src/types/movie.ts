import type { Language } from "./tmdb.wire";

export type MovieSummary = {
  id: number;
  title: string;
  year: string;
  imgUrl: string;
  rating: number;
  overview?: string;
  genres: number[];
  mediaType?: "movie" | "tv";
};

export type MovieDetail = MovieSummary & {
  backdropUrl: string;
  duration: number;
  status: string;
  spokenLanguage: Language[];
  budget: number;
  revenue: number;
};

export type TmdbCredit = {
  cast: {
    id: number;
    name: string;
    profileUrl: string;
    character: string;
  }[];
  director?: {
    id: number;
    name: string;
    profileUrl: string;
    job: string;
  };
};

export type TmdbMovieReview = {
  name: string;
  profileUrl: string;
  rating: number;
  content: string;
  createdTime: string;
};

export type WatchlistMovie = {
  movie_id: number;
  title: string;
  image_url: string;
  release_date: string;
  rating: number;
  created_at: string;
};

export type GenreOption = { name: string; value: number };

export type Filters = {
  genreIds: number[];
  sortBy: string;
  language: string;
  yearRange: [number, number];
};
