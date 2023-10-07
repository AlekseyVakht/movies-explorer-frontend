import React from 'react';
import './Footer.css';

function Footer(){
    return(
        <footer className="footer">
            <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__copyright">
                <p className="footer__year">&copy; 2023</p>
                <ul className="footer__links">
                    <li className="footer__links-item"><a href="/" className="footer__link">Яндекс.Практикум</a></li>
                    <li className="footer__links-item"><a href="/" className="footer__link">Github</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
