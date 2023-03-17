//stylesheet
import './RecipeTile.css';

//dependencies
import {Link} from 'react-router-dom';

const RecipeTile = (props) => {
    const recipe = {
        userRecipeId: props.userRecipeId,
        userId: props.userId,
        allRecipesId: props.allRecipesId,
        isPublic: props.isPublic,
        title: props.title,
        img: props.img,
        description: props.description,
        time: props.time,
        ingredients: props.ingredients,
        instructions: props.instructions,
        notes: props.notes
    }

    return (
        <div className='recipe-tile'>
            <Link
                to={`/all-recipes/${recipe.allRecipesId}`}
                className='link'
                id='recipe-tile-content'
                state={{recipe}}
            >   
                <div className='img-container'>
                    <img className="recipe-img" src={recipe.img} alt={recipe.title}/>
                </div>
                <h3>{recipe.title}</h3>
            </Link>
        </div>
    )
}

export default RecipeTile;