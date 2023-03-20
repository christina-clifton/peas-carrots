export const getHoursAndMinutes = (totalMinutes) => {
    if(totalMinutes) {
        let hours = Math.floor(totalMinutes / 60);
        let minutes = totalMinutes % 60;
        return {hours, minutes};
    } else return {hours: 0, minutes: 0};
}

export const getTimeString = (totalMinutes) => {
    const hoursAndMinutes = getHoursAndMinutes(totalMinutes);
    let hours = hoursAndMinutes.hours;
    let minutes = hoursAndMinutes.minutes;
    let result = '';

    if(hours) {
        result += hours;
        result += hours > 1 ? ' hours' : ' hour'; 
    }

    if(hours && minutes) result += ' ';

    if(minutes) {
        result += minutes;
        result += minutes > 1 ? ' minutes' : ' minute';
    }

    if (!hours && !minutes) {
        result = '0 hours 0 minutes';
    }
  
    return result;
}

export const getTotalMinutes = (hours, minutes) => {
    return (Number(hours) * 60) + Number(minutes);
}

export const useClickOutsideElement = (wrapperRef, callbackFunction, id) => {
    const handleClickOutside = (e) => {
        if(wrapperRef.current) {
            if(!wrapperRef.current.contains(e.target) && (e.target.id !== id)) {
                callbackFunction();
            } 
        }
    }

    document.addEventListener("mousedown", handleClickOutside);   
    
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };     
};