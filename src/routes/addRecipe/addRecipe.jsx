//stylesheet
import './AddRecipe.css';

//dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//database
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from 'firebase/storage';

import { getDatabase, ref as dbRef, update, child, push } from 'firebase/database';

//context
import { useAuth } from '../../util/auth';

//constants
import { database } from '../../util/Constants';

//components
import EditRecipeTime from '../../components/editRecipeTime/editRecipeTime';
import EditIngredientsList from '../../components/editIngredientsList/editIngredientsList';
import EditInstructionsList from '../../components/editInstructionsList/editInstructionsList';
import UploadRecipeImage from '../../components/uploadRecipeImage/uploadRecipeImage';

const AddRecipe = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const userId = auth.user;

  const [recipe, setRecipe] = useState(
    {
      title: '',
      img: '',
      description: '',
      time: {prepTime: 0, cookTime: 0},
      ingredients: '',
      instructions: '', 
      notes: '',
      isPublic: false,
      userId: userId
    }
  )
  // const [isImgUploaded, setIsImgUploaded] = useState(false);

  useEffect(() => {
    if(!auth.user) navigate('/all-recipes', );
  }, [auth.user, navigate]);

  const saveRecipe = () => {
    if(!recipe.title) {
      return alert('Recipe title is required');
    }
   
    const storage = getStorage();
    const storageRef = sRef(storage, 'images/' + recipe.title);
    uploadBytes(storageRef, recipe.img).then((snapshot) => {
      getDownloadURL(sRef(storage, snapshot.ref.fullPath)).then((url) => {
        recipe.img = url;
      }).then(() => {
        const databaseRef = dbRef(getDatabase());
        const updates = {};
    
        if(recipe.isPublic) {
          const newPublicRecipeKey = push(child(databaseRef, '/all-recipes')).key;
          const publicRecipePath = database.allRecipesKey + newPublicRecipeKey;
          recipe.allRecipesId = newPublicRecipeKey;
          updates[publicRecipePath] = recipe;
        } 
    
        const userRecipesPath = database.usersKey + userId + database.userRecipesKey;
        const recipeKey = push(child(databaseRef, userRecipesPath)).key;
        const recipePath = userRecipesPath + recipeKey;
        recipe.userRecipeId = recipeKey;
        updates[recipePath] = recipe;
        update(databaseRef, updates);
        return navigate(`/users/${recipe.userId}/recipes/${recipe.userRecipeId}`, {state: {recipe}})
      })
    })
  }

  return (
    <div className='add-recipe' id='add-recipe-form'>
      <div className="add-recipe-container" id='title-container'>
        <input 
          placeholder='Recipe title'
          aria-label="Recipe title"
          type='text'
          id='title-input'
          value={recipe.title}
          onChange={(e) => setRecipe({...recipe, title: e.target.value})}
        />
        <button 
          type="submit"
          className='save'
          onClick={saveRecipe}
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

      <div className="add-recipe-container" id='recipe-img'>
        <UploadRecipeImage 
          img={recipe.img}
          setImg={(imgFile) => setRecipe({...recipe, img: imgFile})}
          title={recipe.title}
        />
      </div>

      <div className="add-recipe-container" id="description-container">
        <input 
          placeholder='Recipe description'
          aria-label='Recipe description'
          type='text'
          id='description-input'
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
      
      <div className="add-recipe-container" id='time-container'>
        <EditRecipeTime 
          time={recipe.time}
          setTime={(prepTime, cookTime) => setRecipe({...recipe, time: {prepTime: prepTime, cookTime: cookTime}})}
        />
      </div>

      <div className="add-recipe-container" id="ingredients-container">
        <h3 className="add-recipe-header" id="ingredients-header">Ingredients</h3>
        <EditIngredientsList
          ingredients={recipe.ingredients}
          setIngredients={(ingredients) => setRecipe({...recipe, ingredients: ingredients})}
        />
      </div>

      <div className="add-recipe-container" id="instructions-container">
        <h3 className="add-recipe-header" id="instructions-header">Instructions</h3>
        <EditInstructionsList
          instructions={recipe.instructions}
          setInstructions={(instructions) => setRecipe({...recipe, instructions: instructions})}
        />
      </div>

      <div className='add-recipe-container' id='notes'>
        <h3 className='add-recipe-header' id='notes-header'>Notes</h3>
        <textarea
          id='notes'
          value={recipe.notes}
          rows={3}
          onChange={(e) => setRecipe({...recipe, notes: e.target.value})}
        />
      </div>
    </div>
  )
}

export default AddRecipe;