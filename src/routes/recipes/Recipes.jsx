import React, {useState, useEffect} from 'react'; 
import {getDatabase, ref, get, child} from 'firebase/database';
import {database} from '../../util/constants';

import './Recipes.css';
import RecipeTile from '../../components/recipeTile/RecipeTile';
import {initializeApp} from 'firebase/app';
import firebaseConfig from '../../util/firebase';

// export async function loader({ request }) {
//     const url = new URL(request.url);
//     const q = url.searchParams.get("q");
//     const recipes = await getRecipes();
//     console.log(recipes);
//     return { recipes };
// }

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

                            console.log(it);

                            let item = {
                                id: it.id,
                                name: it.name,
                                image: it.image,
                                description: it.description,
                                time: it.time,
                                ingredients: it.ingredients,
                                instructions: it.instructions
                            }
                            recipesList.push(item);
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
            <h2>Recipes</h2>
            <ul>
                {!isLoading && recipes.map(recipe => 
                    <li key={recipe.id}>
                        <RecipeTile 
                            img={recipe.image}
                            name={recipe.name}
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