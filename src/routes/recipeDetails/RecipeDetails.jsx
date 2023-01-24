import './RecipeDetails.css';
import {useLocation} from 'react-router-dom';

import RecipeTime from '../../components/recipeTime/RecipeTime';

const RecipeDetails = () => {
    const {state} = useLocation();

    return (
        <div className='recipe-details'>
          <h2>{state.name}</h2>
          <img id="recipe-img" src={state.img} alt={state.name}/>
          <p>{state.description}</p>
          <RecipeTime 
            prepTime={state.time.prepTime}
            cookTime={state.time.cookTime}
          />

          <div className="recipe-container" id="ingredients-container">
            <h3 className="recipe-header" id="ingredients-header">Ingredients</h3>
            <ul className="recipe-list" id="ingredients-list"> 
              {state.ingredients.map(ingredient => 
                <li classname="recipe-list-item" id="ingredient">{ingredient}</li>
              )}
            </ul>
          </div>

          <div className="recipe-container" id="instructions-container">
            <h3 className="recipe-header" id="instructions-header">Instructions</h3>
            <ol className="recipe-list" id="instructions-list"> 
              {state.instructions.map(instruction => 
                <li classname="recipe-list-item" id="instruction">{instruction}</li>
              )}
            </ol>
          </div>
        </div>
    )
}

export default RecipeDetails;