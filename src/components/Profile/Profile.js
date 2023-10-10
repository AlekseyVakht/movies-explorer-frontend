import { React, useState } from 'react';
import './Profile.css';
import { NavLink } from 'react-router-dom';

function Profile(){
    const [isDisabled, setDisabled] = useState(true);
    const [isSubmitButtonActive, setSubmitButtonActive] = useState(false);

    const initialValues = { name: 'Виталий', email: 'pochta@yandex.ru' };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    // const profileSubmitBtnClassName = (`profile__submit-btn ${ isSubmitted ? 'profile__submit-btn_inactive' : ''}`);

    function handleClick(){
        setSubmitButtonActive(true);
        setDisabled(false);
    }

    function handleChange(e){
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    function handleSubmit(e){
        e.preventDefault();
        setFormErrors(validate(formValues));
    }

    const validate = (values) => {
        const errors = {};
        if (!values.name || !values.email) {
            errors.profile = 'При обновлении профиля произошла ошибка.';
        }

        return errors;
    }

    return(
        <section className="profile">
            <div className="profile__align-container">
                <h1 className="profile__name">Привет, {initialValues.name}!</h1>
                    <form className="profile__edit-form" id="profile-form" name="profile-form" onSubmit={handleSubmit} noValidate>
                        <div className="profile__input-container">
                            <label className="profile__edit-form-label" htmlFor="name">Имя</label>
                            <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            className="profile__edit-form-input" 
                            value={formValues.name} 
                            placeholder='Ваше имя...' 
                            onChange={handleChange}
                            minLength={2} 
                            maxLength={30}
                            disabled={isDisabled}
                            required
                            ></input>
                        </div>
                        <div className="profile__input-container">
                            <label className="profile__edit-form-label" htmlFor="email">E-mail</label>
                            <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="profile__edit-form-input" 
                            value={formValues.email} 
                            placeholder='Ваш e-mail...' 
                            onChange={handleChange}
                            minLength={2} 
                            maxLength={30}
                            disabled={isDisabled}
                            required
                            ></input>
                        </div>
                    </form>
            </div>
            <div className="profile__buttons">
                <>
                    { isSubmitButtonActive ?
                    <>
                        <span className="profile__input-error">{formErrors.profile}</span> 
                        <button type="submit" className='profile__submit-btn' form="profile-form">Сохранить</button>
                    </>
                    : 
                    <>
                        <button type="button" className="profile__edit-btn" onClick={handleClick}>Редактировать</button>
                        <NavLink to ="/" type="button" className="profile__signout-btn">Выйти из аккаунта</NavLink>
                    </>
                    }
                </>
            </div>
        </section>
    )
}

export default Profile;
