import React, {useRef, useEffect} from 'react';
import { NavLink } from "react-router-dom";
import './NavBar.css';

const NavBar = (props) => {
    const wrapperRef = useRef(null);

    const useClickOutsideElement = () => {
        
        useEffect(() => {
            const handleClickOutside = (e) => {
                if(wrapperRef.current) {
                    if(!wrapperRef.current.contains(e.target) && (e.target.id !== 'navbar-toggle-icon')) {
                        props.toggle();
                    } 
                }
            }
    
            document.addEventListener("mousedown", handleClickOutside);   
            
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };     
        }, []);
    };

    useClickOutsideElement();

    return (
        <nav ref={wrapperRef} className='navbar'>
            <NavLink to='/' className='link'>ALL RECIPES</NavLink>
            {/* <NavLink to='weeklyPlanner' className='link'>WEEKLY PLANNER</NavLink>
            <NavLink to='shoppingList' className='link'>SHOPPING LIST</NavLink> */}
        </nav>
    )
}

export default NavBar;