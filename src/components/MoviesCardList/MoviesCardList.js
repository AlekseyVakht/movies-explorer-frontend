import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({cards}){

    return(
        <section className="movies-list">
            <ul className="movies-list__container">
                {cards.map((card)=> {
                    return(
                        <MoviesCard key={card._id} card={card}/>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default MoviesCardList;
