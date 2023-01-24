import { NavLink } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className='navbar'>
            <NavLink to='recipes' className='link'>Recipes</NavLink>
            <NavLink to='weeklyPlanner' className='link'>Weekly Planner</NavLink>
            <NavLink to='shoppingList' className='link'>Shopping List</NavLink>
        </nav>
    )
}

export default NavBar;