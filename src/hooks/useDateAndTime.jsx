
const useDateAndTime = () => {


    const convertDateAndTime = (dateAndTimeInput, dateFormate) => {

        const dateTimeData = new Date(parseInt(dateAndTimeInput));
        const threeDaysBack = new Date(parseInt(dateAndTimeInput));
        threeDaysBack.setDate(dateTimeData.getDate() - 0);
        if (dateFormate === "fullDate") {
            return dateTimeData;
        }

        if (dateFormate === "shortDate") {

            const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            if (threeDaysBack.getDate().toString().length === 1) {
                return `${daysOfWeek[threeDaysBack.getDay()]}, 0${threeDaysBack.getDate()}-${monthsArray[threeDaysBack.getMonth()]}-${threeDaysBack.getFullYear().toString()[2]}${threeDaysBack.getFullYear().toString()[3]}`;
            } else {
                return `${daysOfWeek[threeDaysBack.getDay()]}, ${threeDaysBack.getDate()}-${monthsArray[threeDaysBack.getMonth()]}-${threeDaysBack.getFullYear().toString()[2]}${threeDaysBack.getFullYear().toString()[3]}`;
            }
        }

        const twoDigit = inputNumber => inputNumber.toString().length === 1 ? "0" + inputNumber.toString() : inputNumber;
        const hour12Formate = inputNumber => {
            const parsInputNumber = parseInt(inputNumber);
            if (parsInputNumber > 12) {
                return { hour: parsInputNumber - 12, amPm: "PM" }
            } else if (parsInputNumber === 12) {
                return { hour: parsInputNumber, amPm: "PM" }
            } else if (parsInputNumber < 12) {
                return { hour: parsInputNumber, amPm: "AM" }
            } else if (parsInputNumber === 0) {
                return { hour: 1, amPm: "AM" }
            }


        };

        if (dateFormate === "shortTime") {
            return `${twoDigit(hour12Formate(threeDaysBack.getHours()).hour)}:${twoDigit(threeDaysBack.getMinutes())} ${hour12Formate(threeDaysBack.getHours()).amPm}`

        }

    };








    return {
        convertDateAndTime,
    }


};

export default useDateAndTime;