import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(){
    return(
        <div className="filter-checkbox">
            <label className="filter-checkbox__label" htmlFor="checkbox">Короткометражки</label>
            <input type="checkbox" className="filter-checkbox__input" name="checkbox" id="checkbox"/>
            <span className="filter-checkbox__switch"></span>
        </div>    
    )
}

export default FilterCheckbox;
