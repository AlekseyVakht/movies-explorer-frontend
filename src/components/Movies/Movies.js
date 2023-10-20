import { React, useEffect, useState } from "react";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Proloader";
import {
  DISPLAY_CARD_COUNTER_WIDTH_LESS_768,
  DISPLAY_CARD_COUNTER_WIDTH_MORE_768,
  DISPLAY_CARD_WIDTH_LARGE,
  DISPLAY_CARD_WIDTH_MEDIUM,
  DISPLAY_CARD_WIDTH_SMALL,
  DISPLAY_WIDTH_LARGE,
  DISPLAY_WIDTH_MEDIUM,
  SHORT_MOVIE_DURATION
} from "../../utils/constants";
import { getAllMovies } from "../../utils/MovieApi";

function Movies({ handleSave, savedMovies, isSaved }) {
  const [isLoading, setIsLoading] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isToggleActive, setIsToggleActive] = useState(
    localStorage.getItem("isToggleActive") === "true"
  );
  const [allMovies, setAllMovies] = useState([]);

  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [shownMovies, setShownMovies] = useState([]);

  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || ""
  );
  const [shownCards, setShownCards] = useState(DISPLAY_CARD_WIDTH_LARGE);

  const requestFilmApi = () => {
    setIsLoading(true);
    return getAllMovies()
      .then((res) => {
        setAllMovies(res);
        localStorage.setItem("allMovies", JSON.stringify(res));
        return res;
      })
      .catch((err) => {
        console.log(err);
        setSearchError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const currentToggleValue =
      localStorage.getItem("isToggleActive") === "true";
    const currentQueryValue = localStorage.getItem("searchQuery");
    setIsToggleActive(currentToggleValue);
    setSearchQuery(currentQueryValue || "");

    if (currentQueryValue) {
      handleSearchButton(currentQueryValue, currentToggleValue);
    }
  }, []);

  const handleSearchButton = (searchQuery, currentToggleState) => {
    const storedMovies = JSON.parse(localStorage.getItem("allMovies"));
    if (!storedMovies || !storedMovies.length) {
      requestFilmApi().then((res) => {
        searchMovies(res, searchQuery, currentToggleState);
      });
    } else {
      searchMovies(storedMovies, searchQuery, currentToggleState);
    }
    setHasSearched(true);
  };

  const searchMovies = (arrMovies, searchQuery, isToggleActive) => {
    let results = arrMovies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFoundMovies(results);
    localStorage.setItem("foundMovies", JSON.stringify(results));

    if (isToggleActive) {
      const filteredResults = filterShortMovies(results);
      setShownMovies(filteredResults);
    } else {
      setShownMovies(results);
    }
    if (shownMovies.length) {
      setSearchError("");
    } else {
      setSearchError("Ничего не найдено");
    }
  };

  const filterShortMovies = (arr) => {
    let results = arr.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
    return results;
  };

  const handleToggle = () => {
    setIsToggleActive((prev) => !prev);
    if (!isToggleActive) {
      setShownMovies(filterShortMovies(foundMovies));
    } else {
      setShownMovies(foundMovies);
    }
  };

  useEffect(() => {
    localStorage.setItem("isToggleActive", isToggleActive);
  }, [isToggleActive]);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery && hasSearched) {
      if (shownMovies.length) {
        setSearchError("");
      } else {
        setSearchError("Ничего не найдено");
      }
    }
  }, [shownMovies, searchQuery, shownMovies]);

  useEffect(() => {
    localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
  }, [foundMovies]);

  useEffect(() => {
    function updateDisplayedCard() {
      if (window.innerWidth >= DISPLAY_WIDTH_LARGE) {
        setShownCards(DISPLAY_CARD_WIDTH_LARGE);
      } else if (window.innerWidth >= DISPLAY_WIDTH_MEDIUM) {
        setShownCards(DISPLAY_CARD_WIDTH_MEDIUM);
      } else {
        setShownCards(DISPLAY_CARD_WIDTH_SMALL);
      }
    }
    window.addEventListener("resize", updateDisplayedCard);
    return () => {
      window.removeEventListener("resize", updateDisplayedCard);
    };
  }, [shownCards]);

  function handleMoreButton() {
    if (window.innerWidth >= DISPLAY_WIDTH_MEDIUM) {
      setShownCards(shownCards + DISPLAY_CARD_COUNTER_WIDTH_MORE_768);
    } else {
      setShownCards(shownCards + DISPLAY_CARD_COUNTER_WIDTH_LESS_768);
    }
  }

  const moreClassName = `movies-list__more ${
    foundMovies.length < shownCards ? "movies-list__more_height" : ""
  }`;
  const moreBtnClassName = `movies-list__more-btn ${
    foundMovies.length < shownCards ? "movies-list__more-btn_invisible" : ""
  }`;

  return (
    <main>
      <SearchForm
        handleSearchButton={handleSearchButton}
        filterShortMovies={filterShortMovies}
        isToggleActive={isToggleActive}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        allMovies={allMovies}
        handleToggle={handleToggle}
        setSearchError={setSearchError}
      />
      {isLoading && <Preloader />}
      <MoviesCardList
        savedMovies={savedMovies}
        handleSave={handleSave}
        searchError={searchError}
        shownCards={shownCards}
        shownMovies={shownMovies}
      />
      <section className={moreClassName}>
        <button
          type="button"
          className={moreBtnClassName}
          onClick={handleMoreButton}
        >
          Ещё
        </button>
      </section>
    </main>
  );
}

export default Movies;
