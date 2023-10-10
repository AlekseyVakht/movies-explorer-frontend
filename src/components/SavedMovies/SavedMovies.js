import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import savedCards from '../../utils/savedcards';

function SavedMovies(){

    return(
        <>
        <SearchForm />
        <MoviesCardList cards={savedCards}/>
        </>
    )
}

export default SavedMovies;
