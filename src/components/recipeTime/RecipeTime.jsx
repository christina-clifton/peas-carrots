import './RecipeTime.css';
import {getTimeString} from '../../util/utilityFunctions';

const RecipeTime = (props) => {
    const prepTime = getTimeString(props.prepTime);
    const cookTime = getTimeString(props.cookTime);
    const totalTime = getTimeString(props.prepTime + props.cookTime);

    return (
        <div className='recipe-time'>
            {props.prepTime > 0 && 
                <div className="recipe-times" id="prep-time">
                <h4>Prep Time</h4>
                <span>{prepTime}</span>
                </div>
            }
            {props.cookTime > 0 && 
                <div className="recipe-times" id="cook-time">
                    <h4>Cook Time</h4>
                    <span>{cookTime}</span>
                </div>
            }
            
            <div className="recipe-times" id="total-time">
              <h4>Total Time</h4>
              <span>{totalTime}</span>
            </div>
        </div>
    )
}

export default RecipeTime;
