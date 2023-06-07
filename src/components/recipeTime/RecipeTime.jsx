//stylesheet
import './RecipeTime.css';

//utility functions
import {getTimeString} from '../../util/UtilityFunctions';

const RecipeTime = (props) => {
    const prepTime = getTimeString(props.prepTime);
    const cookTime = getTimeString(props.cookTime);
    const totalTime = getTimeString(props.prepTime + props.cookTime);

    return (
        <div className='recipe-time'>
            {props.prepTime > 0 && 
                <div className="recipe-times" id="prep-time">
                    <h3>Prep Time</h3>
                    <span>{prepTime}</span>
                </div>
            }
            {props.cookTime > 0 && 
                <div className="recipe-times" id="cook-time">
                    <h3>Cook Time</h3>
                    <span>{cookTime}</span>
                </div>
            }
            
            <div className="recipe-times" id="total-time">
                <h3>Total Time</h3>
                <span>{totalTime}</span>
            </div>
        </div>
    )
}

export default RecipeTime;
