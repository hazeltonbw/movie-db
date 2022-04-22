import { React } from "react";
import { useSelector } from "react-redux";
import { selectMovieById } from "../store/moviesReducer";
import numberToColorHsl from "../utils/hslColor";

export default function MovieDetails({ id }) {
  const movieData = useSelector(selectMovieById(id));
  if (movieData)
    return (
      <div className="movieCard">
        <img src={movieData.Poster} alt="" />
        <div className="movieDetails">
          <div className="movieMain">
            <h1 className="movieTitle">{movieData.Title}</h1>
            <h1
              className="movieRating"
              style={{
                color: numberToColorHsl(movieData.imdbRating),
              }}
            >
              {movieData.imdbRating}
            </h1>
          </div>
          <div className="movieAttributes">
            <h5 className="movieAttribute">{movieData.Year}</h5>
            <h5 className="movieAttribute">{movieData.Rated}</h5>
            <h5 className="movieAttribute">{movieData.Runtime}</h5>
            <h5 className="movieAttribute">{movieData.Genre}</h5>
          </div>
          <h3>Plot</h3>
          <p className="moviePlot">{movieData.Plot}</p>
          <h3>Actors</h3>
          <p className="movieActors">{movieData.Actors}</p>
          <h4>Box Office Gross</h4>
          <p>{movieData.BoxOffice}</p>
          <h4>Awards</h4>
          <p>{movieData.Awards}</p>
        </div>
      </div>
    );
}

