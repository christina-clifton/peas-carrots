//stylesheet
import './UserRecipeDetails.css';

//dependencies
import { useEffect } from 'react';
import {useLocation, Link, useNavigate } from 'react-router-dom';

//database
import { getDatabase, ref, update } from 'firebase/database';

//context
import { useAuth } from '../../util/auth';

//constants
import { database } from '../../util/Constants';

//components
import RecipeTime from '../../components/recipeTime/RecipeTime';

//assets
import editIcon from '../../assets/edit_icon.png';

const UserRecipeDetails = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!auth.user) navigate('/all-recipes');
  }, [auth.user, navigate])
  
  const {state} = useLocation();
  const recipe = state.recipe;
  
  const handleDeleteRecipe = () => {
    const databaseRef = ref(getDatabase());
    const recipeKey = database.usersKey + recipe.userId + database.userRecipesKey + recipe.userRecipeId;
    const updates = {};
    updates[recipeKey] = null;
    update(databaseRef, updates);
    
    if(recipe.isPublic) {
      const publicRecipeKey = database.allRecipesKey + recipe.allRecipesId;
      const updates = {};
      updates[publicRecipeKey] = null;
      update(databaseRef, updates);
    }

    return navigate(`/users/${recipe.userId}/recipes`);
  }

  return (
      <div className='recipe-details'>
        <div className="recipe-details-container" id='recipe-title'>
          <h2>{recipe.title}</h2>
          <div id='buttons'>
            <Link
              to='edit'
              state={recipe}
            >
              <img className="edit-icon" alt="edit-recipe-icon" src={editIcon}></img>
            </Link>
            <button 
              className='delete-button-wrapper' 
              type='button' 
              onClick={() => window.confirm('Delete this recipe?') ? handleDeleteRecipe() : null}
            >
              <img 
                className='delete-icon'
                src={require('../../assets/delete.png')}
                alt='delete'
              />
            </button>
          </div>
        </div>

        <div className='recipe-details-containter' id="recipe-img">
          <img src={recipe.img} alt={recipe.name}/>
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

export default UserRecipeDetails;