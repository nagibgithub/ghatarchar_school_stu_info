import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useEffect, useState } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const TeacherList = () => {


    const [teachersData, setTeachersData] = useState([]);
    useEffect(() => {
        const url = `https://school-student-info-client.vercel.app/teachers`;
        fetch(url).then(res => res.json()).then(data => setTeachersData(data));
    }, []);

    return (
        <div className="flex flex-col gap-2 px-5">
            {
                teachersData.map((teacher, index) => <Teacher key={index} teacherData={teacher}></Teacher>)
            }
        </div>
    );
};

export default TeacherList;

const Teacher = ({ teacherData }) => {

    const { teacher_name, teacher_roll, _id, teacher_photo } = teacherData;

    const handleChangeRole = code => {
        let teacherRole;
        code === 1 ? teacherRole = "admin" : code === 2 ? teacherRole = "teacher" : teacherRole = "others";
        const url = `https://school-student-info-client.vercel.app/teacher_roll/${_id}`;
        fetch(url, { method: "PATCH", headers: { 'content-type': 'application/json' }, body: JSON.stringify({ teacher_roll: teacherRole }) }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));
    };

    const handleDeleteTeacher = id => {
        const url = `https://school-student-info-client.vercel.app/teacher/${id}`;
        fetch(url, { method: "DELETE" }).then(res => res.json()).then(data => console.log(data));
    };

    return (
        <div className="grid grid-cols-6 justify-center items-center px-4 py-2 rounded-md bg-sky-200 shadow-md">
            <div className="col-span-1">
                <img className="rounded-full" src={teacher_photo} alt="teacher photo" />
            </div>
            <div className="col-span-4 flex flex-col justify-center items-center">
                <h1 className="capitalize font-serif font-bold text-sm">{teacher_name}</h1>
                {/* <h1>{teacher_email}</h1> */}
                <div>
                    <button onClick={() => handleChangeRole(1)} disabled={teacher_roll === "admin" ? true : false} className={`${teacher_roll === "admin" && "hidden"} font-bold text-lg btn btn-circle border-2 border-red-600 m-1 btn-error`}>A</button>
                    <button onClick={() => handleChangeRole(2)} disabled={teacher_roll === "teacher" ? true : false} className={`${teacher_roll === "teacher" && "hidden"} font-bold text-lg btn btn-circle border-2 border-sky-600 m-1 btn-info`}>T</button>
                    <button onClick={() => handleChangeRole(3)} disabled={teacher_roll === "others" ? true : false} className={`${teacher_roll === "others" && "hidden"} font-bold text-lg btn btn-circle border-2 border-yellow-600 m-1 btn-warning`}>O</button>
                </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2 justify-center items-center">
                <Link to={`/teacher/${_id}`}><button className="btn btn-circle btn-success border-2 border-green-700"><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button></Link>
                <button onClick={() => handleDeleteTeacher(_id)} className="btn btn-circle btn-error border-2 border-red-700"><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></button>
            </div>
        </div>
    );
};