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

export type TvDetail = {
  id: number;
  name: string;
  genres: { id: number; name: string }[];
  airDate: string;
  overview: string;
  rating: number;
  status: string;
  spokenLanguages: Language[];
  episodesCount: number;
  seasonsCount: number;
  posterUrl: string;
  backdropUrl: string;
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
  id: number;
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
  created_at?: string;
  type: string;
};

export type GenreOption = { name: string; value: number };

export type Filters = {
  genreIds: number[];
  sortBy: string;
  language: string;
  yearRange: [number, number];
};

export type SearchOption = "multi" | "keyword" | "movie" | "person" | "tv";

// Types for search results
export type RawSearchPerson = {
  id: number;
  name: string;
  known_for_department: string;
  profile_path: string;
  popularity: number;
  media_type: string;
};

export type SearchPerson = {
  id: number;
  name?: string;
  job: string;
  url: string;
  popularity: number;
  media_type: string;
};

export type RawSearchMovie = {
  title: string;
  id: number;
  genre_ids: number[];
  release_date: string;
  poster_path: string;
  original_name: string;
  popularity: number;
  media_type: string;
  overview: string;
};

export type SearchMovie = {
  title?: string;
  id: number;
  genres?: number[];
  year?: string;
  url: string;
  popularity: number;
  media_type: string;
  overview: string;
};

export type RawSearchTv = {
  id: number;
  name: string;
  original_name: string;
  genre_ids: number[];
  first_air_date: string;
  poster_path: string;
  media_type: string;
  overview: string;
};

export type SearchTv = {
  id: number;
  name: string;
  genres: number[];
  year: string;
  url: string;
  media_type: string;
  overview: string;
};

export type SearchMulti = SearchTv &
  SearchPerson &
  SearchMovie & {
    media_type: string;
  };

export type Trailer = {
  id: number;
  key: string;
  site: string;
  official: boolean;
};
