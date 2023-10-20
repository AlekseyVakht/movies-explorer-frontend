import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Form from "../Forms/Form";
import * as Auth from "../../utils/Auth";
import { EMAIL_REGEX, NAME_REGEX } from "../../utils/constants";

function Register(props) {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorName, setErrorName] = useState("");
  const [registerError, setRegisterError] = useState('');


  useEffect(() => {
    if (props.loggedIn) {
      navigate("/movies");
    }
  }, [props.loggedIn, navigate]);

  useEffect(() => {
    if (
      errorEmail ||
      errorPassword ||
      errorName ||
      !email ||
      !password ||
      !name
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errorEmail, errorPassword, errorName, email, password, name]);

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
    Auth.register(name, email, password)
      .then(() => {
        Auth.authorize(email, password)
          .then((res) => {
            if (res.token) {
              props.handleLogin();
              navigate("/movies", { replace: true });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка 409") {
          setRegisterError(
            "Пользователь с таким email уже зарегистрирован. Попробуйте другой email."
          );
        } else if (err === "Ошибка 400") {
          setRegisterError("Проверьте правильность введенных данных");
        }
      })
      .finally(() => setIsSubmitting(false));
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
      isSubmitting={isSubmitting}
      message={registerError}
    >
      <div className="form__input-container">
        <label className="form__label" htmlFor="name">
          Имя
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name || ""}
          className="form__input"
          placeholder="Введите Ваше имя"
          minLength={2}
          maxLength={30}
          onChange={handleChangeName}
          disabled={isSubmitting}
          required
        ></input>
        <span className="form__input-error">{errorName}</span>
      </div>

      <div className="form__input-container">
        <label className="form__label" htmlFor="email">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email || ""}
          className="form__input"
          placeholder="Введите email"
          onChange={handleChangeEmail}
          disabled={isSubmitting}
          required
        ></input>
        <span className="form__input-error">{errorEmail}</span>
      </div>

      <div className="form__input-container form__input-container_margin-bottom_83px">
        <label className="form__label" htmlFor="password">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password || ""}
          className="form__input"
          placeholder="Введите пароль"
          autoComplete="off"
          minLength={8}
          maxLength={20}
          onChange={handleChangePassword}
          disabled={isSubmitting}
          required
        ></input>
        <span className="form__input-error">{errorPassword}</span>
      </div>
    </Form>
  );
}

export default Register;
