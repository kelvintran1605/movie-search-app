import type {
  Language,
  TmdbConfig,
  TmdbCreditWire,
  TmdbMovieDetailWire,
  TmdbReviewResponse,
  TmdbReviewWire,
  TmdbSearchResponse,
} from "@/types/tmdb.wire";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tmdbCf from "../samples/tmdb-config.json";
import {
  mapSearchMovie,
  mapSearchPerson,
  mapSearchTv,
  mapTmdbCredit,
  mapTmdbDetail,
  mapTmdbReview,
  mapTmdbSummary,
} from "@/lib/tmdb.mapper";
import type {
  RawSearchMovie,
  RawSearchPerson,
  RawSearchTv,
  SearchOption,
  Trailer,
} from "@/types/movie";

const config = tmdbCf as TmdbConfig;

export const moviesApiSlice = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (build) => ({
    // Get all discover movies
    getPopular: build.query({
      query: ({
        page = 1,
        genreIds = [],
        language = "",
        minYear,
        maxYear,
        sortBy,
      }) => {
        const withGenres =
          genreIds.length > 0 ? `&with_genres=${genreIds.join("|")}` : "";

        return `/discover/movie?page=${page}&api_key=${import.meta.env.VITE_TMDB_KEY}${withGenres}&language=${language}&primary_release_date.gte=${minYear}-01-01&primary_release_date.lte=${maxYear}-12-31&sort_by=${sortBy}`;
      },
      transformResponse: (res: TmdbSearchResponse) => {
        const movies = res.results.map((item) => mapTmdbSummary(item, config));
        return {
          movies,
          totalPages: res.total_pages,
        };
      },
    }),

    // Get all languages provided
    getAllLanguages: build.query<Language[], void>({
      query: () =>
        `/configuration/languages?sort_by=title.asc&api_key=${import.meta.env.VITE_TMDB_KEY}`,
      transformResponse: (res: Language[]) => {
        const languages = res.sort((a, b) =>
          a.english_name.localeCompare(b.english_name),
        );
        return languages;
      },
    }),

    // Get movie detail
    getMovieDetail: build.query({
      query: (movieId: number) =>
        `/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_KEY}`,
      transformResponse: (res: TmdbMovieDetailWire) => {
        return mapTmdbDetail(res, config);
      },
    }),

    // Get cast & director
    getCredit: build.query({
      query: (movieId: number) =>
        `movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`,
      transformResponse: (res: TmdbCreditWire) => {
        return mapTmdbCredit(res, config);
      },
    }),

    getReviewDetail: build.query({
      query: (reviewId: string) =>
        `/review/${reviewId}?api_key=${import.meta.env.VITE_TMDB_KEY}`,
      transformResponse: (res: TmdbReviewWire) => {
        return mapTmdbReview(res, config);
      },
    }),

    // Get reviews for a specific movie
    getReviews: build.query({
      query: (movieId: number) =>
        `movie/${movieId}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`,
      transformResponse: (res: TmdbReviewResponse) => {
        return res.results.map((review) => mapTmdbReview(review, config));
      },
    }),

    // Get upcoming movies
    getUpcomingMovies: build.query({
      query: ({ page = 1 }: { page: number }) => {
        return `/movie/upcoming?page=${page}&api_key=${import.meta.env.VITE_TMDB_KEY}`;
      },
      transformResponse: (res: TmdbSearchResponse) => {
        const movies = res.results.map((item) => mapTmdbSummary(item, config));
        return {
          movies,
          totalPages: res.total_pages,
        };
      },
    }),

    // Get Now Playing Query
    getNowPlaying: build.query({
      query: ({ page = 1 }: { page: number }) =>
        `movie/now_playing?page=${page}&api_key=${import.meta.env.VITE_TMDB_KEY}`,
      transformResponse: (res: TmdbSearchResponse) => {
        const movies = res.results.map((item) => mapTmdbSummary(item, config));
        return {
          movies,
          totalPages: res.total_pages,
        };
      },
    }),

    // Get top rated movie query
    getTopRatedMovie: build.query({
      query: ({ page = 1 }: { page: number }) =>
        `movie/top_rated?page=${page}&api_key=${import.meta.env.VITE_TMDB_KEY}`,
      transformResponse: (res: TmdbSearchResponse) => {
        const movies = res.results.map((item) => mapTmdbSummary(item, config));
        return {
          movies,
          totalPages: res.total_pages,
        };
      },
    }),

    // Search movie
    getSearchMovie: build.query({
      query: ({ query, option, page = 1 }) =>
        `/search/${option}?query=${encodeURIComponent(query)}&page=${page}&api_key=${
          import.meta.env.VITE_TMDB_KEY
        }&include_adult=false`,

      transformResponse: (
        response: any,
        _,
        { option }: { option: SearchOption },
      ) => {
        if (option === "movie") {
          return {
            results: response.results.map((item: RawSearchMovie) =>
              mapSearchMovie(item, config),
            ),
            total_pages: response.total_pages,
          };
        }

        if (option === "tv") {
          return {
            results: response.results.map((item: RawSearchTv) =>
              mapSearchTv(item, config),
            ),
            total_pages: response.total_pages,
          };
        }

        if (option === "person") {
          return {
            results: response.results.map((item: RawSearchPerson) =>
              mapSearchPerson(item, config),
            ),
            total_pages: response.total_pages,
          };
        }

        // multi
        return {
          results: response.results
            .map((item: any) => {
              switch (item.media_type) {
                case "movie":
                  return mapSearchMovie(item as RawSearchMovie, config);
                case "tv":
                  return mapSearchTv(item as RawSearchTv, config);
                case "person":
                  return mapSearchPerson(item as RawSearchPerson, config);
                default:
                  return null;
              }
            })
            .filter(Boolean),
          total_pages: response.total_pages,
        };
      },
    }),

    getTrailer: build.query({
      query: (id: number) => {
        return `/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}`;
      },
      transformResponse: (res) => {
        const video: Trailer = res.results.filter(
          (r: Trailer) => r.site === "YouTube" && r.official === true,
        )[0];

        return `https://www.youtube.com/embed/${video.key}?autoplay=1&mute=1&controls=1`;
      },
    }),

    getTrendingMovies: build.query({
      query: (time_window: "day" | "week") => {
        return `/trending/movie/${time_window}?api_key=${import.meta.env.VITE_TMDB_KEY}`;
      },
      transformResponse: (res) => {
        const trendingMoviesWire: TmdbMovieDetailWire[] = res.results;
        return trendingMoviesWire.map((movie) => mapTmdbDetail(movie, config));
      },
    }),
  }),
});

export const {
  useGetTopRatedMovieQuery,
  useGetUpcomingMoviesQuery,
  useGetPopularQuery,
  useGetAllLanguagesQuery,
  useGetMovieDetailQuery,
  useGetCreditQuery,
  useGetReviewsQuery,
  useGetNowPlayingQuery,
  useGetSearchMovieQuery,
  useGetTrailerQuery,
  useGetTrendingMoviesQuery,
  useGetReviewDetailQuery,
} = moviesApiSlice;
