import React, {useState} from 'react';
import './editIngredientsList.css';

const EditIngredientsList = (props) => {
    const {ingredients, setIngredients} = props;
    const [value, setValue] = useState('');

    const handleAddNewIngredient = () => {
        if(!value) return;
        setIngredients([...ingredients, value]);
        setValue('');
    }
  
    const handleDeleteIngredient = (ingredient) => {
        const newIngredientsList = ingredients.filter((item) => item !== ingredient);
        setIngredients(newIngredientsList);
    }

    return (
        <div className='edit-ingredients-list'>
            <div id='add-ingredient'>
                <input 
                    placeholder='add ingredient'
                    aria-label='add ingredient'
                    type='text'
                    value={value} 
                    onChange={(e) => setValue(e.target.value)}
                />
                <button className='add-ingredient-button' type="button" onClick={handleAddNewIngredient}>+</button>
            </div>
            <ul id="ingredients-list"> 
                {ingredients && ingredients.map((ingredient, i) => 
                    <li key={i}>
                        <div id="ingredient">
                            <span>{ingredient}</span>
                            <button 
                                className='delete-button-wrapper' 
                                type='button' 
                                onClick={() => handleDeleteIngredient(ingredient)}
                            >
                                <img 
                                    className='delete-icon'
                                    src={require('../../assets/delete.png')}
                                    alt='delete'
                                />
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default EditIngredientsList;