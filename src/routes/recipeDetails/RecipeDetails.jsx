//stylesheet
import './RecipeDetails.css';

//dependencies
import { useLocation } from 'react-router-dom';

//components
import RecipeTime from '../../components/recipeTime/RecipeTime';

const RecipeDetails = () => {
  const {state} = useLocation();
  const recipe = state.recipe;

  return (
      <div className='recipe-details'>
        <div className="recipe-details-container" id='recipe-title'>
          <h2>{recipe.title}</h2>
        </div>

        <div className='recipe-details-container' id="recipe-img">
          <img src={recipe.img} alt=''/>
        </div>

        <div className='recipe-details-container' id='recipe-description'>
          <span>{recipe.description}</span>
        </div>

        <div className='recipe-details-container' id='recipe-time'>
          <RecipeTime 
            prepTime={recipe.time.prepTime}
            cookTime={recipe.time.cookTime}
          />
        </div>

        <div className="recipe-details-container" id="ingredients-container">
          <h3 className="recipe-header" id="ingredients-header">Ingredients</h3>
          <ul className="recipe-list" id="ingredients-list"> 
            {recipe.ingredients && recipe.ingredients.map((ingredient, i) => 
              <li 
                className="recipe-list-item" 
                id="ingredient"
                key={i}
              >
                {ingredient}
              </li>
            )}
          </ul>
        </div>

        <div className="recipe-details-container" id="instructions-container">
          <h3 className="recipe-header" id="instructions-header">Instructions</h3>
          <ol className="recipe-list" id="instructions-list"> 
            {recipe.instructions && recipe.instructions.map((instruction, i) => 
              <li 
                className="recipe-list-item" 
                id="instruction"
                key={i}
              >
                {instruction}
              </li>
            )}
          </ol>
        </div>

        {recipe.notes && 
          <div className='recipe-details-container' id='notes'>
            <h3 className='recipe-header' id='notes-header'>Notes</h3>
            <p>{recipe.notes}</p>
          </div>
        }
      </div>
  )
}

export default RecipeDetails;