import { React, useState, useEffect } from "react";
import './Header.css';
import { NavLink } from 'react-router-dom';
import Navigation from "../Navigation/Navigation";
import NavTab from "../NavTab/NavTab";
import logoPath from '../../images/logo.svg'

function Header({ loggedIn }) {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize());
      }
      window.addEventListener('resize', handleWindowResize);
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);

    function getWindowSize() {
        const {innerWidth} = window;
        return {innerWidth};
      }

    return (
        <header className="header">
            <div className="header__container">
                <NavLink to="/" className="header__logo">
                    <img className src={logoPath} alt="logo"/>
                </NavLink>
                {
                window.innerWidth <= 768 ?
                <NavTab></NavTab>
                :
                <Navigation loggedIn={loggedIn}/>
                }
            </div>   
        </header>
    )
}

export default Header;
