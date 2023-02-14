import './RecipeDetails.css';
import {useLocation, Link, useNavigate} from 'react-router-dom';
import { getDatabase, ref, update } from 'firebase/database';

import RecipeTime from '../../components/recipeTime/RecipeTime';
import editIcon from '../../assets/edit_icon.png';

const RecipeDetails = () => {
  const {state} = useLocation();
  const navigate = useNavigate();

  const handleDeleteRecipe = () => {
    const databaseRef = ref(getDatabase());
    const recipeUrl = '/recipes/' + state.id;
    const updates = {};
    updates[recipeUrl] = null;
    update(databaseRef, updates);
    return navigate('/');
  }

  return (
      <div className='recipe-details'>
        <div className="recipe-details-container" id='recipe-title'>
          <h2>{state.title}</h2>
          <div id='buttons'>
            <Link
              to='edit'
              state={state}
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
          <img src={state.img} alt={state.name}/>
        </div>

        <div className='recipe-details-container' id='recipe-description'>
          <span>{state.description}</span>
        </div>

        <div className='recipe-details-container' id='recipe-time'>
          <RecipeTime 
            prepTime={state.time.prepTime}
            cookTime={state.time.cookTime}
          />
        </div>

        <div className="recipe-details-container" id="ingredients-container">
          <h3 className="recipe-header" id="ingredients-header">Ingredients</h3>
          <ul className="recipe-list" id="ingredients-list"> 
            {state.ingredients && state.ingredients.map((ingredient, i) => 
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
            {state.instructions && state.instructions.map((instruction, i) => 
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

        {state.notes && 
          <div className='recipe-details-container' id='notes'>
            <h3 className='recipe-header' id='notes-header'>Notes</h3>
            <p>{state.notes}</p>
          </div>
        }
      </div>
  )
}

export default RecipeDetails;