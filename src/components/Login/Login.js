import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Form from "../Forms/Form";
import * as Auth from "../../utils/Auth";

function Login(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    Auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({ email: "", password: "" });
          props.handleLogin();
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form
      header="Рады видеть!"
      text="Еще не зарегистрированы?"
      link="Регистрация"
      path="/signup"
      btn="Войти"
      isLoginForm={true}
      submit={handleSubmit}
    >
      <div className="form__input-container">
        <label className="form__label" htmlFor="email">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValue.email}
          className="form__input"
          placeholder="Введите email"
          onChange={handleChange}
          required
        ></input>
        {/* <span className="form__input-error">{formErrors.email}</span> */}
      </div>

      <div className="form__input-container form__input-container_margin-bottom_42px">
        <label className="form__label" htmlFor="password">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formValue.password}
          className="form__input"
          placeholder="Введите пароль"
          autoComplete="off"
          onChange={handleChange}
          required
        ></input>
        {/* <span className="form__input-error">{formErrors.password}</span> */}
      </div>
    </Form>
  );
}

export default Login;
