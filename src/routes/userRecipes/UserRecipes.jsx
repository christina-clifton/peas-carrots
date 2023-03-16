//stylesheet
import './UserRecipes.css';

//dependencies
import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';

//database
import { getDatabase, ref, get, child } from 'firebase/database';

//context
import { useAuth } from '../../util/auth';

//constants
import { database } from '../../util/Constants';

//components
import UserRecipeTile from '../../components/userRecipeTile/UserRecipeTile';

const UserRecipes = () => {
    const localAuth = useAuth();
    const navigate = useNavigate();
    const userId = localAuth.user;
    
    useEffect(() => {
        if(!userId) navigate('/all-recipes');
    }, [userId, navigate])

    const [isLoading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState();

    useEffect(() => {
        let recipesList = [];
    
        const databaseRef = ref(getDatabase());
        const userPath = database.usersKey + userId + database.userRecipesKey;
        get(child(databaseRef, userPath)).then((snapshot) => {
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
    }, [userId]);        

    return (
        <div className='user-recipes'>
            <h2>MY RECIPES</h2>
            <Link 
                to={`/users/${userId}/add-recipe`}
                state={userId}
            >
                <button id='add-recipe'>+ New Recipe</button>
            </Link>
            <ul>
                {!isLoading && recipes.map(recipe => 
                    <li key={recipe.userRecipeId}>
                        <UserRecipeTile
                            userRecipeId={recipe.userRecipeId}
                            userId={userId}
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

export default UserRecipes;