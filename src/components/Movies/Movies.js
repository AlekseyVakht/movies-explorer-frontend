import React from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies(){
    const cards = [
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
        },
        {
            name: "Баския: Взрыв реальности",
            link: require("../../images/examples/card-4.png")
        },
        {
            name: "Бег это свобода",
            link: require("../../images/examples/card-5.png")
        },
        {
            name: "Книготорговцы",
            link: require("../../images/examples/card-6.png")
        },
        {
            name: "Когда я думаю о Германии ночью",
            link: require("../../images/examples/card-7.png")
        },
        {
            name: "Gimme Danger: История Игги и The Stooges",
            link: require("../../images/examples/card-8.png")
        },
    ];

    return(
        <>
        <SearchForm />
        <MoviesCardList cards={cards}/>
        <section className="movies__more">
            <button type="button" className="movies__more-btn">Ещё</button>
        </section>
        </>
    )
}

export default Movies;
