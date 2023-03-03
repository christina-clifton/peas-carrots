import React, {useRef} from 'react';
import { NavLink } from "react-router-dom";
import './NavBar.css';
import { useClickOutsideElement } from '../../util/utilityFunctions';

const NavBar = (props) => {
    const wrapperRef = useRef(null);
    const toggle = props.toggle;

    useClickOutsideElement(wrapperRef, toggle, 'navbar-toggle-icon');

    return (
        <nav ref={wrapperRef} className='navbar'>
            <NavLink to='/' className='link'>ALL RECIPES</NavLink>
            <NavLink to="/addRecipe" className='link'>NEW RECIPE</NavLink>
            {/* <NavLink to='weeklyPlanner' className='link'>WEEKLY PLANNER</NavLink>
            <NavLink to='shoppingList' className='link'>SHOPPING LIST</NavLink> */}
        </nav>
    )
}

export default NavBar;