import React from "react";
import { NavLink } from 'react-router-dom';
import './Portfolio.css';

function Portfolio(){
    return(
        <div className="portfolio">
            <h2 className="portfolio__header">Портфолио</h2>
            <ul className="portfolio__links-list">
                <li className="portfolio__links-list-item">
                    <NavLink to="/" className="portfolio__link">
                        <p className="portfolio__link-text">Статичный сайт</p>
                        <div className="portfolio__link-arrow"></div>
                    </NavLink>
                </li>
                <li className="portfolio__links-list-item">
                    <NavLink to="/" className="portfolio__link">
                        <p className="portfolio__link-text">Адаптивный сайт</p>
                        <div className="portfolio__link-arrow"></div>
                    </NavLink>
                </li>
                <li className="portfolio__links-list-item">
                    <NavLink to="/" className="portfolio__link">
                        <p className="portfolio__link-text">Одностраничное приложение</p>
                            <div className="portfolio__link-arrow"></div>
                        </NavLink>
                </li>
            </ul>            
        </div>
    )
}

export default Portfolio;
