import React from 'react';
import { NavLink } from 'react-router-dom';
import './AboutMe.css';
import avatarPath from '../../images/avatar.png';
import linkArrowPath from '../../images/link-arrow.svg';

function AboutMe() {
    return(
        <section className="about-me">
            <p className="about-me__title">Обо мне</p>
            <div className="about-me__info">
                <div className="about-me__main">
                    <div className="about-me__info-text">
                        <h1 className="about-me__name">Виталий</h1>
                        <h2 className="about-me__profession">Фронтенд-разработчик, 30 лет</h2>
                        <p className="about-me__text">
                            Я родился и живу в Саратове, закончил факультет экономики СГУ. 
                            У меня есть жена и дочь. 
                            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
                            С 2015 года работал в компании «СКБ Контур». 
                            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                        </p>
                    </div>
                    <NavLink to="/" className="about-me__git-link">Github</NavLink>
                </div>
                <img className="about-me__avatar" src={avatarPath} alt="avatar"/>
            </div>
            <p className="about-me__portfolio">Портфолио</p>
            <ul className="about-me__portfolio-links-list">
                <li className="about-me__portfolio-links-list-item">
                    <NavLink to="/" className="about-me__portfolio-link">Статичный сайт<img className="about-me__portfolio-link-arrow" src={linkArrowPath} alt="arrow"/></NavLink>
                </li>
                <li className="about-me__portfolio-links-list-item">
                    <NavLink to="/" className="about-me__portfolio-link">Адаптивный сайт<img className="about-me__portfolio-link-arrow" src={linkArrowPath} alt="arrow"/></NavLink>
                </li>
                <li className="about-me__portfolio-links-list-item">
                    <NavLink to="/" className="about-me__portfolio-link">Одностраничное приложение<img className="about-me__portfolio-link-arrow" src={linkArrowPath} alt="arrow"/></NavLink>
                </li>
            </ul>
        </section>
    )
}

export default AboutMe;
