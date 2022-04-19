import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  fetchMovies,
  setSearchTerm,
  selectSearchTerm,
} from "../store/moviesReducer";
function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useSelector(selectSearchTerm);

  const handleChange = ({ target }) => {
    dispatch(setSearchTerm(target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return; //if the user hasn't typed anything... ignore.
    dispatch(fetchMovies(query));
    navigate(`q/${query}`);
  };
  return (
    <div className="container">
      <nav>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            name="movie-search"
            id="movie-search"
            placeholder="Search movie database"
            value={query}
            onChange={handleChange}
          />
          <input type="submit" value="Search" />
        </form>

        <Link style={{ textDecoration: "none" }} to="/" className="logo">
          Movie Database
        </Link>
      </nav>
    </div>
  );
}

export default Home;
