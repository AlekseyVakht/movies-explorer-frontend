import React from 'react';
import './Info.css';

function Info(props) {
    const popupClass = `popup ${props.isOpen ? 'popup_opened' : ''}`
    return (
        <div id='popup-infotooltip' className={popupClass}>
            <div className="popup__container">
                <button type="button" className="popup__close-icon" onClick={props.onClose}></button>
                <h3 className="popup__infotooltip-heading">{props.text}</h3>
            </div>
        </div>
    );
}

export default Info;
