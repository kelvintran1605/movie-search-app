import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib/supabase";
import type { WatchlistMovie } from "@/types/movie";
export const watchlistApiSlice = createApi({
  reducerPath: "watchlistApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Watchlist"],
  endpoints: (build) => ({
    // Get all movies from watchlist
    getWatchlist: build.query<WatchlistMovie[], void>({
      providesTags: ["Watchlist"],
      queryFn: async () => {
        const { data: watchlistMovies } = await supabase
          .from("watchlist")
          .select("*");
        return { data: watchlistMovies ?? [] };
      },
    }),

    // Add movie to watchlist
    addtoWatchList: build.mutation<void, WatchlistMovie>({
      invalidatesTags: ["Watchlist"],
      queryFn: async ({ movie_id, title, image_url, release_date, rating }) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { error } = await supabase.from("watchlist").insert({
          user_id: user?.id,
          movie_id,
          title,
          image_url,
          release_date,
          rating,
        });

        if (error) error;
        return { data: undefined };
      },
    }),

    // Remove movie from watchlist
    removeFromWatchlist: build.mutation<void, number>({
      invalidatesTags: ["Watchlist"],
      queryFn: async (movieId: number) => {
        const { error } = await supabase
          .from("watchlist")
          .delete()
          .eq("movie_id", movieId);
        if (error) return { error };
        return { data: undefined };
      },
    }),
  }),
});

export const {
  useGetWatchlistQuery,
  useAddtoWatchListMutation,
  useRemoveFromWatchlistMutation,
} = watchlistApiSlice;
