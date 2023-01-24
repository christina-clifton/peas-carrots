import { 
    Outlet,
} from "react-router-dom";
import './App.css';
import React, {useState} from 'react';
import {initializeApp} from 'firebase/app';
import firebaseConfig from '../util/firebase';

import NavBar from '../components/navBar/NavBar';
import SearchBar from '../components/searchBar/SearchBar';
import NavMenuButton from '../components/navMenuButton/NavMenuButton';

const App = () => {
    initializeApp(firebaseConfig);
    const [navbarToggled, setNavbarToggle] = useState(false);

    const navbarToggle = () => {
        setNavbarToggle(!navbarToggled);
    }

    return (
        <div className={navbarToggled ? 'app nav-open' : 'app'}>
            <div className='app-header'>
                <div className='header-item-container' id='app-title'>
                        <h1>peas <span>+</span> carrots</h1>
                    </div>
                <div className='header-item-container' id='app-searchbar'>
                    <SearchBar />
                </div>
                <div className='header-item-container' id='app-navbar-toggle'>
                    <NavMenuButton 
                        isToggled={navbarToggled}
                        toggle={navbarToggle}
                    />
                </div>
                {navbarToggled && 
                <div  className='header-item-container' id='app-navbar-primary'>
                    <NavBar />
                </div>}
            </div>
            <div className='app-main'>
                <Outlet />    
            </div>
            <div className='app-footer'>
                <p>peas and carrots &copy;</p>
            </div> 
        </div>
    )
}

export default App;