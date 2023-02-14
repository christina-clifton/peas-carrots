import { Form } from 'react-router-dom';
import React, {useState, useRef, useEffect} from 'react';
import './SearchBar.css';
import magnifyingGlass from '../../assets/magnifying_glass_icon.png';


const SearchBar = (props) => {
    const [value, setValue] = useState('');
    const wrapperRef = useRef(null);

    const useClickOutsideElement = () => {
        
        useEffect(() => {
            const handleClickOutside = (e) => {
                if(wrapperRef.current) {
                    console.log(e.target);
                    if(!wrapperRef.current.contains(e.target) && (e.target.id !== 'close-icon')) {
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
        <div ref={wrapperRef} className='search'>
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