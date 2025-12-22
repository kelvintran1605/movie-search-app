import type {
  Language,
  TmdbConfig,
  TmdbSearchResponse,
} from "@/types/tmdb.wire";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tmdbCf from "../samples/tmdb-config.json";
import { mapTmdbSummary } from "@/lib/tmdb.mapper";

const config = tmdbCf as TmdbConfig;

export const moviesApiSlice = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (build) => ({
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
  }),
});

export const { useGetPopularQuery, useGetAllLanguagesQuery } = moviesApiSlice;
