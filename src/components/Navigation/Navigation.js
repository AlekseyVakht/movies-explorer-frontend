import { React } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ loggedIn }){
    return(
        <div className={`nav__links-container ${!loggedIn && 'nav__links-container_justify_end'}`}>
            { 
            loggedIn ? <>
            <nav className="nav__links">
                <NavLink to="/movies" className={({ isActive }) => `nav__link ${isActive ? 'nav__link_active' : ''}`}>Фильмы</NavLink>
                <NavLink to="/saved-movies" className={({ isActive }) => `nav__link ${isActive ? 'nav__link_active' : ''}`}>Сохраненные фильмы</NavLink>
            </nav>   
            <NavLink to="/profile" className="nav__profile">
                <p className="nav__profile-text">Аккаунт</p>
                <div className="nav__profile-icon"></div>
            </NavLink>
            </> : <>
            <nav className="nav__links">
                <NavLink to="/signup" className="nav__link nav__link_margin">Регистрация</NavLink>
                <NavLink to="/signin" className="nav__link nav__link_green">
                    <p className="nav__link-text">Войти</p>
                </NavLink>
            </nav>  
            </>
            }
        </div>
    )
}

export default Navigation;
