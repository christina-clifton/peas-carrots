import React, {useState, useEffect} from 'react'; 
import {useLocation} from 'react-router-dom';

import {getDatabase, ref, get, child} from 'firebase/database';
import {database} from '../../util/Constants';

import './SearchResults.css';
import RecipeTile from '../../components/recipeTile/RecipeTile';

const SearchResults = () => {
    const {state} = useLocation();
    const searchTerm = state;

    const [isLoading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState();

     useEffect(() => {
        let searchResultsList = [];
    
        const databaseRef = ref(getDatabase());
        get(child(databaseRef, database.recipes)).then((snapshot) => {
            if(snapshot.exists()) {
                const data = snapshot.val();
                if(data != null) {
                    for(const key of Object.keys(data)) {
                        const it = data[key];

                        const query = searchTerm.toLowerCase();
                        if(it.title.toLowerCase().includes(query)) {

                            let recipe = {
                                id: it.id,
                                title: it.title,
                                img: it.img,
                                description: it.description,
                                time: it.time,
                                ingredients: it.ingredients,
                                instructions: it.instructions
                            }

                            searchResultsList.push(recipe);
                        }
                    }
                }
                setSearchResults(searchResultsList);
                setLoading(false);
            }
        })  
    }, [searchTerm]);

    
    return (
        <div className='search-results'>
            <h2>SEARCH RESULTS for "{searchTerm}"</h2>
            {isLoading ? 
                <span>Loading...</span>
            :
            <ul>
                {searchResults.map(recipe => 
                    <li key={recipe.id}>
                        <RecipeTile 
                            img={recipe.img}
                            title={recipe.title}
                            description={recipe.description}
                            id={recipe.id}
                            time={recipe.time}
                            ingredients={recipe.ingredients}
                            instructions={recipe.instructions}
                        />
                    </li>
                )}
            </ul>
            }
        </div>
    )
}

export default SearchResults;