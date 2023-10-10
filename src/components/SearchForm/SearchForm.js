import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm(){
    return(
        <section className="search-form">
            <form className="search-form__form" name="search-form">
                    <input className="search-form__input" type="text" name="search" placeholder="Фильм" maxLength="60"/>
                    <button className="search-form__submit-btn" type="submit">Найти</button>
                        <FilterCheckbox />
            </form>
            <div className="search-form__bottom-line"></div>
        </section>
    )
}

export default SearchForm;
