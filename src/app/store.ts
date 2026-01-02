import { configureStore } from "@reduxjs/toolkit";
import { moviesApiSlice } from "../services/moviesApiSlice";
import { watchlistApiSlice } from "@/services/watchlistApiSlice";
export const store = configureStore({
  reducer: {
    // todos: todosReducer,
    [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
    [watchlistApiSlice.reducerPath]: watchlistApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      moviesApiSlice.middleware,
      watchlistApiSlice.middleware
    );
  },
});
