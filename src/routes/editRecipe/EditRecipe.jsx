//stylesheet
import './EditRecipe.css';

//dependencies
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

//database
import { getDatabase, ref, update, child, push } from 'firebase/database';

//context
import { useAuth } from '../../util/auth';

//constants
import { database } from '../../util/Constants';

//components
import EditRecipeTime from '../../components/editRecipeTime/editRecipeTime';
import EditIngredientsList from '../../components/editIngredientsList/editIngredientsList';
import EditInstructionsList from '../../components/editInstructionsList/editInstructionsList';
import UploadRecipeImage from '../../components/uploadRecipeImage/uploadRecipeImage';

const EditRecipe = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  
  useEffect(() => {
    if(!auth.user) navigate('/all-recipes');
  }, [auth.user, navigate])
  
  const isPublicBeforeEdit = state.isPublic;

  const [recipe, setRecipe] = useState({
    userRecipeId: state.userRecipeId,
    userId: state.userId,
    allRecipesId: state.allRecipesId,
    isPublic: state.isPublic,
    title: state.title,
    img: state.img,
    description: state.description,
    time: state.time,
    ingredients: state.ingredients,
    instructions: state.instructions,
    notes: state.notes,
  })

  const updateRecipe = () => {
    const databaseRef = ref(getDatabase());
    const updates = {};
    const userRecipePath = database.usersKey + recipe.userId + database.userRecipesKey + recipe.userRecipeId;
    updates[userRecipePath] = recipe;

    if(isPublicBeforeEdit && !recipe.isPublic) {
      const publicRecipeKey = database.allRecipesKey + recipe.allRecipesId;
      updates[publicRecipeKey] = null;
    } else if (!isPublicBeforeEdit && recipe.isPublic) {
      const newPublicRecipeKey = push(child(databaseRef, '/all-recipes')).key;
      recipe.allRecipesId = newPublicRecipeKey;
      const publicRecipePath = database.allRecipesKey + newPublicRecipeKey;
      updates[publicRecipePath] = recipe;
    }

    update(databaseRef, updates);
    return navigate(`/users/${state.userId}/recipes`);
  }

  return (
    <div className='edit-recipe' id='edit-recipe-form'>
      <div className="edit-recipe-container" id='title-container'>
        <input 
          placeholder='Recipe title'
          aria-label="Recipe title"
          type='text'
          id='title-input'
          value={recipe.title}
          onChange={(e) => setRecipe({...recipe, title: e.target.value})}
        />
        <button 
          className='save'
          onClick={updateRecipe}
        >
          Save
        </button>
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
        <div className='toggle-div'>
          <span>{recipe.isPublic ? 'Public' : 'Private'}</span>
          <div className={recipe.isPublic ? 'public' : 'private'} id='toggle-switch'>
            <input type='checkbox' onClick={()=> setRecipe({...recipe, isPublic: !recipe.isPublic})}/>
            <div className={recipe.isPublic ? 'public' : 'private'} id='slider'></div>
          </div>
        </div>
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