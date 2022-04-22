import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieDetails,
  setMovieDetailsModalIsOpenById,
} from "../store/moviesReducer";

function Movie({ movie }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setMovieDetailsModalIsOpenById(movie.imdbID));
    if (movie.Response) {
      // if we have the Response property
      // we already gathered more information for the movie
      // so nothing needs to be done
      return;
    }
    dispatch(fetchMovieDetails(movie.imdbID));
  };
  if (movie.Poster !== "N/A")
    return (
      <div className="movie" onClick={handleClick}>
        <img
          className="movie-poster"
          src={movie.Poster}
          alt={`${movie.Title} Poster`}
        />
        <div className="movie-info">
          <h3 className="title">{movie.Title}</h3>
          <h4 className="year" style={{ color: "#673ab7" }}>
            {movie.Year}
          </h4>
          <h5 className="type">{movie.Type}</h5>
        </div>
      </div>
    );
}

export default Movie;
