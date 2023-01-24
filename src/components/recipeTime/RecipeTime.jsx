import './RecipeTime.css';

const RecipeTime = (props) => {
    const {prepTime, cookTime} = props;
    let totalTime;
    cookTime ? totalTime = prepTime + cookTime : totalTime = prepTime;

    return (
        <div className="recipe-container" id='time-container'>
            <div className="recipe-time" id="prep-time">
              <h4>Prep Time</h4>
              <span>{prepTime} minutes</span>
            </div>

            {cookTime && 
                <div className="recipe-time" id="cook-time">
                    <h4>Cook Time</h4>
                    <span>{cookTime} minutes</span>
                </div>
            }
            
            <div className="recipe-time" id="total-time">
              <h4>Total Time</h4>
              <span>{totalTime} minutes</span>
            </div>  
        </div>
    )
}

export default RecipeTime;
