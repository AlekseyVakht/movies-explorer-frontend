import React from 'react';
import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';


function PageNotFound(){
    const navigate = useNavigate();

    const turnBack = () => {
        navigate(-1);
    }

    return(
        <main>
            <section className="not-found">
                <div className="not-found__header-container">
                    <h1 className="not-found__header">404</h1>
                    <h2 className="not-found__sub-header">Страница не найдена</h2>
                </div>
                <button className="not-found__return" onClick={turnBack}>Назад</button>
            </section>
        </main>
    )
}

export default PageNotFound;
