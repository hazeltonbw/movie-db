import { React } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMovieDetails } from "../store/moviesReducer";

function Movie({ movie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(fetchMovieDetails(movie.imdbID));
    navigate(`/movie/${movie.imdbID}`, { replace: true });
  };
  if (movie.Poster !== "N/A")
    return (
      <div className="movie" onClick={handleClick}>
        <img src={movie.Poster} alt={`${movie.Title} Poster`} />
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
