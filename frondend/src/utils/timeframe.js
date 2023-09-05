export function timeFrames(start, end) {
    const startTime = new Date(start);
    // console.log("652",startTime);
    const endTime = new Date(end);
    const breakfastFrames = [];
    const noonFrames = [];
    const dinnerFrames = [];
    const slots = []
    while (startTime < endTime) {
        const next = new Date(startTime);
        next.setMinutes(startTime.getMinutes() + 30);

        let category = '';

        if (startTime.getHours() < 12) {
            category = 'breakfast';         
            breakfastFrames.push(startTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }));
        } else if (startTime.getHours() >= 12 && startTime.getHours() < 16) {
            category = 'noon';
            noonFrames.push(startTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }));
        } else if (startTime.getHours() >= 16 && startTime.getHours() < endTime.getHours()) {
            category = 'dinner';
            dinnerFrames.push(startTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }));
        }

        startTime.setTime(next);
    }
    breakfastFrames.length && slots.push({ 'breakfast': breakfastFrames })
    noonFrames.length && slots.push({ 'noon': noonFrames })
    dinnerFrames.length && slots.push({ 'dinner': dinnerFrames })
    console.log('sdfas', slots);
    return slots
}



export const showTime = (date) => {

    const dateObject = new Date(date);
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();

    return `${(hours % 12).toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}  