import { React, useState } from 'react';
import './Register.css';
import Form from '../Forms/Form';

function Register(){
    const initialValues = { name: '', email: '', password: ''};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    function handleChange(e){
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    function onSubmit(e){
        e.preventDefault();
        setFormErrors(validate(formValues));
    }

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Необходимо ввести Ваше имя';
        }
        if (!values.email) {
            errors.email = 'Необходимо ввести email';
        }

        if (!values.password) {
            errors.password = 'Необходимо ввести пароль';
        } else if (values.password.length < 8) {
            errors.password = 'Пароль не может быть меньше 8 символов';
        } 

        return errors;
    }

    return (
        <Form
        header='Добро пожаловать!'
        text='Уже зарегистрированы?'
        link='Войти'
        path='/signin'
        btn='Зарегистрироваться'
        submit={onSubmit}
        >
        <div className="form__input-container">
            <label className="form__label" htmlFor="name">Имя</label>
            <input 
            type="text" 
            id="name" 
            name="name"
            value={formValues.name}
            className="form__input" 
            placeholder='Введите Ваше имя'
            minLength={2} 
            maxLength={30} 
            onChange={handleChange}
            required></input>
            <span className="form__input-error">{formErrors.name}</span>
        </div>

        <div className="form__input-container">
            <label className="form__label" htmlFor="email">E-mail</label>
            <input 
            type="email" 
            id="email" 
            name="email"
            value={formValues.email}
            className="form__input"
            placeholder='Введите email'
            onChange={handleChange}
            required></input>
            <span className="form__input-error">{formErrors.email}</span>
        </div>

        <div className="form__input-container form__input-container_margin-bottom_83px">
            <label className="form__label" htmlFor="password">Пароль</label>
            <input 
            type="password" 
            id="password" 
            name="password" 
            value={formValues.password}
            className="form__input"
            placeholder='Введите пароль'
            autoComplete='off'
            minLength={8} 
            maxLength={20}
            onChange={handleChange}
            required
            ></input>
            <span className="form__input-error">{formErrors.password}</span>
        </div>

        </Form>
    )
}

export default Register;
