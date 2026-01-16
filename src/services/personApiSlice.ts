import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tmdbCf from "../samples/tmdb-config.json";
import type { TmdbConfig } from "@/types/tmdb.wire";
import type { CreditResponse, PersonDetailWire } from "@/types/person";
import { mapTmdbCast, mapTmdbCrew, mapTmdbPerson } from "@/lib/tmdb.mapper";

const config = tmdbCf as TmdbConfig;

export const personApiSlice = createApi({
  reducerPath: "personApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/person" }),
  endpoints: (build) => ({
    // Get Person Detail
    getPersonDetail: build.query({
      query: (id: number) => {
        return `/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`;
      },
      transformResponse: (res: PersonDetailWire) => {
        return mapTmdbPerson(res, config);
      },
    }),

    // Get combined credits
    getCombinedCredits: build.query({
      query: (id: number) => {
        return `/${id}/combined_credits?api_key=${import.meta.env.VITE_TMDB_KEY}`;
      },
      transformResponse: (res: CreditResponse) => {
        const cast = res.cast.map((c) => mapTmdbCast(c, config));
        const crew = res.crew.map((c) => mapTmdbCrew(c, config));
        return {
          cast,
          crew,
        };
      },
    }),
  }),
});

export const { useGetPersonDetailQuery, useGetCombinedCreditsQuery } =
  personApiSlice;
