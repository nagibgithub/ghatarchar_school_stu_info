import { useState } from "react";

const AllDay = () => {

    const [startMonth, setStartMonth] = useState(null);
    // const [endMonth, setEndMonth] = useState(null);
    const starDefaultDate = "2023-1-1";

    const startDay = new Date((startMonth === null || startMonth == "") ? starDefaultDate : `${(new Date(startMonth).getFullYear())}-${(new Date(startMonth).getMonth() + 1)}-${(new Date(startMonth)).getDate()}`);
    const endDay = new Date(2023, 11, 31);
    // console.log(startDay.toLocaleDateString());


    const dateArray = [];
    let currentDate = startDay;
    while (currentDate <= endDay) {
        const currentDateValue = (new Date(currentDate)).getDate();
        const currentMonth = (new Date(currentDate)).getMonth() + 1;
        const currentYear = (new Date(currentDate)).getFullYear();
        const currentFullShortDate = currentYear + "-" + currentMonth + "-" + currentDateValue;
        dateArray.push(currentFullShortDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    const handleMonth = e => {
        e.preventDefault();
        setStartMonth(new Date(e.target.start_month.value));
        console.log(typeof startMonth);
        console.log(e.target.start_month.value == "");
    };

    return (
        <>
            <div>
                <form onSubmit={(e) => handleMonth(e)} className="max-w-md mx-auto p-4 bg-white rounded shadow">
                    <div className="mb-4">
                        <label htmlFor="start_month" className="block font-bold text-gray-700">Start Month</label>
                        <input type="month" name="startMonth" id="start_month" className="border rounded w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </form>
            </div>
            <div className="flex flex-col gap-1">
                {
                    dateArray.map((pd, index) => <button className={`btn text-lg ${((new Date(pd)).getDay() === 5 || (new Date(pd)).getDay() === 6) ? "btn-error" : "btn-info"}`} key={index}>{(new Date(pd).toLocaleDateString(undefined, { day: "2-digit", month: "short", weekday: "short", year: "numeric" }))}</button>)
                }
            </div>
        </>
    );
};

export default AllDay;