import React from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import cards from '../../utils/cards';

function Movies(){
    return(
        <>
        <SearchForm />
        <MoviesCardList cards={cards}/>
        </>
    )
}

export default Movies;
