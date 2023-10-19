import { React, useState, useContext, useEffect } from "react";
import "./Profile.css";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [isDisabled, setDisabled] = useState(true);
  const [isSubmitButtonActive, setSubmitButtonActive] = useState(false);

  const [formValue, setFormValue] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setFormValue({name: currentUser.name, email: currentUser.email})
  }, [currentUser])

  function handleClick() {
    setSubmitButtonActive(true);
    setDisabled(false);
  }

  function handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setFormValue({ ...formValue, [name]: value });
    setFormErrors({ ...formErrors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  }


  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: formValue.name,
      email: formValue.email,
    });
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
                defaultValue={formValue.name || ''}
                placeholder="Ваше имя..."
                onChange={handleChange}
                minLength={2}
                maxLength={30}
                disabled={isDisabled}
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
                defaultValue={formValue.email || ''}
                placeholder="Ваш e-mail..."
                onChange={handleChange}
                minLength={2}
                maxLength={30}
                disabled={isDisabled}
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
                  {formErrors.name || formErrors.email}
                </span>
                <button
                  type="submit"
                  className="profile__submit-btn"
                  form="profile-form"
                  disabled={!isValid}
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
