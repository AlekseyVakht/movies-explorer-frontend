import React from 'react';
import './Register.css';
import Form from '../Forms/Form';

function Register(){
    return (
        <Form
        header='Добро пожаловать!'
        text='Уже зарегистрированы?'
        link='Войти'
        path='/signin'
        btn='Зарегистрироваться'
        >
        <label className="form__label" for="name">Имя</label>
        <input type="text" id="name" name="name" className="form__input" required></input>

        <label className="form__label" for="email">E-mail</label>
        <input type="email" id="email" name="email" className="form__input" required></input>

        <label className="form__label" for="password">Пароль</label>
        <input type="password" id="password" name="password" className="form__input" required></input>
        </Form>
    )
}

export default Register;
