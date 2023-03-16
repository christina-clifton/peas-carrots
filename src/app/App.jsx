import { 
    Outlet,
} from "react-router-dom";
import './App.css';
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../util/Firebase';

import NavBar from '../components/navBar/NavBar';
import SearchBar from '../components/searchBar/SearchBar';
import NavToggleButton from '../components/navToggleButton/NavToggleButton';
import SearchbarToggleButton from "../components/searchbarToggleButton/searchbarToggleButton";

const App = () => {
    initializeApp(firebaseConfig);
    const [navbarToggled, setNavbarToggle] = useState(false);
    const [searchbarToggled, setSearchbarToggle] = useState(false);

    const navbarToggle = () => {
        if(searchbarToggled && !navbarToggled) {
            setSearchbarToggle(!searchbarToggled);
        }
        setNavbarToggle(!navbarToggled);
    }

    const searchbarToggle = () => {
        if(navbarToggled && !searchbarToggled) {
            setSearchbarToggle(!navbarToggled);
        }
        setSearchbarToggle(!searchbarToggled);
    }

    const getAppClassName = () => {
        let className = 'app';
        if(navbarToggled) className += ' nav-open';
        if(searchbarToggled) className += ' search-open';
        return className;
    }
    
    return (
        <div className={getAppClassName()}>
            <div className='app-header'>
                <div className='header-item-container' id='app-navbar-toggle'>
                    <NavToggleButton 
                        isToggled={navbarToggled}
                        toggle={navbarToggle}
                    />
                </div>
                <div className='header-item-container' id='app-title'>
                    <h1>Peas <span>+</span> Carrots</h1>
                </div>
                <div className='header-item-container' id='app-searchbar-toggle'>
                    <SearchbarToggleButton
                        isToggled={searchbarToggled}
                        toggle={searchbarToggle}
                    />
                </div>
                {searchbarToggled && 
                    <div className='header-item-container' id='app-searchbar-primary'>
                        <SearchBar 
                            toggle={searchbarToggle}
                        />
                    </div>
                }
                {navbarToggled && 
                    <div  className='header-item-container' id='app-navbar-primary'>
                        <NavBar 
                            toggle={navbarToggle}
                        />
                    </div>
                }
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