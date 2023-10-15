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

//utils
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

//auth
import * as Auth from "../../utils/Auth.js";

//api
import { api } from "../../utils/Api";
import { movieApi } from "../../utils/MovieApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isHeaderActive, setHeaderActive] = useState(false);
  const [isFooterActive, setFooterActive] = useState(false);

  const activePage = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      Auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate('/');
          Promise.all([api.getUserInfoApi(localStorage.token), movieApi.getMovies(localStorage.token)])
          .then(([user, movies]) => {
            setCurrentUser(user);
            setMovies(movies);
          })
          .catch((err) => {
            console.log(err);
          });
        }
      })
      .catch((err) => console.log(err));
    }
  }, [navigate]);

  // useEffect(
  //   () => {
  //     if (
  //       activePage.pathname === "/movies" ||
  //       activePage.pathname === "/saved-movies"
  //     ) {
  //       setHeaderActive(true);
  //       setFooterActive(true);
  //     } else if (activePage.pathname === "/profile") {
  //       setHeaderActive(true);
  //       setFooterActive(false);
  //     } else if (activePage.pathname === "/") {
  //       setHeaderActive(true);
  //       setFooterActive(true);
  //     } else {
  //       setHeaderActive(false);
  //       setFooterActive(false);
  //     }
  //   },
  //   [activePage, isHeaderActive],
  //   [activePage, isFooterActive],
  //   [activePage, loggedIn]
  // );

  function handleMovieDelete(movie) {
    movieApi
      .deleteMovieApi(movie._id, localStorage.token)
      .then((newCard) => {
        const newMovies = movies.filter((c) =>
          c._id === movie._id ? "" : newCard
        );
        setMovies(newMovies);
      })
      .catch((err) => console.log(err));
  }

  function handleMovieSave(movie) {
    const isLiked = movie.likes.some((i) => i === currentUser._id);
    api
      .changeMovieLikeApi(movie._id, isLiked, localStorage.token)
      .then((newCard) => {
        setMovies((state) =>
          state.map((c) => (c._id === movie._id ? newCard : c))
        );
      });
  }

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
    localStorage.removeItem("token");
    setCurrentUser({});
    setMovies([]);
    setLoggedIn(false);
    navigate("/signin", { replace: true });
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        {isHeaderActive && <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path="/" element={
            <ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}
            />}
          />
          <Route path="/movies" element={
            <ProtectedRouteElement
              element={Movies}
              loggedIn={loggedIn}
            />} 
          />
          <Route path="/saved-movies" element={
            <ProtectedRouteElement
              element={SavedMovies}
              loggedIn={loggedIn}
            />}
          />
          <Route path="/profile" element={
            <ProtectedRouteElement
              element={Profile}
              loggedIn={loggedIn}
            />} 
          />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {isFooterActive && <Footer />}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
