import React from 'react';
import './AboutMe.css';
import avatarPath from '../../images/avatar.png';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return(
        <section className="about-me">
            <p className="about-me__title">Студент</p>
            <div className="about-me__info">
                <div className="about-me__main">
                    <div className="about-me__info-text">
                        <h2 className="about-me__name">Виталий</h2>
                        <h3 className="about-me__profession">Фронтенд-разработчик, 30 лет</h3>
                        <p className="about-me__text">
                            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. 
                            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
                            С 2015 года работал в компании «СКБ Контур». 
                            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы. 
                        </p>
                    </div>
                    <a href="https://github.com/AlekseyVakht" className="about-me__git-link">Github</a>
                </div>
                <img className="about-me__avatar" src={avatarPath} alt="Аватар"/>
            </div>
            <Portfolio />
        </section>
    )
}

export default AboutMe;
