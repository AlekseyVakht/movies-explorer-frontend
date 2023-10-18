import { React, useState, useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

function SavedMovies({ savedMovies, handleSave, handleMovieDelete }) {
  const [searchError, setSearchError] = useState("");
  const [isToggleActive, setIsToggleActive] = useState(false);
  const [filtredSavedMovies, setFiltredSavedMovies] = useState([]);
  const [localQuery, setLocalQuery] = useState("");

  useEffect(() => {
    setFiltredSavedMovies(savedMovies);
    searchSavedMovies(localQuery, isToggleActive);
  }, [savedMovies]);

  const searchSavedMovies = (localQuery, isToggleActive) => {
    let results = savedMovies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(localQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(localQuery.toLowerCase())
    );
    if (isToggleActive) {
      const filteredResults = filterShortMovies(results);
      setFiltredSavedMovies(filteredResults);
    } else {
      setFiltredSavedMovies(results);
    }
  };

  const handleToggle = () => {
    setIsToggleActive((prev) => !prev);
    searchSavedMovies(localQuery, !isToggleActive);
  };

  const filterShortMovies = (arrayMovies) => {
    const results = arrayMovies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
    return results;
  };

  const handleSearchButton = (text, isToggleActive) => {
    setLocalQuery(text);
    searchSavedMovies(text, isToggleActive);
  };

  return (
    <main>
      <SearchForm
        handleSearchButton={handleSearchButton}
        isToggleActive={isToggleActive}
        handleToggle={handleToggle}
        setSearchQuery={setLocalQuery}
        searchQuery={localQuery}
        setSearchError={setSearchError}
      />
      <MoviesCardList
        handleSave={handleSave}
        savedMovies={filtredSavedMovies}
        searchError={searchError}
        isToggleActive={isToggleActive}
        handleMovieDelete={handleMovieDelete}
      />
    </main>
  );
}

export default SavedMovies;
