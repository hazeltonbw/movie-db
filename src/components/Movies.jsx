import Movie from "./Movie";
import { useSelector, useDispatch } from "react-redux";
import {
  getModalIsOpenById,
  selectSelectedMovieId,
  setMovieDetailsModalIsOpenById,
} from "../store/moviesReducer";
import ReactModal from "react-modal";
import MovieDetails from "./MovieDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import isEmpty from "lodash.isempty";

const modalStyles = {
  overlay: {
    height: "min-content",
  },
  content: {
    display: "flex",
    flexDirection: "row-reverse",
    gap: "20px",
    position: "relative",
    width: 800,
    inset: 40,
    height: "min-content",
    padding: 0,
  },
};

function Movies() {
  const dispatch = useDispatch();
  const moviesState = useSelector((state) => state.movies);
  const selectedId = useSelector(selectSelectedMovieId);
  const modalIsOpen = useSelector(getModalIsOpenById(selectedId));
  const { movies, error, isLoading } = moviesState;

  if (isLoading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }

  if (error || !movies || isEmpty(movies)) {
    return (
      <h1 style={{ textAlign: "center", color: "red" }}>
        Unable to load movies.. try again!
      </h1>
    );
  }

  return (
    <div className="movies">
      {selectedId ? (
        <ReactModal
          isOpen={modalIsOpen}
          backdrop="static"
          style={modalStyles}
          appElement={document.getElementById("root") || undefined}
          onRequestClose={() => {
            // ran when user presses <ESC>
            dispatch(setMovieDetailsModalIsOpenById(selectedId));
          }}
          shouldCloseOnOverlayClick={
            /* Boolean indicating if the overlay should close the modal */
            false
          }
        >
          <FontAwesomeIcon
            icon={faXmark}
            size="lg"
            style={{ position: "absolute", right: "5px", cursor: "pointer" }}
            onClick={() => dispatch(setMovieDetailsModalIsOpenById(selectedId))}
          />
          <MovieDetails id={selectedId} />
        </ReactModal>
      ) : null}
      {Object.keys(movies).map((movie) => {
        return <Movie movie={movies[movie]} key={movie} />;
      })}
    </div>
  );
}

export default Movies;

