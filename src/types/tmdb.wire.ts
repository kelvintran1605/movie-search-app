export type TmdbConfig = {
  images: {
    base_url?: string;
    secure_base_url: string;
    poster_sizes: string[];
    backdrop_sizes: string[];
  };
};

export type TmdbMovieSummaryWire = {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string;
  vote_average: number;
  overview?: string;
  genre_ids: number[];
  media_type?: "movie" | "tv";
};

export type TmdbSearchResponse = {
  page: number;
  results: TmdbMovieSummaryWire[];
  total_pages: number;
  total_results?: number;
};

type MovieDetailGenres = {
  id: number;
  name: string;
};
export type TmdbMovieDetailWire = {
  id: number;
  title: string;
  genres: MovieDetailGenres[];
  release_date: string;
  runtime: number;
  overview: string;
  vote_average: number;
  status: string;
  spoken_languages: Language[];
  budget: number;
  revenue: number;
  poster_path?: string;
  backdrop_path?: string;
};

export type TmdbTvDetailWire = {
  id: number;
  name: string;
  genres: { id: number; name: string }[];
  first_air_date: string;
  overview: string;
  vote_average: number;
  status: string;
  spoken_languages: Language[];
  number_of_episodes: number;
  number_of_seasons: number;
  poster_path: string;
  backdrop_path: string;
};

export type Language = {
  iso_639_1: string;
  english_name: string;
  name: string;
};

export type TmdbCreditWire = {
  cast: {
    id: number;
    name: string;
    profile_path?: string | null;
    character: string;
  }[];
  crew: {
    id: number;
    name: string;
    profile_path?: string | null;
    job: string;
  }[];
};

export type TmdbReviewWire = {
  id: number;
  author_details: {
    name: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
};

export type TmdbReviewResponse = {
  id: number;
  page: number;
  results: TmdbReviewWire[];
  total_pages: number;
  total_results: number;
};
