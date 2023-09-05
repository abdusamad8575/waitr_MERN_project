export function timeFrames(start, end ,date) {
// console.log("1==",date?.$d.getTime() );
// console.log("2==",new Date().getTime() );
//     const selectedDate = date ? (date.$d.getTime() === new Date().getTime() ? 'samad' : start ): new Date()
//     console.log("dates:-", selectedDate);
    const currentTime = new Date(); // Get the current time
    const minutes = currentTime.getMinutes(); // Get the current minutes
    currentTime.setMinutes(minutes + 30 - (minutes % 30));
    const startTime = date ? new Date(start) : (currentTime > new Date(start).getTime() ? currentTime : new Date(start))
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