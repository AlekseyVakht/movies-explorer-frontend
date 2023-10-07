import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavTab.css'

function NavTab(){
    const [isOpen, setIsOpen] = useState(false);
    const burgerMenuClassName=(`burger-menu ${isOpen && 'burger-menu_opened'}`);

    function handleClose(){
        setIsOpen(false);
    }

    function handleOpen(){
        setIsOpen(true);
    }

    return(
    <>
        <button type="button" className="burger-menu__btn" onClick={handleOpen}/>
        <section className={burgerMenuClassName}>
            <div className="burger-menu__container">
                <button onClick={handleClose} className="burger-menu__close-icon"></button>
                <div className="burger-menu__body">
                    <nav className="burger-menu__links">
                        <NavLink to="/" className={({isActive}) => `${isActive ? "burger-menu__link burger-menu__link_active" : "burger-menu__link"}`} >Главная</NavLink>
                        <NavLink to="/movies" className={({isActive}) => `${isActive ? "burger-menu__link burger-menu__link_active" : "burger-menu__link"}`}>Фильмы</NavLink>
                        <NavLink to="/saved-movies" className={({isActive}) => `${isActive ? "burger-menu__link burger-menu__link_active" : "burger-menu__link"}`}>Сохраненные фильмы</NavLink>
                    </nav>
                    <NavLink to="/profile" className="burger-menu__profile">
                        <p className="burger-menu__profile-text">Аккаунт</p>
                        <div className="burger-menu__profile-icon"></div>
                    </NavLink>
                </div>
            </div>
        </section>
        </>
    )
};

export default NavTab;