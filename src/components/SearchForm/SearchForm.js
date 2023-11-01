import { React, useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";

function SearchForm({
  handleSearchButton,
  searchQuery,
  setSearchQuery,
  handleToggle,
  isToggleActive,
  setSearchError,
}) {
  const location = useLocation();
  const [isErr, setIsErr] = useState("");

  useEffect(() => {
    if (
      localStorage.getItem("searchQuery") &&
      location.pathname === "/movies"
    ) {
      const newQuery = localStorage.getItem("searchQuery");
      setSearchQuery(newQuery);
    }
  }, [location]);

  function handleSearch() {
    if (!searchQuery.length) {
      setSearchError("");
      setIsErr(true);
      return;
    } else {
      setIsErr(false);
      handleSearchButton(searchQuery, isToggleActive);
    }
  }

  function handlePressEnter(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <section className="search-form">
      <form
        className="search-form__form"
        name="search-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="search-form__input"
          type="text"
          name="search"
          placeholder="Фильм"
          maxLength="60"
          value={searchQuery || ""}
          onKeyUp={handlePressEnter}
          onChange={(e) => {
            setIsErr(false);
            setSearchQuery(e.target.value);
          }}
        />
        <button
          className="search-form__submit-btn"
          type="button"
          onClick={handleSearch}
        >
          Найти
        </button>
        <FilterCheckbox handleToggle={handleToggle} isToggleActive={isToggleActive}/>
        {isErr && (
        <div className="search-form__error">
          {"Нужно ввести ключевое слово"}
        </div>
      )}
      </form>
      <div className="search-form__bottom-line"></div>
    </section>
  );
}

export default SearchForm;
