import React from 'react';
import './NavToggleButton.css'

const NavToggleButton = (props) => {
    const {isToggled, toggle} = props;
    const className = isToggled ? 'open' : '';

    return (
        <button id="navbar-toggle-icon" className={className} onClick={toggle}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
}

export default NavToggleButton;