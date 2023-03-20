//stylesheet
import './SearchResults.css';

//dependencies
import React, {useState, useEffect} from 'react'; 
import {useLocation} from 'react-router-dom';

//database
import {getDatabase, ref, get, child} from 'firebase/database';

//constants
import {database} from '../../util/Constants';

//components
import RecipeTile from '../../components/recipeTile/RecipeTile';

const SearchResults = () => {
    const {state} = useLocation();
    const searchTerm = state;

    const [isLoading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState();

     useEffect(() => {
        let searchResultsList = [];
    
        const databaseRef = ref(getDatabase());
        get(child(databaseRef, database.allRecipesKey)).then((snapshot) => {
            if(snapshot.exists()) {
                const data = snapshot.val();
                if(data != null) {
                    for(const key of Object.keys(data)) {
                        const it = data[key];

                        const query = searchTerm.toLowerCase();
                        if(it.title.toLowerCase().includes(query)) {

                            let recipe = {
                                userRecipeId: it.userRecipeId,
                                userId: it.userId,
                                allRecipesId: it.allRecipesId,
                                isPublic: it.isPublic,
                                title: it.title,
                                img: it.img,
                                description: it.description,
                                time: it.time,
                                ingredients: it.ingredients,
                                instructions: it.instructions,
                                notes: it.notes
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
                            userRecipeId={recipe.userRecipeId}
                            userId={recipe.userId}
                            allRecipesId={recipe.allRecipesId}
                            isPublic={recipe.isPublic} 
                            title={recipe.title}
                            img={recipe.img}
                            description={recipe.description}
                            time={recipe.time}
                            ingredients={recipe.ingredients}
                            instructions={recipe.instructions}
                            notes={recipe.notes}
                        />
                    </li>
                )}
            </ul>
            }
        </div>
    )
}

export default SearchResults;