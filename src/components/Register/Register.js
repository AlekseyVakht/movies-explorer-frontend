import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Form from "../Forms/Form";
import * as Auth from "../../utils/Auth";

function Register(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.loggedIn) {
        navigate('/movies');
    }
}, [props.loggedIn, navigate]);

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorName, setErrorName] = useState('');

  function handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setFormValue({ ...formValue, [name]: value });
    setFormErrors({ ...formErrors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    Auth.register(formValue.name, formValue.email, formValue.password)
      .then(() => {
        setIsDisabled(true);
        Auth.authorize(formValue.email, formValue.password)
        .then((res) => {
          if (res.token) {
            props.handleLogin();
            navigate("/movies", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err)}
          );
      })
      .catch((err) => {
        console.log(err)
        if (err === 'Ошибка 409'){
          setErrorName('Пользователь с таким email уже зарегистрирован. Попробуйте другой email.');
        } else if (err === 'Ошибка 400') {
          setErrorName('Проверьте правильность введенных данных');
        }
      })
  };

  return (
    <Form
      header="Добро пожаловать!"
      text="Уже зарегистрированы?"
      link="Войти"
      path="/signin"
      btn="Зарегистрироваться"
      submit={handleSubmit}
      valid={isValid}
      isDisabled={isDisabled}
      message={errorName}
    >
      <div className="form__input-container">
        <label className="form__label" htmlFor="name">
          Имя
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValue.name || ""}
          className="form__input"
          placeholder="Введите Ваше имя"
          minLength={2}
          maxLength={30}
          onChange={handleChange}
          disabled={isDisabled}
          required
        ></input>
        <span className="form__input-error">{formErrors.name}</span>
      </div>

      <div className="form__input-container">
        <label className="form__label" htmlFor="email">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValue.email || ""}
          className="form__input"
          placeholder="Введите email"
          onChange={handleChange}
          disabled={isDisabled}
          required
        ></input>
        <span className="form__input-error">{formErrors.email}</span>
      </div>

      <div className="form__input-container form__input-container_margin-bottom_83px">
        <label className="form__label" htmlFor="password">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formValue.password || ""}
          className="form__input"
          placeholder="Введите пароль"
          autoComplete="off"
          minLength={8}
          maxLength={20}
          onChange={handleChange}
          disabled={isDisabled}
          required
        ></input>
        <span className="form__input-error">{formErrors.password}</span>
      </div>
    </Form>
  );
}

export default Register;
