import React from 'react';
import './PageNotFound.css';

function PageNotFound(){
    return(
        <section className="not-found">
            <div className="not-found__header-container">
                <h1 className="not-found__header">404</h1>
                <h2 className="not-found__sub-header">Страница не найдена</h2>
            </div>
            <a href="/" className="not-found__return">Назад</a>
        </section>
    )
}

export default PageNotFound;
