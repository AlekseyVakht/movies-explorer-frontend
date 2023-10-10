import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const activePage = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isHeaderActive, setHeaderActive] = useState(false);
  const [isFooterActive, setFooterActive] = useState(false);

  useEffect(() =>{
      if (
        activePage.pathname === "/movies"||
        activePage.pathname === "/saved-movies"
        ) 
      {
        setHeaderActive(true);
        setLoggedIn(true);
        setFooterActive(true);
      } else if (activePage.pathname === "/profile")
      {
        setLoggedIn(true);
        setHeaderActive(true);
        setFooterActive(false);
      } else if (activePage.pathname === "/")
      {
        setLoggedIn(false);
        setHeaderActive(true);
        setFooterActive(true);
      } else { 
        setHeaderActive(false)
        setFooterActive(false);
      }
    }, 
    [activePage, isHeaderActive], 
    [activePage, isFooterActive], 
    [activePage, loggedIn]);

  return (
    <div className="root">
      {isHeaderActive && <Header loggedIn={loggedIn}/>}
      <Routes>
          <Route 
          path="/"
          element={
            <Main/>
          }
          />
          <Route
            path="/movies"
            element={
              <Movies/>
            }
            />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies/>
            }
          />
          <Route
            path="/profile"
            element={
              <Profile/>
            }
          />
            <Route
              path="/signup"
              element={
                <Register/>
              }
            />
            <Route
              path="/signin"
              element={
                <Login/>
              }
            />
            <Route
              path="*"
              element={
                <PageNotFound/>
              }
            />
      </Routes>
      {isFooterActive && <Footer/>}
    </div>
  );
}

export default App;
