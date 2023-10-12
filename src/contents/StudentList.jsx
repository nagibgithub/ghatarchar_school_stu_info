import { useEffect, useState } from "react";
import { addToDb, removeFromDb } from "../localStorage/storage";
import { FaCircle } from "react-icons/fa6";

const StudentList = ({ stuData }) => {

    const [presentedStu, setPresent] = useState(false);

    const { school_id, stu_name, _id } = stuData;

    useEffect(() => {
        const getDataFromLocalStorage = JSON.parse(sessionStorage.getItem("id"));
        getDataFromLocalStorage && getDataFromLocalStorage.includes(stuData._id) ? setPresent(true) : setPresent(false);
    }, [stuData]);


    const clickPresent = id => {
        // const getDataFromLocalStorage = JSON.parse(sessionStorage.getItem("id"));
        presentedStu ? removeFromDb(id) : addToDb(id);
        !presentedStu ? setPresent(true) : setPresent(false);
        // getDataFromLocalStorage && getDataFromLocalStorage.includes(id) ? setPresent(true) : setPresent(false);
    };

    return (

        <div onClick={() => clickPresent(_id)} className={`flex border-2 ${presentedStu ? "border-green-500" : "border-red-500"} justify-between items-center gap-5 ${presentedStu ? "bg-green-100" : "bg-red-100"} px-4 py-1 rounded-3xl shadow font-semibold text-blue-950 cursor-pointer`}>
            <h1 className={`${presentedStu ? "text-green-700" : "text-black"}`}>{school_id} -- {stu_name && stu_name}</h1>
            <div className="flex justify-between items-center gap-1">

                <div className="flex justify-center items-center gap-1">
                    <h1 className="text-green-600"><FaCircle /></h1>
                    <h1 className="text-red-600"><FaCircle /></h1>
                    <h1 className="text-green-600"><FaCircle /></h1>
                    <h1 className="text-green-600"><FaCircle /></h1>
                </div>

                <div className={`w-8 font-semibold text-white ${presentedStu ? "bg-green-600" : "bg-red-600"} text-center flex justify-center items-center h-8 rounded-full`}>
                    {presentedStu ? <h1>P</h1> : <h1>A</h1>}
                </div>
            </div>
        </div>

    );

};

export default StudentList;