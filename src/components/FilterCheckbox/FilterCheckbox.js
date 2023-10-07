import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(){
    return(
        <div className="filter-checkbox">
            <label>
                <input type="checkbox" className="filter-checkbox__input"/>
                <span className="filter-checkbox__switch"></span>
            </label>
            <p className="filter-checkbox__text">Короткометражки</p>
        </div>    
    )
}

export default FilterCheckbox;
