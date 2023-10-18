import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PreviousDays = () => {

    const batchId = useParams().batch;

    const [batchPresentDays, setBatchPresentDays] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const url = `https://school-student-info-client.vercel.app/students_present/${batchId}`;
        fetch(url).then(res => res.json()).then(data => { setBatchPresentDays(data), setLoading(false) }).catch(err => console.log(err));
    }, [batchId]);

    return (
        <div className="flex flex-col justify-center items-center">
            {
                loading ?
                    <>
                        <h1 className="text-3xl font-bold text-blue-900">Loading...!</h1>
                    </>
                    :
                    <div className="flex flex-col gap-1">
                        {
                            batchPresentDays.map((pd, index) => <PresentDays key={index} data={pd}></PresentDays>)
                        }
                    </div>
            }
        </div>
    );
};

export default PreviousDays;

const PresentDays = ({ data }) => {

    const { _id, currentDate } = data;

    const datePars = parseInt(currentDate);
    const date = new Date(datePars);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const weekDay = date.getDay();
    // const hours = date.getHours();
    // const minutes = date.getMinutes();
    // const seconds = date.getSeconds();

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // let localHour = 0;
    // let timeStatus = "am";
    // hours === 0 ? localHour = 1 : hours > 12 ? localHour = hours - 12 : localHour = hours;
    // if (hours < 12) {
    //     timeStatus = "am";
    // } if (hours >= 12) {
    //     timeStatus = "pm";
    // }

    const numToString = num => {
        const localHourString = num.toString();
        let finalLocalHour
        if (localHourString.length === 1) {
            finalLocalHour = "0" + localHourString;
        } if (localHourString.length === 2) {
            finalLocalHour = localHourString;
        }
        return finalLocalHour;
    };

    const twoDigitDay = numToString(day);
    // const twoDigitHour = numToString(localHour);
    // const twoDigitMinut = numToString(minutes);
    // const twoDigitSecond = numToString(seconds);

    return (
        <Link to={`/previous_day/${_id}`}>
            <button className="btn btn-success font-mono text-lg font-bold">{twoDigitDay}-{monthsOfYear[month]}-{year} {daysOfWeek[weekDay]}</button>
        </Link>
    );
};