import type { TmdbConfig, TmdbSearchResponse } from "@/types/tmdb.wire";
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
      query: (page = 1) =>
        `/movie/popular?page=${page}&api_key=${import.meta.env.VITE_TMDB_KEY}`,

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

export const { useGetPopularQuery } = moviesApiSlice;
