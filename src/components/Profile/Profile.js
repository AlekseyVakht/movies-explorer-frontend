import React from 'react';
import './Profile.css';

function Profile(){
    return(
        <section className="profile">
            <h1 className="profile__name">Привет, Виталий!</h1>
            <form className="profile__edit-form">
                    <div className="profile__input-container">
                        <p className="profile__edit-form-label">Имя</p>
                        <input type="text" id="name" name="name" className="profile__edit-form-input" value="Виталий"></input>
                    </div>
                    <div className="profile__input-container">
                        <p className="profile__edit-form-label">E-mail</p>
                        <input type="email" id="email" name="email" className="profile__edit-form-input profile__edit-form-input_no-border" value="pochta@yandex.ru"></input>   
                    </div>
                    <button type="button" className="profile__submit-btn">Редактировать</button>
            </form>
            <button type="button" className="profile__signout-btn">Выйти из аккаунта</button>
        </section>
    )
}

export default Profile;
