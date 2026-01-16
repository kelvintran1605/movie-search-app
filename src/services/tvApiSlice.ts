import { mapTmdbReview, mapTmdbTvDetail } from "@/lib/tmdb.mapper";
import type {
  TmdbConfig,
  TmdbReviewResponse,
  TmdbTvDetailWire,
} from "@/types/tmdb.wire";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tmdbCf from "../samples/tmdb-config.json";
import type { TmdbCreditWire } from "@/types/tmdb.wire";
import { mapTmdbCredit } from "@/lib/tmdb.mapper";

const config = tmdbCf as TmdbConfig;

export const tvApiSlice = createApi({
  reducerPath: "tvApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (build) => ({
    // Get TV details
    getTvDetail: build.query({
      query: (id: number) => {
        return `/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`;
      },
      transformResponse: (res: TmdbTvDetailWire) => {
        return mapTmdbTvDetail(res, config);
      },
    }),

    // Get credits by id
    getTvCredit: build.query({
      query: (id: number) =>
        `tv/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`,
      transformResponse: (res: TmdbCreditWire) => {
        return mapTmdbCredit(res, config);
      },
    }),

    // Get reviews for a specific movie
    getTvReviews: build.query({
      query: (id: number) =>
        `tv/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`,
      transformResponse: (res: TmdbReviewResponse) => {
        return res.results.map((review) => mapTmdbReview(review, config));
      },
    }),
  }),
});

export const {
  useGetTvDetailQuery,
  useGetTvCreditQuery,
  useGetTvReviewsQuery,
} = tvApiSlice;
