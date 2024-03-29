//stylesheet
import './searchbarToggleButton.css';

//dependencies
import React from 'react';

//assets
import searchIcon from '../../assets/magnifying_glass_icon.png';
import deleteIcon from '../../assets/delete-black.png';

const SearchbarToggleButton = (props) => {
    const {isToggled, toggle} = props;

    return (
        <div className="searchbar-toggle-button" aria-expanded={isToggled}>
            {isToggled ? 
                <img 
                    src={deleteIcon} 
                    alt=''
                    id='close-icon'
                    onClick={toggle}
                />
            :
                <img 
                    src={searchIcon} 
                    alt='' 
                    id='search-icon'
                    onClick={toggle} 
                />
            }
        </div>
    )
}

export default SearchbarToggleButton;