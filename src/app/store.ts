import { configureStore } from "@reduxjs/toolkit";
import { moviesApiSlice } from "../services/moviesApiSlice";
import { watchlistApiSlice } from "@/services/watchlistApiSlice";
import { tvApiSlice } from "@/services/tvApiSlice";
import { personApiSlice } from "@/services/personApiSlice";
export const store = configureStore({
  reducer: {
    // todos: todosReducer,
    [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
    [watchlistApiSlice.reducerPath]: watchlistApiSlice.reducer,
    [tvApiSlice.reducerPath]: tvApiSlice.reducer,
    [personApiSlice.reducerPath]: personApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      moviesApiSlice.middleware,
      watchlistApiSlice.middleware,
      tvApiSlice.middleware,
      personApiSlice.middleware
    );
  },
});
