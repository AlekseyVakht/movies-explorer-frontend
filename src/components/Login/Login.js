import React from 'react';
import './Login.css';
import Form from '../Forms/Form';

function Login(){
    return(
        <Form
        header='Рады видеть!'
        text='Еще не зарегистрированы?'
        link='Регистрация'
        path='/signup'
        btn='Войти'
        >
        <label className="form__label" for="email">E-mail</label>
        <input type="email" id="email" name="email" className="form__input" required></input>

        <label className="form__label" for="password">Пароль</label>
        <input type="password" id="password" name="password" className="form__input" required></input>
        </Form>
    )
}

export default Login;
