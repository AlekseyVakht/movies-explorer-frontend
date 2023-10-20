import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Form from "../Forms/Form";
import * as Auth from "../../utils/Auth";
import { EMAIL_REGEX } from "../../utils/constants";

function Login(props) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (props.loggedIn) {
      navigate("/movies");
    }
  }, [props.loggedIn, navigate]);

  useEffect(() => {
    if (errorEmail || errorPassword || !email || !password) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errorEmail, errorPassword, email, password]);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    if (EMAIL_REGEX.test(String(e.target.value).toLowerCase())) {
      setErrorEmail("");
    } else {
      setErrorEmail("Неправильный формат email.");
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    if (e.target.value.length > 2 && e.target.value.length < 10) {
      setErrorPassword("");
    } else {
      setErrorPassword("Пароль должен быть от 2 до 10 символов");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    Auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          props.handleLogin();
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка 400") {
          setLoginError("Проверьте правильность введенных данных");
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Form
      header="Рады видеть!"
      text="Еще не зарегистрированы?"
      link="Регистрация"
      path="/signup"
      btn="Войти"
      isLoginForm={true}
      valid={isValid}
      submit={handleSubmit}
      isSubmitting={isSubmitting}
      message={loginError}
    >
      <div className="form__input-container">
        <label className="form__label" htmlFor="email">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          className="form__input"
          placeholder="Введите email"
          onChange={handleChangeEmail}
          disabled={isSubmitting}
          required
        ></input>
        <span className="form__input-error">{errorEmail}</span>
      </div>

      <div className="form__input-container form__input-container_margin-bottom_42px">
        <label className="form__label" htmlFor="password">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          className="form__input"
          placeholder="Введите пароль"
          autoComplete="off"
          onChange={handleChangePassword}
          disabled={isSubmitting}
          required
        ></input>
        <span className="form__input-error">{errorPassword}</span>
      </div>
    </Form>
  );
}

export default Login;
