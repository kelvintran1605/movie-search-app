import type {
  Language,
  TmdbConfig,
  TmdbCreditWire,
  TmdbMovieDetailWire,
  TmdbReviewResponse,
  TmdbSearchResponse,
} from "@/types/tmdb.wire";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tmdbCf from "../samples/tmdb-config.json";
import {
  mapTmdbCredit,
  mapTmdbDetail,
  mapTmdbReview,
  mapTmdbSummary,
} from "@/lib/tmdb.mapper";

const config = tmdbCf as TmdbConfig;

export const moviesApiSlice = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (build) => ({
    // Get all popular movies
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
          a.english_name.localeCompare(b.english_name)
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

    // Get reviews for a specific movie
    getReviews: build.query({
      query: (movieId: number) =>
        `movie/${movieId}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`,
      transformResponse: (res: TmdbReviewResponse) => {
        return res.results.map((review) => mapTmdbReview(review, config));
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
  }),
});

export const {
  useGetPopularQuery,
  useGetAllLanguagesQuery,
  useGetMovieDetailQuery,
  useGetCreditQuery,
  useGetReviewsQuery,
  useGetNowPlayingQuery,
} = moviesApiSlice;
