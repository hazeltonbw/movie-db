import React from "react";
import Movie from "./Movie";
import { useSelector } from "react-redux";

function Movies() {
  const moviesState = useSelector((state) => state.movies);
  const { movies, error, isLoading } = moviesState;

  if (isLoading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }
  if (error) {
    return <h1>Unable to load movies</h1>;
  }
  if (!movies) {
    return (
      <h1 style={{ textAlign: "center", color: "red" }}>
        Unable to load movies! Try another search.
      </h1>
    );
  }
  return (
    <div className="movies">
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </div>
  );
}

export default Movies;
