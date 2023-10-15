import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Form from "../Forms/Form";
import * as Auth from "../../utils/Auth";

function Register() {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Auth.register(formValue.name, formValue.email, formValue.password)
      .then((res) => {
        navigate("/signin", { replace: true });
        if (res.error) {
          //   props.handleInfoTooltipOpen({
          //     text: "Что-то пошло не так! Попробуйте ещё раз.",
          //     img: registerFailed,
          //   });
          navigate("/signup", { replace: true });
          formValue.name = "";
          formValue.email = "";
          formValue.password = "";
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form
      header="Добро пожаловать!"
      text="Уже зарегистрированы?"
      link="Войти"
      path="/signin"
      btn="Зарегистрироваться"
      submit={handleSubmit}
    >
      <div className="form__input-container">
        <label className="form__label" htmlFor="name">
          Имя
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValue.name || ''}
          className="form__input"
          placeholder="Введите Ваше имя"
          minLength={2}
          maxLength={30}
          onChange={handleChange}
          required
        ></input>
        {/* <span className="form__input-error">{formErrors.name}</span> */}
      </div>

      <div className="form__input-container">
        <label className="form__label" htmlFor="email">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValue.email || ''}
          className="form__input"
          placeholder="Введите email"
          onChange={handleChange}
          required
        ></input>
        {/* <span className="form__input-error">{formErrors.email}</span> */}
      </div>

      <div className="form__input-container form__input-container_margin-bottom_83px">
        <label className="form__label" htmlFor="password">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formValue.password || ''}
          className="form__input"
          placeholder="Введите пароль"
          autoComplete="off"
          minLength={8}
          maxLength={20} 
          onChange={handleChange}
          required
        ></input>
        {/* <span className="form__input-error">{formErrors.password}</span> */}
      </div>
    </Form>
  );
}

export default Register;
