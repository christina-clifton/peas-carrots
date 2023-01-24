import { Form } from 'react-router-dom';
import React, {useState} from 'react';
import './SearchBar.css';
import magnifyingGlass from '../../assets/magnifying_glass_icon - gray.png';


const SearchBar = () => {
    const [value, setValue] = useState('');

    return (
        <div className='search'>
            <Form method="get" action="/recipes" className='searchbar'>
                <input
                    aria-label="search recipes"
                    placeholder="search your recipes"
                    type="text"
                    value={value}
                    name="q"
                    onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit">
                    <img 
                        className="search-icon" 
                        alt="submit" 
                        src={magnifyingGlass}
                    />
                </button>
            </Form>
      </div>
    )
}

export default SearchBar;