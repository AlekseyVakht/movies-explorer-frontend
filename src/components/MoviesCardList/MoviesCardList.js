import { React, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';


function MoviesCardList({ cards }){
    const [filmCounter, setFilmCounter] = useState(8);
    const [films, setFilms] = useState(cards.slice(0, filmCounter));
    const moreClassName = (`movies-list__more ${(filmCounter > cards.length) ? 'movies-list__more_height' : ''}`)
    const moreBtnClassName = (`movies-list__more-btn ${(filmCounter > cards.length) ? 'movies-list__more-btn_invisible' : ''}`)
  
    function handleMoreClick() {
      let counter = filmCounter;
      counter += 8;
      setFilms(cards.slice(0, setFilmCounter(counter)))
    }

    return(
        <>
        <section className="movies-list">
            <ul className="movies-list__container">
                {films.map((card)=> {
                    return(
                        <MoviesCard key={card._id} card={card}/>
                        )
                    })
                }
            </ul>
        </section>
        <section className={moreClassName}>
            <button type="button" className={moreBtnClassName} onClick={handleMoreClick}>Ещё</button>
        </section>
        </>
    )
}

export default MoviesCardList;
