import { configureStore, combineReducers } from "@reduxjs/toolkit";
import moviesReducer from "./moviesReducer";

export default configureStore({
  reducer: combineReducers({
    movies: moviesReducer,
  }),
});
