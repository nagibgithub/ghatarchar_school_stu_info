import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AttendenceDay = () => {

    const dayId = useParams().id;

    const [dayData, setDayData] = useState({});
    const [stuData, setStuData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const url = `https://school-student-info-client.vercel.app/presents_day/${dayId}`;
        axios.get(url).then(res => { setDayData(res.data); setLoading(false); }).catch(err => console.log(err));
    }, [dayId]);

    console.log(stuData);
    const presentStu = dayData.present_Stu;
    // const objData = { presentStu };
    // console.log(objData);
    useEffect(() => {
        // setLoading(true);
        const url = `http://localhost:5000/student_present_info`;
        // axios.get(url, presentStu).then(res => { setStuData(res.data); setLoading(false); }).catch(err => console.log(err));
        const unsub = fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ stuName: "Nagib Mahfuz" })
        })
            .then(res => res.json())
            .then(data => {
                setStuData(data);
            })
            .catch(err => console.log(err));
        return () => {
            unsub
        }
    }, []);

    console.log(presentStu);
    // console.log(stuData);



    return (
        <div className="flex flex-col justify-center items-center">
            {
                loading ?
                    <>
                        <h1>Loading...!</h1>
                    </>
                    :
                    <>
                        <h1>Data paichi</h1>
                    </>
            }
        </div>
    );
};

export default AttendenceDay;