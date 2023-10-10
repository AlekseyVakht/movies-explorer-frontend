import { React, useState } from 'react';
import './Login.css';
import Form from '../Forms/Form';

function Login(){
    const initialValues = { email: '', password: ''};
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
        if (!values.email) {
            errors.email = 'Необходимо ввести email';
        }
        if (!values.password) {
            errors.password = 'Необходимо ввести пароль';
        }
        return errors;
    }

    return(
        <Form
        header='Рады видеть!'
        text='Еще не зарегистрированы?'
        link='Регистрация'
        path='/signup'
        btn='Войти'
        isLoginForm={true}
        submit={onSubmit}
        >
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

        <div className="form__input-container form__input-container_margin-bottom_42px">
            <label className="form__label" htmlFor="password">Пароль</label>
            <input 
            type="password" 
            id="password" 
            name="password"
            value={formValues.password}
            className="form__input"
            placeholder='Введите пароль'
            autoComplete='off'
            onChange={handleChange}
            required></input>
            <span className="form__input-error">{formErrors.password}</span>
        </div>
        </Form>
    )
}

export default Login;
