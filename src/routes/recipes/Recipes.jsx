import React, {useState, useEffect} from 'react'; 
import {getDatabase, ref, get, child} from 'firebase/database';
import {database} from '../../util/constants';
import {Link} from 'react-router-dom';

import './Recipes.css';
import RecipeTile from '../../components/recipeTile/RecipeTile';
import {initializeApp} from 'firebase/app';
import firebaseConfig from '../../util/firebase';

const Recipes = () => {
    initializeApp(firebaseConfig);

    const [isLoading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes();
    }, []);

    const getRecipes = async () => {
        let recipesList = [];
        
        try {
            const databaseRef = ref(getDatabase());
            get(child(databaseRef, database.recipes)).then((snapshot) => {    
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    if (data != null) {
                        for (const key of Object.keys(data)) {
                            const it = data[key];

                            let recipe = {
                                id: it.id,
                                title: it.title,
                                img: it.img,
                                description: it.description,
                                time: it.time,
                                ingredients: it.ingredients,
                                instructions: it.instructions
                            }
                            recipesList.push(recipe);
                        }
                    }
                    setRecipes(recipesList);
                }
            }).catch((error) => {
                console.error(error);
            });
            setLoading(false);
        } catch (e) {
            console.log(e);
            setRecipes(recipesList);
            setLoading(false);
        }
    }         

    return (
        <div className='all-recipes'>
            <h2>RECIPES</h2>
            <Link 
                to='/addRecipe'
            >
                <button id='add-recipe'>+ New Recipe</button>
            </Link>
            <ul>
                {!isLoading && recipes.map(recipe => 
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
        </div>
    )
}

export default Recipes;