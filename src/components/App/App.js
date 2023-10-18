import "./App.css";
//main
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

//utils
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

//auth
import * as Auth from "../../utils/Auth.js";

//api
import { api } from "../../utils/Api";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [savedMovies, setSavedMovies] = useState([]);

  const [windowSize, setWindowSize] = useState(getWindowSize());

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  const [isInit, setIsInit] = useState(false);
 
  const [isHeaderActive, setHeaderActive] = useState(false);
  const [isFooterActive, setFooterActive] = useState(false);

  const activePage = useLocation();
  const navigate = useNavigate();

  useEffect(
    () => {
      const jwt = localStorage.getItem("token");
      if (
        activePage.pathname === "/movies" ||
        activePage.pathname === "/saved-movies"
      ) {
        setHeaderActive(true);
        setFooterActive(true);
      } else if (activePage.pathname === "/profile") {
        setHeaderActive(true);
        setFooterActive(false);
      } else if (activePage.pathname === "/") {
        setHeaderActive(true);
        setFooterActive(true);
      } else {
        setHeaderActive(false);
        setFooterActive(false);
      }
      if (jwt) {
        Auth.checkToken(jwt)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              Promise.all([
                api.getUserInfoApi(localStorage.token),
                api.getSavedMovies(localStorage.token)
              ])
                .then(([user, savedList]) => {
                  setCurrentUser(user);
                  setSavedMovies(savedList);
                })
                .catch((err) => {
                  console.log(err);
                })
            }
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setIsInit(true);
          })
      }
    },
    [navigate], [loggedIn],
    [activePage, isFooterActive],
    [activePage, isHeaderActive]
  );

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowSize]);

  function getWindowSize() {
    const { innerWidth } = window;
    return { innerWidth };
  }

  //User
  function handleUpdateUser({ name, email }) {
    api
      .patchProfile({ name, email }, localStorage.token)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function signOut() {
    localStorage.clear()
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/signin", { replace: true });
  }


  //Movies
  function handleMovieDelete(movie) {
    api
      .deleteMovieApi(movie._id, localStorage.token)
      .then(() => {
        setSavedMovies(prevMovies => prevMovies.filter(i => i._id !== movie._id))
      })
      .catch((err) => console.log(err));
  }

  function handleSave(movieCard) {
    if (!savedMovies.some(i => i.movieId === movieCard.id)) {
      api.changeSaveStatus(movieCard, false, localStorage.token)
        .then(res => {
          setSavedMovies(prevMovies => [res, ...prevMovies]);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const deletedMovie = savedMovies.find(i => i.movieId === movieCard.id);
      if (deletedMovie && deletedMovie._id) {
        api.changeSaveStatus(deletedMovie, true, localStorage.token)
          .then(() => {
            setSavedMovies(prevMovies => prevMovies.filter(i => i.movieId !== movieCard.id));
          })
          .catch(err => { 
            console.log(err);
          })
      }
    }
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
            {isHeaderActive && (
              <Header loggedIn={loggedIn} windowSize={window.innerWidth} />
            )}
            <Routes>
              <Route path="/" element={<Main loggedIn={loggedIn} />} />
              <Route
                path="/movies"
                element={
                  <ProtectedRouteElement
                    element={Movies}
                    savedMovies={savedMovies}
                    handleSave={handleSave}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRouteElement
                    element={SavedMovies}
                    savedMovies={savedMovies}
                    handleSave={handleSave}
                    handleMovieDelete={handleMovieDelete}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRouteElement
                    element={Profile}
                    onUpdateUser={handleUpdateUser}
                    onSignOut={signOut}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route path="/signup" element={<Register />} />
              <Route
                path="/signin"
                element={<Login handleLogin={handleLogin} />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            {isFooterActive && <Footer />}

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
