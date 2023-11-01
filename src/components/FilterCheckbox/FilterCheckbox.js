import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({handleToggle, isToggleActive}){
    return(
        <div className="filter-checkbox">
            <hr className="filter-checkbox__stroke"/>
            <label className="filter-checkbox__container">
                <input type="checkbox" className="filter-checkbox__input" name="checkbox" id="checkbox" onClick={handleToggle} />
                <span className={`filter-checkbox__switch ${isToggleActive && 'filter-checkbox__switch-on'}`}></span>
                <p className="filter-checkbox__label">Короткометражки</p>
            </label>
        </div>    
    )
}

export default FilterCheckbox;
