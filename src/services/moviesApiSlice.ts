import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const moviesApiSlice = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (build) => {
    return {
      getPopular: build.query({
        query: (page = 1) =>
          `/movie/popular?page=${page}&api_key=${import.meta.env.VITE_TMDB_KEY}`,
      }),
    };
  },
});

export const { useGetPopularQuery } = moviesApiSlice;
