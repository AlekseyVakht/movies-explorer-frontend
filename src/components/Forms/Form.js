import { React } from 'react';
import { NavLink } from 'react-router-dom';
import './Form.css';

function Form(props){
    const formFooterClassName = (`${props.isLoginForm ? 'form__footer-login' : 'form__footer'}`);

    return(
        <main>
            <section className="form">
                <div className="form__align-container">
                    <div className="form__heading">
                        <NavLink to ="/" className="form__logo"></NavLink>
                        <h1 className="form__header">{props.header}</h1>
                    </div>
                    <form className="form__container" id="form" name="form" noValidate onSubmit={props.submit}>
                        {props.children}
                    </form>
                </div>    
                <div className={formFooterClassName}>
                    <span className="form__input-error">{props.message}</span>
                    <button type="submit" className="form__submit-btn" form="form" disabled={!props.valid || props.isSubmitting}>{props.btn}</button>
                    <div className="form__footer-link-container">
                        <p className="form__text">{props.text}</p>
                        <NavLink to={props.path} className="form__link">{props.link}</NavLink>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Form;
