import { configureStore } from "@reduxjs/toolkit";
import { moviesApiSlice } from "../services/moviesApiSlice";
export const store = configureStore({
  reducer: {
    // todos: todosReducer,
    [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(moviesApiSlice.middleware);
  },
});
