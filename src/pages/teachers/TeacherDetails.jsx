import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TeacherDetails = () => {
    const [teacherData, setTeacherData] = useState({});
    const [loadingStatus, setLoadingStatus] = useState(true);
    const teacherId = useParams().teacherId;
    useEffect(() => {
        const url = `https://school-student-info-client.vercel.app/teacher_info/${teacherId}`;
        fetch(url).then(res => res.json()).then(data => {
            setTeacherData(data);
            setLoadingStatus(false);
        });
    }, [teacherId]);

    const { teacher_name, teacher_email, teacher_photo, teacher_idCreation_at, teacher_lastLogin_at } = teacherData

    const datePars = parseInt(teacher_idCreation_at);
    const date = new Date(datePars);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const weekDay = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let localHour = 0;
    let timeStatus = "am";
    hours === 0 ? localHour = 1 : hours > 12 ? localHour = hours - 12 : localHour = hours;
    if (hours < 12) {
        timeStatus = "am";
    } if (hours >= 12) {
        timeStatus = "pm";
    }

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

    const twoDigitHour = numToString(localHour);
    const twoDigitMinut = numToString(minutes);
    const twoDigitSecond = numToString(seconds);



    return (
        <div className="flex flex-col justify-center items-center">
            {
                loadingStatus ?
                    <>
                        <h1>Loading...!</h1>
                    </>
                    :
                    <>
                        <img src={teacher_photo} alt="teacher photo" />
                        <h1>{teacher_name}</h1>
                        <h1>{teacher_email}</h1>
                        <h1>First id Confirm Data: </h1>
                        <h1 className="font-mono">{daysOfWeek[weekDay]}, {day} {monthsOfYear[month]}, {year}, {twoDigitHour}:{twoDigitMinut}:{twoDigitSecond} {timeStatus}</h1>
                        <div>
                            <h1>
                                Logged in Information:
                            </h1>
                            <div>
                                {
                                    teacher_lastLogin_at.map((time, index) => <LogginTimeArray key={index} logTime={time}></LogginTimeArray>)
                                }
                            </div>
                        </div>
                    </>
            }
        </div>
    );
};

export default TeacherDetails;



const LogginTimeArray = ({ logTime }) => {

    const logTimeInt = parseInt(logTime);

    const date = new Date(logTimeInt);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const weekDay = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let localHour = 0;
    let timeStatus = "am";
    hours === 0 ? localHour = 1 : hours > 12 ? localHour = hours - 12 : localHour = hours;
    if (hours < 12) {
        timeStatus = "am";
    } if (hours >= 12) {
        timeStatus = "pm";
    }


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

    const twoDigitHour = numToString(localHour);
    const twoDigitMinut = numToString(minutes);
    const twoDigitSecond = numToString(seconds);

    return (
        <h1 className="font-mono">{daysOfWeek[weekDay]}, {day} {monthsOfYear[month]}, {year}, {twoDigitHour}:{twoDigitMinut}:{twoDigitSecond} {timeStatus}</h1>
    );
};