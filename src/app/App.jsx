//stylesheet
import './App.css';

//dependencies
import { Outlet } from "react-router-dom";
import React, { useState } from 'react';

//database
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../util/Firebase';

//components
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
            <header className='app-header'>
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
                    <div aria-hidden={!searchbarToggled} className='header-item-container' id='app-searchbar-primary'>
                        <SearchBar 
                            toggle={searchbarToggle}
                        />
                    </div>
                }
                {navbarToggled && 
                    <div  aria-hidden={!navbarToggled} className='header-item-container' id='app-navbar-primary'>
                        <NavBar 
                            toggle={navbarToggle}
                        />
                    </div>
                }
            </header>
            <main>
                <Outlet />    
            </main>
        </div>
    )
}

export default App;