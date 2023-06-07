//stylesheet
import './NavToggleButton.css';

//dependencies
import React from 'react';

const NavToggleButton = (props) => {
    const {isToggled, toggle} = props;
    const className = isToggled ? 'open' : '';

    return (
        <div className='navbar-toggle-container'>
            <button id="navbar-toggle-icon" className={className} aria-expanded={isToggled} onClick={toggle} alt='navigation menu toggle'>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        
    );
}

export default NavToggleButton;