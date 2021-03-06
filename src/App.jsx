import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import Movies from "./components/Movies";

function App() {
  return (
    <div className="App">
      <Home />
      <Routes>
        <Route
          path="/"
          element={
            <div className="hero">
              <h1
                style={{
                  textAlign: "center",
                  paddingTop: "50px",
                  color: "white",
                  background: "linear-gradient(180deg, black, transparent)",
                  height: "200px",
                }}
              >
                Search for your favorite movies!
              </h1>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="q/:id" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
