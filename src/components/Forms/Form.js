import { React } from 'react';
import { NavLink } from 'react-router-dom';
import './Form.css';

function Form(props){
    return(
        <section className="form">
            <div className="form__logo"></div>
            <h1 className="form__header">{props.header}</h1>
            <form className="form__container">
                {props.children}
                <button type="submit" className="register__submit-btn">{props.btn}</button>
            </form>
            <div className="form__footer">
                <p className="form__text">{props.text}</p>
                <NavLink to={props.path} className="form__link">{props.link}</NavLink>
            </div>
    </section>
    )
}

export default Form;
