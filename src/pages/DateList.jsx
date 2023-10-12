
const DateList = () => {
    const startDate = new Date(2024, 0, 1);
    const endDate = new Date(2024, 11, 31);

    const dateArray = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return (
        <div className="flex flex-col items-center">
            {
                dateArray.map((date, index) => <div key={index} className={`text-lg mb-2 border px-4 py-2 ${date.getDay() === 5 || date.getDay() === 6 ? "bg-rose-200" : "bg-sky-200"} rounded shadow font-semibold`}>{date.toDateString()}{(date.getDay() === 5 || date.getDay() === 6) && " -- public holiday"}</div>)
            }
        </div>
    );
};

export default DateList;
