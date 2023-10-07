import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(){
    const savedCards = [
        {
            name: "33 слова о дизайне",
            link: require("../../images/examples/card-1.png")
        },
        {
            name: "Киноальманах «100 лет дизайна»",
            link: require("../../images/examples/card-2.png")
        },
        {
            name: "В погоне за Бенкси",
            link: require("../../images/examples/card-3.png")
        }
    ];

    return(
        <>
        <SearchForm />
        <MoviesCardList cards={savedCards}/>
        </>
    )
}

export default SavedMovies;
