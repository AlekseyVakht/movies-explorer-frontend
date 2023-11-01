import { React } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { HOUR_DURATION_IN_MIN } from "../../utils/constants";

function MoviesCard({ card, savedMovies, handleSave, handleMovieDelete}) {
  const location = useLocation();

  const isSaved = savedMovies.some((i) => i.movieId === card.id)

  const handleButtonClick = () => {
    if (location.pathname === "/saved-movies") {
      handleMovieDelete(card);
    } else {
      handleSave(card);
    }
  };
  
  const moviePicture =
    location.pathname === "/movies"
      ? `https://api.nomoreparties.co${card.image.url}`
      : card.image;

  const buttonClassName =
    location.pathname === "/movies"
      ? `movies-card__save-btn ${isSaved ? "movies-card__save-btn_active" : ""}`
      : "movies-card__delete-btn";

  return (
    <li className="movies-card__element">
      <div className="movies-card__container">
        <a
          href={card.trailerLink}
          target="_blank"
          rel="noreferrer"
          className="movies-card__link"
        >
          <img
            className="movies-card__image"
            src={moviePicture}
            alt="Обложка фильма"
          />
        </a>
        <div className="movies-card__save-container">
          <h2 className="movies-card__description">{card.nameRU}</h2>
          <button
            type="button"
            className={buttonClassName}
            onClick={handleButtonClick}
          ></button>
        </div>
      </div>
      <p className="movies-card__duration">{`${Math.floor(
        card.duration / HOUR_DURATION_IN_MIN
      )} ч ${card.duration % HOUR_DURATION_IN_MIN} мин`}</p>
    </li>
  );
}

export default MoviesCard;
