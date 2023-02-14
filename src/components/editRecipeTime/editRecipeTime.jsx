import React, {useState} from 'react';
import './editRecipeTime.css';
import { getHoursAndMinutes, getTimeString, getTotalMinutes } from '../../util/utilityFunctions';


const EditRecipeTime = (props) => {
  const {time, setTime} = props;
  const [prepTime, setPrepTime] = useState(getHoursAndMinutes(time.prepTime));
  const [cookTime, setCookTime] = useState(getHoursAndMinutes(time.cookTime));
  const [totalTime, setTotalTime] = useState(getTimeString(time.prepTime + time.cookTime));

  const handleInput = (e) => {
    const id = e.target.id;
    const newTime = e.target.value;

    let totalPrepMinutes = getTotalMinutes(prepTime.hours, prepTime.minutes);
    let totalCookMinutes = getTotalMinutes(cookTime.hours, cookTime.minutes);

    switch (id) {
      case 'prep-hours':
        setPrepTime({...prepTime, hours: newTime});
        totalPrepMinutes = getTotalMinutes(newTime, prepTime.minutes);
        break;
      case 'prep-minutes':
        setPrepTime({...prepTime, minutes: e.target.value});
        totalPrepMinutes = getTotalMinutes(prepTime.hours, newTime);
        break;
      case 'cook-hours':
        setCookTime({...cookTime, hours: e.target.value});
        totalCookMinutes = getTotalMinutes(newTime, cookTime.minutes);
        break;
      case 'cook-minutes':
        setCookTime({...cookTime, minutes: e.target.value});
        totalCookMinutes = getTotalMinutes(cookTime.hours, newTime);
        break;
      default:
        return;
    }

    setTotalTime(getTimeString(totalPrepMinutes + totalCookMinutes));
    console.log({prepTime: totalPrepMinutes, cookTime: totalCookMinutes});
    setTime(totalPrepMinutes, totalCookMinutes);
  }

  return(
    <div className='edit-recipe-time'>
      <div className="recipe-times" id="prep-time">
        <h4>Prep Time</h4>
        <div className='hours-and-minutes'>
          <div className='hours'>
            <input
              placeholder='0'
              id='prep-hours'
              aria-label='recipe prep hours'
              type='text'
              value={prepTime.hours}
              onChange={handleInput}
            />
            <span>{prepTime.hours === 1 ? 'hour' : 'hours'}</span>
          </div>
          <div className='minutes'>
            <input
              placeholder='0'
              id='prep-minutes'
              aria-label='recipe prep minutes'
              type='text'
              value={prepTime.minutes}
              onChange={handleInput}
            />
            <span>{prepTime.minutes === 1 ? 'minute' : 'minutes'}</span>
          </div>
        </div>
      </div> 

      <div className="recipe-times" id="cook-time">
        <h4>Cook Time</h4>
        <div className='hours-and-minutes'>
          <div className='hours'>
            <input
              placeholder='0'
              id='cook-hours'
              aria-label='recipe prep hours'
              type='text'
              value={cookTime.hours}
              onChange={handleInput}
            />
            <span>{cookTime.hours === 1 ? 'hour' : 'hours'}</span>
          </div>
          <div className='minutes'>
            <input
              placeholder='0'
              id='cook-minutes'
              aria-label='recipe prep minutes'
              type='text'
              value={cookTime.minutes}
              onChange={handleInput}
            />
            <span>{cookTime.minutes === 1 ? 'minute' : 'minutes'}</span>
          </div>
        </div>
      </div>

      <div className="recipe-times" id="total-time">
        <h4>Total Time</h4>
        <span>{totalTime}</span>
      </div>
    </div>
  )
}

export default EditRecipeTime;