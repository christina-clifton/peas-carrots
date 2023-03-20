//stylesheet
import './SearchBar.css';

//dependencies
import React, {useState, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';

//utility functions
import { useClickOutsideElement } from '../../util/UtilityFunctions';

//assets
import magnifyingGlass from '../../assets/magnifying_glass_icon.png';


const SearchBar = (props) => {
    const navigate = useNavigate();
    const [value, setValue] = useState('');

    const wrapperRef = useRef(null);
    useClickOutsideElement(wrapperRef, props.toggle, 'close-icon');

    const handleInput = (e) => {
        const searchTerm = value;

        if(e.keyCode === 13) {
            navigate("/search-results", {state: searchTerm});
            setValue('');
        }
    }

    return (
        <div ref={wrapperRef} className='search'>
            <div className='searchbar'>
                <input
                    aria-label="search recipes"
                    placeholder="search your recipes"
                    type="text"
                    value={value}
                    name="q"
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleInput}
                />
                <Link
                    to='/search-results'
                    state={value}
                >
                    <button type="submit">
                        <img 
                            className="search-icon" 
                            alt="submit" 
                            src={magnifyingGlass}
                        />
                    </button>
                </Link>
            </div>
      </div>
    )
}

export default SearchBar;