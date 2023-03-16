//stylesheet
import './AllRecipes.css';

//dependencies
import React, { useState, useEffect } from 'react'; 

//database
import { getDatabase, ref, get, child } from 'firebase/database';

//constants
import { database } from '../../util/Constants';

//components
import RecipeTile from '../../components/recipeTile/RecipeTile';

const AllRecipes = () => {
    const [isLoading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState();

    useEffect(() => {
        let recipesList = [];
    
        const databaseRef = ref(getDatabase());
        get(child(databaseRef, database.allRecipesKey)).then((snapshot) => {
            if(snapshot.exists()) {
                const data = snapshot.val();
                if(data != null) {
                    for(const key of Object.keys(data)) {
                        const it = data[key];
    
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
                        recipesList.push(recipe);
                    }
                }
            } 
            setLoading(false);
            return setRecipes(recipesList);

        })
    }, []);

    return (
        <div className='all-recipes'>
            <h2>ALL RECIPES</h2>
            <ul>
                {!isLoading && recipes.map(recipe => 
                    <li key={recipe.allRecipesId}>
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
        </div>
    )
}

export default AllRecipes;