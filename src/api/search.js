import env from "react-dotenv";
export const API_ROOT = "http://www.omdbapi.com/";
const API_KEY = process.env.REACT_APP_API_KEY;

export const getMovies = async (query) => {
  const paramater = "s"; //search
  const url = `${API_ROOT}?apikey=${API_KEY}&${paramater}=${query}`;
  const response = await fetch(url);
  const json = await response.json();
  return json.Search; // return json contains array in Search
};

export const getMovieDetails = async (search_paramater, movieID) => {
  const url = `${API_ROOT}?apikey=${API_KEY}&${search_paramater}=${movieID}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};
