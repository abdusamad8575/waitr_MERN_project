export const compareTime = (dateString,timeString) => {
    const extention= timeString.split(' ');
    
    const parts = dateString.split('/');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]);
        
    const timeParts = timeString.split(':');
    let hours = parseInt(timeParts[0]);
    const curectTime = extention[1] === 'pm' ? (hours+12) : hours
    const minutes = parseInt(timeParts[1]);
    const parsedDate = new Date(year, month, day, curectTime, minutes);
    const currentDate = new Date();
    if (parsedDate >= currentDate) {
        return true
    } else {
        return false
    }

}