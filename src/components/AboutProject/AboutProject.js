import React from "react";
import './AboutProject.css';

function AboutProject() {
    return(
        <section className="about-project">
            <p className="about-project__title">О проекте</p>
            
            <div className="about-project__columns">
                <div className="about-project__column">
                    <h2 className="about-project__brief">Дипломный проект включал 5 этапов</h2>
                    <p className="about-project__main">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__column">
                    <h2 className="about-project__brief">На выполнение диплома ушло 5 недель</h2>
                    <p className="about-project__main">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>

            <div className="about-project__timeline">
                <div className="about-project__timeline-cell about-project__timeline-cell_green">
                    <p className="about-project__timeline-cell-text">1 неделя</p>
                </div>
                <div className="about-project__timeline-cell about-project__timeline-cell_grey">
                    <p className="about-project__timeline-cell-text">4 недели</p>
                </div>
                <div className="about-project__timeline-cell">
                    <p className="about-project__timeline-cell-text about-project__timeline-cell-text_grey">Back-end</p>
                </div>
                <div className="about-project__timeline-cell">
                    <p className="about-project__timeline-cell-text about-project__timeline-cell-text_grey">Front-end</p>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;
