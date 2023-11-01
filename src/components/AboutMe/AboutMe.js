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
                        <h2 className="about-me__name">Алексей</h2>
                        <h3 className="about-me__profession">Фронтенд-разработчик, 25 лет</h3>
                        <p className="about-me__text">
                            Я из Санкт-Петербурга! Мне 25 лет, имею высшее образование, но я всегда стараюсь стремиться к чему-то новому, поэтому в один момент задумался о том,
                            что могу стать стать фронтенд-разработчиком, ведь это действительно интересно и увлекательно!
                            
                        </p>
                    </div>
                    <a href="https://github.com/AlekseyVakht" className="about-me__git-link" target="_blank" rel="noopener noreferrer">Github</a>
                </div>
                <img className="about-me__avatar" src={avatarPath} alt="Аватар"/>
            </div>
            <Portfolio />
        </section>
    )
}

export default AboutMe;
