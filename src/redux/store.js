import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./slices/moviesSlice";
import personSlice from "./slices/personSlice";

const combinedReducer = {
  movies: moviesSlice,
  person: personSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
