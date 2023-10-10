import React from "react";
import './Techs.css';

function Techs() {
    return(
        <section className="techs">
            <p className="techs__title">Технологии</p>
            <h2 className="techs__header">7 технологий</h2>
            <p className="techs__about">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className="techs__grid">
                <li className="techs__grid-cell">HTML</li>
                <li className="techs__grid-cell">CSS</li>
                <li className="techs__grid-cell">JS</li>
                <li className="techs__grid-cell">React</li>
                <li className="techs__grid-cell">Git</li>
                <li className="techs__grid-cell">Express.js</li>
                <li className="techs__grid-cell">mongoDB</li>
            </ul>
        </section>
    )
}

export default Techs;
