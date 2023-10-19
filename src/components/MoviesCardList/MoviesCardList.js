import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
  shownMovies,
  searchError,
  savedMovies,
  handleSave,
  shownCards,
  handleMovieDelete,
}) {
  const [toRender, setToRender] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setToRender(savedMovies.slice(0, shownCards));
    } else if (location.pathname === "/movies") {
      if (shownMovies.length) {
        setToRender(shownMovies.slice(0, shownCards));
      }
    }
  }, [shownCards, shownMovies, savedMovies, location.pathname]);

  return (
    <section className="movies-list">
      {searchError ? (
        <div className="movies-list_error">{searchError}</div>
      ) : (
        <>
          <ul className="movies-list__container">
            {toRender.map((card) => {
              return (
                <MoviesCard
                  key={card.id || card._id}
                  card={card}
                  savedMovies={savedMovies}
                  handleSave={handleSave}
                  handleMovieDelete={handleMovieDelete}
                />
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
