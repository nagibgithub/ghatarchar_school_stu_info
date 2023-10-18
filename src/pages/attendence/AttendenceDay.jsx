import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AttendenceDay = () => {

    const dayId = useParams().id;

    const [dayData, setDayData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const url = `https://school-student-info-client.vercel.app/presents_day/${dayId}`;
        axios.get(url).then(res => { setDayData(res.data); setLoading(false); }).catch(err => console.log(err));
        // fetch(url).then(res => res.json()).then(data => { setDayData(data); setLoading(false); }).catch(err => console.log(err.message));
    }, [dayId]);
    loading ? console.log("loading...!") : console.log(dayData);

    return (
        <div>
            to day
        </div>
    );
};

export default AttendenceDay;