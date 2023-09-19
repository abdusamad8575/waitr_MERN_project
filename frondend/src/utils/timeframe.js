export function timeFrames(start, end, date) {
    // console.log("1==", date?.$d.toLocaleDateString());
    // console.log("2==", new Date().toLocaleDateString());


    const currentTime = new Date(); // Get the current time
    // Create two Date objects representing the times you want to compare
    const minutes = currentTime.getMinutes(); // Get the current minutes
    currentTime.setMinutes(minutes + 30 - (minutes % 30));
    const startTime = date ? (date?.$d.toLocaleDateString() === new Date().toLocaleDateString() ? currentTime : new Date(start)) : (currentTime > new Date(start).getTime() ? currentTime : new Date(start))
    // console.log("startTime", startTime);


    const endTime = new Date(end);
    const breakfastFrames = [];
    const noonFrames = [];
    const dinnerFrames = [];
    const slots = []
    while (compare(startTime, endTime)) {
        const next = new Date(startTime);
        next.setMinutes(startTime.getMinutes() + 30);

        let category = '';

        if (startTime.getHours() < 12) {
            category = 'Breakfast';
            breakfastFrames.push(startTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }));
        } else if (startTime.getHours() >= 12 && startTime.getHours() < 16) {
            category = 'Lunch';
            noonFrames.push(startTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }));
        } else if (startTime.getHours() >= 16 && startTime.getHours() < endTime.getHours()) {
            category = 'Dinner';
            dinnerFrames.push(startTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }));
        }

        startTime.setTime(next);
    }
    breakfastFrames.length && slots.push({ 'Breakfast': breakfastFrames })
    noonFrames.length && slots.push({ 'Lunch': noonFrames })
    dinnerFrames.length && slots.push({ 'Dinner': dinnerFrames })
    console.log('sdfas', slots);
    return slots
}



export const showTime = (date) => {

    const dateObject = new Date(date);
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();
    const period = hours < 12 ? 'AM' : 'PM';

    return `${(hours % 12).toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}${period}`;
}

const compare = (start, end) => {

    const hours1 = start.getHours();
    const minutes1 = start.getMinutes();

    const hours2 = end.getHours();
    const minutes2 = end.getMinutes();

    if (hours1 < hours2) {
        return true
    } else if (hours1 > hours2) {
        return false
    } else if (minutes1 < minutes2) {
        return true
    } else if (minutes1 > minutes2) {
        return false
    } else {
        return false
    }
}

export const timeChanges = (time) => {
    const adjustedTimestamp = new Date(time);
    adjustedTimestamp.setMinutes(adjustedTimestamp.getMinutes() + 330);
    const ISTformat = adjustedTimestamp.toISOString();
    const times = showTime(ISTformat)
    return times;
}