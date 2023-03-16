//stylesheet
import './NavBar.css';

//dependencies
import React, {useRef} from 'react';
import { NavLink } from "react-router-dom";

//context
import { useAuth } from '../../util/auth';

//utility functions
import { useClickOutsideElement } from '../../util/UtilityFunctions';

const NavBar = (props) => {
    const auth = useAuth();
    const wrapperRef = useRef(null);
    const toggle = props.toggle;

    useClickOutsideElement(wrapperRef, toggle, 'navbar-toggle-icon');

    return (
        <nav ref={wrapperRef} className='navbar'>
            <NavLink to='/all-recipes' className='link'>ALL RECIPES</NavLink>
            {auth.user && 
                <NavLink to={`/users/${auth.user}/recipes`} className='link'>MY RECIPES</NavLink>
            }
            {auth.user && 
                <NavLink to={`/users/${auth.user}/add-recipe`} className='link'>NEW RECIPE</NavLink>
            }
            {auth.user && 
                <p className='link' onClick={auth.signOut}>SIGN OUT</p>
            }
            {!auth.user && 
                <NavLink to="/sign-in" className='link'>SIGN IN</NavLink>
            }
            {/* <NavLink to='weeklyPlanner' className='link'>WEEKLY PLANNER</NavLink>
            <NavLink to='shoppingList' className='link'>SHOPPING LIST</NavLink> */}
        </nav>
    )
}

export default NavBar;