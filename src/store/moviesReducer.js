import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMovies, getMovieDetails } from "../api/search";

const initialState = {
  error: false,
  isLoading: false,
  movies: {},
  searchTerm: "",
  selectedMovieId: "",
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
    setMovieDetailsModalIsOpenById(state, action) {
      state.selectedMovieId = action.payload;
      state.movies[action.payload].modalIsOpen =
        !state.movies[action.payload].modalIsOpen;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      if (action.payload) {
        state.movies = action.payload.reduce(
          (obj, item) => (
            (obj[item.imdbID] = {
              ...item,
              modalIsLoading: false,
              modalIsOpen: false,
              modalError: false,
            }),
            obj
          ),
          {}
        );
        state.isLoading = false;
      } else {
        state.isLoading = false;
        state.error = true;
      }
    });

    builder.addCase(fetchMovies.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(fetchMovies.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(fetchMovieDetails.rejected, (state, action) => {
      state.movies[action.meta.arg].modalIsLoading = false;
      state.movies[action.meta.arg].modalError = true;
    });

    builder.addCase(fetchMovieDetails.pending, (state, action) => {
      state.movies[action.meta.arg].modalIsLoading = true;
      state.movies[action.meta.arg].modalError = false;
    });

    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      Object.assign(state.movies[action.payload.imdbID], action.payload);
      state.movies[action.payload.imdbID].modalIsLoading = false;
    });
  },
});

export const {
  setMovies,
  getMoviesFailed,
  getMoviesSuccess,
  startGetMovies,
  setSearchTerm,
  setMovieDetailsModalIsOpenById,
} = moviesSlice.actions;

export default moviesSlice.reducer;

export const selectMovieById = (id) => (state) => state.movies.movies[id];
export const selectSelectedMovieId = (state) => state.movies.selectedMovieId;
export const selectMovies = (state) => state.movies.movies;
export const selectSearchTerm = (state) => state.movies.searchTerm;
export const selectIsLoading = (state) => state.movies.isLoading;

export const getModalIsOpenById = (id) => (state) => {
  if (id === "" || id === undefined) return false;
  return state.movies.movies[id].modalIsOpen;
};
