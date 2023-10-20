import { React, useState, useContext, useEffect } from "react";
import "./Profile.css";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { EMAIL_REGEX, NAME_REGEX } from "../../utils/constants";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [isDisabled, setDisabled] = useState(true);
  const [isSubmitButtonActive, setSubmitButtonActive] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [isErr, setIsErr] = useState(false);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser])

  useEffect(() => {
    if (errorName || errorEmail){
      setIsErr(true)
    } else {
      setIsErr(false);
    }
    console.log(isErr);
  }, [errorEmail, errorName, isErr])

  useEffect(() => {
    if (name !== currentUser.name || email !== currentUser.email){
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [name, email, currentUser, isValid])

  function handleChangeName(e) {
    setName(e.target.value);
    if (NAME_REGEX.test(String(e.target.value))) {
      setErrorName("");
    } else {
      setErrorName("Неправильный формат имени");
    }
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    if (EMAIL_REGEX.test(String(e.target.value).toLowerCase())) {
      setErrorEmail("");
    } else {
      setErrorEmail("Неправильный формат email.");
    }
  }

  function handleClick() {
    setSubmitButtonActive(true);
    setDisabled(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      email: email,
    })
    setSubmitButtonActive(false);
    setDisabled(true);
  }

  function handleSignOut() {
    props.onSignOut();
  }

  return (

    <main>
      <section className="profile">
        <div className="profile__align-container">
          <h1 className="profile__name">Привет, {currentUser.name}!</h1>
          <form
            className="profile__edit-form"
            id="profile-form"
            name="profile-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="profile__input-container">
              <label className="profile__edit-form-label" htmlFor="name">
                Имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="profile__edit-form-input"
                defaultValue={name}
                placeholder="Ваше имя..."
                onChange={handleChangeName}
                minLength={2}
                maxLength={30}
                disabled={isDisabled || !props.isUpdated}
                required
              ></input>
            </div>
            <div className="profile__input-container">
              <label className="profile__edit-form-label" htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="profile__edit-form-input"
                defaultValue={email}
                placeholder="Ваш e-mail..."
                onChange={handleChangeEmail}
                minLength={2}
                maxLength={30}
                disabled={isDisabled || !props.isUpdated}
                required
              ></input>
            </div>
          </form>
        </div>
        <div className="profile__buttons">
          <>
            {isSubmitButtonActive ? (
              <>
                <span className="profile__input-error">
                  {errorEmail || errorName}
                </span>
                <button
                  type="submit"
                  className="profile__submit-btn"
                  form="profile-form"
                  disabled={!isValid || isErr || !props.isUpdated}
                >
                  Сохранить
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="profile__edit-btn"
                  onClick={handleClick}
                >
                  Редактировать
                </button>
                <NavLink
                  to="/"
                  type="button"
                  className="profile__signout-btn"
                  onClick={handleSignOut}
                >
                  Выйти из аккаунта
                </NavLink>
              </>
            )}
          </>
        </div>
      </section>
    </main>
  );
}

export default Profile;
