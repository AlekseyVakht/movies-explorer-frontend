import { React } from "react";

import './Header.css';
import { NavLink, useLocation } from 'react-router-dom';
import Navigation from "../Navigation/Navigation";
import NavTab from "../NavTab/NavTab";
import logoPath from '../../images/logo.svg'

function Header({ loggedIn, windowSize }) {
    const activePage = useLocation();
    const headerClassName = (`header ${activePage.pathname === "/" ? 'header_color' : ''}`)

    return (
        <header className={headerClassName}>
            <div className="header__container">
                <NavLink to="/" className="header__logo">
                    <img className="header__logo-image" src={logoPath} alt="Лого"/>
                </NavLink>
                {
                (windowSize <= 768 && loggedIn) ?
                <NavTab></NavTab>
                :
                <Navigation loggedIn={loggedIn}/>
                }
            </div>   
        </header>
    )
}

export default Header;
