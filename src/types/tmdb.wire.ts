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
  vote_average?: number;
  overview?: string;
  media_type?: "movie" | "tv";
};

export type TmdbSearchResponse = {
  page: number;
  results: TmdbMovieSummaryWire[];
  total_pages: number;
  total_results?: number;
};

export type TmdbMovieDetailWire = TmdbMovieSummaryWire & {
  genres?: { id: number; name: string }[];
  runtime?: number;
  spoken_languages?: { english_name: string }[];
};
