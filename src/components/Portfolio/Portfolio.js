import React from "react";
import './Portfolio.css';

function Portfolio(){
    return(
        <div className="portfolio">
            <h2 className="portfolio__header">Портфолио</h2>
            <ul className="portfolio__links-list">
                <li className="portfolio__links-list-item">
                    <a href="https://alekseyvakht.github.io/how-to-learn" className="portfolio__link" target="_blank" rel="noopener noreferrer">
                        <p className="portfolio__link-text">Статичный сайт</p>
                        <div className="portfolio__link-arrow"></div>
                    </a>
                </li>
                <li className="portfolio__links-list-item">
                    <a href="https://alekseyvakht.github.io/russian-travel" className="portfolio__link" target="_blank" rel="noopener noreferrer">
                        <p className="portfolio__link-text">Адаптивный сайт</p>
                        <div className="portfolio__link-arrow"></div>
                    </a>
                </li>
                <li className="portfolio__links-list-item">
                    <a href="https://alekseyvakht.github.io/mesto" className="portfolio__link" target="_blank" rel="noopener noreferrer">
                        <p className="portfolio__link-text">Одностраничное приложение</p>
                        <div className="portfolio__link-arrow"></div>
                    </a>
                </li>
            </ul>            
        </div>
    )
}

export default Portfolio;
