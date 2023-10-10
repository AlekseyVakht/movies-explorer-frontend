import { React } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ loggedIn }){
    const navLinkContainerClassName = (`nav__links-container ${!loggedIn ? 'nav__links-container_justify_end' : ''}`);
    const navLinkClassName = (({ isActive }) => `nav__link ${isActive ? 'nav__link_active' : ''}`);

    return(
        <div className="nav">
            <div className={navLinkContainerClassName}>
                <>
                { 
                    loggedIn ? <>
                    <nav className="nav__links">
                        <NavLink to="/movies" className={navLinkClassName}>Фильмы</NavLink>
                        <NavLink to="/saved-movies" className={navLinkClassName}>Сохраненные фильмы</NavLink>
                    </nav>   
                    <NavLink to="/profile" className="nav__profile">
                        <p className="nav__profile-text">Аккаунт</p>
                        <div className="nav__profile-icon"></div>
                    </NavLink>
                    </> : <>
                    <nav className="nav__links">
                        <NavLink to="/signup" className="nav__link-unathorized">Регистрация</NavLink>
                        <NavLink to="/signin" className="nav__link-unathorized nav__link_unathorized_green">
                            <p className="nav__link-text">Войти</p>
                        </NavLink>
                    </nav>  
                    </>
                }
                </>
            </div>
        </div>
    )
}

export default Navigation;
