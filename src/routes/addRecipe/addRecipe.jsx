import './addRecipe.css';
import React, {useState} from 'react';
import {Link, useNavigate, Form} from 'react-router-dom';
import { getDatabase, ref, update, child, push } from 'firebase/database';

import EditRecipeTime from '../../components/editRecipeTime/editRecipeTime';
import EditIngredientsList from '../../components/editIngredientsList/editIngredientsList';
import EditInstructionsList from '../../components/editInstructionsList/editInstructionsList';
import UploadRecipeImage from '../../components/uploadRecipeImage/uploadRecipeImage';

const AddNewRecipe = () => {
  const navigate = useNavigate();

  const [newRecipe, setNewRecipe] = useState(
    {
      title: '',
      img: '',
      description: '',
      time: {prepTime: 0, cookTime: 0},
      ingredients: '',
      instructions: '', 
      notes: '',
    }
  )

  const saveRecipe = () => {
    if(!newRecipe.title) {
      return alert('Recipe title is required');
    } else {
      const databaseRef = ref(getDatabase());
      const newPostKey = push(child(databaseRef, 'recipes')).key;
      const updates = {};
      const recipeUrl = '/recipes/' + newPostKey;
      newRecipe.id = newPostKey;
      updates[recipeUrl] = newRecipe;
      return update(databaseRef, updates);
    }
  }

  return (
    <Form className='add-recipe' id='add-recipe-form'>
      <div className="add-recipe-container" id='title-container'>
        <input 
          placeholder='Recipe title'
          aria-label="Recipe title"
          type='text'
          id='title'
          value={newRecipe.title}
          onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})}
        />
        <Link
          to={`/recipe/${newRecipe.id}`}
          state={newRecipe}
        >
          <button 
            type="submit"
            className='save'
            onClick={saveRecipe}
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

      <div className="add-recipe-container" id='recipe-img'>
        <UploadRecipeImage 
          img={newRecipe.img}
          setImg={(url) => setNewRecipe({...newRecipe, img: url})}
          title={newRecipe.title}
        />
      </div>

      <div className="add-recipe-container" id="description-container">
        <input 
          placeholder='Recipe description'
          aria-label='Recipe description'
          type='text'
          id='description'
          value={newRecipe.description}
          onChange={(e) => setNewRecipe({...newRecipe, description: e.target.value})}
        />
      </div>
      
      <div className="add-recipe-container" id='time-container'>
        <EditRecipeTime 
          time={newRecipe.time}
          setTime={(prepTime, cookTime) => setNewRecipe({...newRecipe, time: {prepTime: prepTime, cookTime: cookTime}})}
        />
      </div>

      <div className="add-recipe-container" id="ingredients-container">
        <h3 className="add-recipe-header" id="ingredients-header">Ingredients</h3>
        <EditIngredientsList
          ingredients={newRecipe.ingredients}
          setIngredients={(ingredients) => setNewRecipe({...newRecipe, ingredients: ingredients})}
        />
      </div>

      <div className="add-recipe-container" id="instructions-container">
        <h3 className="add-recipe-header" id="instructions-header">Instructions</h3>
        <EditInstructionsList
          instructions={newRecipe.instructions}
          setInstructions={(instructions) => setNewRecipe({...newRecipe, instructions: instructions})}
        />
      </div>

      <div className='add-recipe-container' id='notes'>
        <h3 className='add-recipe-header' id='notes-header'>Notes</h3>
        <textarea
          id='notes'
          value={newRecipe.notes}
          rows={3}
          onChange={(e) => setNewRecipe({...newRecipe, notes: e.target.value})}
        />
      </div>
    </Form>
  )
}

export default AddNewRecipe;