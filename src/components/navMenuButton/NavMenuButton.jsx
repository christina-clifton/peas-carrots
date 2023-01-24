import React from 'react';
import './NavMenuButton.css'

const NavMenuButton = (props) => {
    const {isToggled, toggle} = props;

    const className = isToggled ? 'open' : '';

    return (
        <button id="nav-toggle-icon" className={className} onClick={toggle}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
}

export default NavMenuButton;