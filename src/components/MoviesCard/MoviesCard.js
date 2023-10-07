import { React, useState } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({card}){
    const [isSaved, setSaved] = useState(false);
    const activePage = useLocation();

    const saveMovieButtonClassName=(
        `movies-card__save-btn ${isSaved && 'movies-card__save-btn_active'}`
    );

    const deleteMovieButtonClassName=('movies-card__delete-btn');

    function handleSave(){
        if (!isSaved) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }

    function handleDelete(){
    }

    return(
        <li className="movies-card__element">
            <img className="movies-card__image" src={card.link} alt="film"/>
            <div className="movies-card__save-container">
                <p className="movies-card__description">{card.name}</p>
                {activePage.pathname === '/movies' && <button type="button" className={saveMovieButtonClassName} onClick={handleSave}></button>}
                {activePage.pathname === '/saved-movies' && <button type="button" className={deleteMovieButtonClassName} onClick={handleDelete}></button>}
            </div>
        <p className="movies-card__duration">1ч42мин</p>
    </li>
    )
}

export default MoviesCard;
