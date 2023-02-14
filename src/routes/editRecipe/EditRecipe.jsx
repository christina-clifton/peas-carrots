import './EditRecipe.css';
import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import EditRecipeTime from '../../components/editRecipeTime/editRecipeTime';
import EditIngredientsList from '../../components/editIngredientsList/editIngredientsList';
import EditInstructionsList from '../../components/editInstructionsList/editInstructionsList';
import { getDatabase, ref, update } from 'firebase/database';
import UploadRecipeImage from '../../components/uploadRecipeImage/uploadRecipeImage';

const EditRecipe = () => {
  const {state} = useLocation();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    title: state.title,
    img: state.img,
    description: state.description,
    time: state.time,
    ingredients: state.ingredients,
    instructions: state.instructions,
    notes: state.notes,
    id: state.id,
  })
  console.log(recipe.time);

  const postToDatabase = () => {
    const databaseRef = ref(getDatabase());
    const updates = {};
    const recipeUrl = '/recipes/' + recipe.id;
    updates[recipeUrl] = recipe;
    return update(databaseRef, updates);
  }

  return (
    <div className='edit-recipe' id='edit-recipe-form'>
      <div className="edit-recipe-container" id='title-container'>
        <input 
          placeholder='Recipe title'
          aria-label="Recipe title"
          type='text'
          value={recipe.title}
          onChange={(e) => setRecipe({...recipe, title: e.target.value})}
        />
        <Link
          to={`/recipe/${recipe.id}`}
          state={recipe}
        >
          <button 
            type="submit"
            className='save'
            onClick={postToDatabase}
          >
            Save
          </button>
        </Link>
        <button 
          type="button"
          className='cancel'
          onClick={() => {
              navigate(-1);
          }}
        >
          Cancel
        </button>
      </div>

      <div className="edit-recipe-container" id='recipe-img'>
        <UploadRecipeImage 
          imgUrl={recipe.img}
          setImgUrl={(e) => setRecipe({...recipe, img: e.target.value})}
          title={recipe.title}
        />
      </div>

      <div className="edit-recipe-container" id="description-container">
        <input 
          placeholder='Recipe description'
          aria-label='Recipe description'
          type='text'
          value={recipe.description}
          onChange={(e) => setRecipe({...recipe, description: e.target.value})}
        />
      </div>
      
      <div className="edit-recipe-container" id='time-container'>
        <EditRecipeTime 
          time={recipe.time}
          setTime={(prepTime, cookTime) => setRecipe({...recipe, time: {prepTime: prepTime, cookTime: cookTime}})}
        />
      </div>

      <div className="edit-recipe-container" id="ingredients-container">
        <h3 className="edit-recipe-header" id="ingredients-header">Ingredients</h3>
        <EditIngredientsList
          ingredients={recipe.ingredients}
          setIngredients={(ingredients) => setRecipe({...recipe, ingredients: ingredients})}
        />
      </div>

      <div className="edit-recipe-container" id="instructions-container">
        <h3 className="edit-recipe-header" id="instructions-header">Instructions</h3>
        <EditInstructionsList
          instructions={recipe.instructions}
          setInstructions={(instructions) => setRecipe({...recipe, instructions: instructions})}
        />
      </div>

      <div className='recipe-details-container' id='notes'>
        <h3 className='edit-recipe-header' id='notes-header'>Notes</h3>
        <textarea
          id='edit-recipe-notes'
          value={recipe.notes}
          rows={3}
          onChange={(e) => setRecipe({...recipe, notes: e.target.value})}
        />
      </div>
    </div>
  )
}

export default EditRecipe;