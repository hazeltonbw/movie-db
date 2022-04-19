import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMovies, getMovieDetails } from "../api/search";

const initialState = {
  error: false,
  isLoading: false,
  movies: [],
  movieDetails: {},
  searchTerm: "",
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (query) => {
    let movies;
    // API calls for "s" to search for a title
    try {
      movies = await getMovies(query);
    } catch (err) {
      console.log(err);
    }
    return movies;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (movieID) => {
    const search_paramater = "i";
    let movieDetails;
    try {
      movieDetails = await getMovieDetails(search_paramater, movieID);
    } catch (err) {
      console.log(err);
    }
    return movieDetails;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, action) {
      state.movies = action.payload;
    },
    startGetMovies(state) {
      state.isLoading = true;
      state.error = false;
    },
    getMoviesSuccess(state, action) {
      state.isLoading = false;
      state.movies = action.payload;
    },
    getMoviesFailed(state) {
      state.isLoading = false;
      state.error = true;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchMovies.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(fetchMovies.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(fetchMovieDetails.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(fetchMovieDetails.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.movieDetails = action.payload;
      state.isLoading = false;
    });
  },
});

export const {
  setMovies,
  getMoviesFailed,
  getMoviesSuccess,
  startGetMovies,
  setSearchTerm,
} = moviesSlice.actions;

export default moviesSlice.reducer;

export const selectMovies = (state) => state.movies.movies;
export const selectSearchTerm = (state) => state.movies.searchTerm;
export const selectMovieDetails = (state) => state.movies.movieDetails;
export const selectIsLoading = (state) => state.movies.isLoading;
