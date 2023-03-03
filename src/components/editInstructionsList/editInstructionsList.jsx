import React, {useState} from 'react';
import './editInstructionsList.css';

const EditInstructionsList = (props) => {
    const {instructions, setInstructions} = props;
    const [value, setValue] = useState('');
    
    const handleAddInstruction = (e) => {
        if(!value) return;
        if(e.keyCode === 13 || e.target.className === 'add-instruction-button') {
            setInstructions([...instructions, value]);
            setValue('');
        }
    }
  
    const handleDeleteInstruction = (instruction) => {
        const newInstructionsList = instructions.filter((item) => item !== instruction);
        setInstructions(newInstructionsList);
    }

    return (
        <div className='edit-instructions-list'>
            <div id='add-instruction'>
                <input 
                    placeholder='add instruction'
                    aria-label='add instruction'
                    type='text'
                    value={value} 
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleAddInstruction}
                />
                <button className='add-instruction-button' type="button" onClick={handleAddInstruction}>+</button>
            </div>
            <ol id="instructions-list"> 
                {instructions && instructions.map((instruction, i) => 
                    <li key={i}>
                        <div id="instruction">
                            <label>{instruction}</label>
                            <button 
                                className='delete-button-wrapper' 
                                type='button' 
                                onClick={() => handleDeleteInstruction(instruction)}
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
            </ol>
        </div>
    )
}

export default EditInstructionsList;