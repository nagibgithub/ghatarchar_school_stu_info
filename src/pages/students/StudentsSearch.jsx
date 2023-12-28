import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const StudentsSearch = () => {

    const [stuArrLoading, setStuArrLoading] = useState(true);
    const [stuArr, setStuArr] = useState([]);
    const [searchArr, setSearchArr] = useState([]);
    const [activeStu, setActiveStu] = useState(false);

    useEffect(() => {
        setStuArrLoading(true);
        const url = `https://school-student-info-client.vercel.app/student_id_array`;
        axios.get(url).then(res => { setStuArr(res.data); setStuArrLoading(false) }).catch(err => { console.log(err); Swal.fire({ title: err.message }) });
    }, []);

    const handleIdTyping = e => {
        e.target.value === "" ?
            setSearchArr([])
            :
            setSearchArr(stuArr.filter(element => element.school_id.toString().slice(0, e.target.value.length) === e.target.value));
    };

    const handleFilterActive = status => setActiveStu(status);

    return (
        <div className="mx-2">
            {
                stuArrLoading ?
                    <div className="flex flex-col border-2 border-sky-600 rounded-2xl px-2 pb-2 bg-sky-100 shadow-md gap-1">
                        <div className="p-2 flex flex-col justify-center items-center">
                            <label>
                                <input placeholder="Loading...!" readOnly className="outline outline-sky-300 p-2 rounded-lg text-center font-bold text-lg" />
                            </label>
                            <div className="mt-2 flex justify-center items-center gap-2 font-semibold">
                                <button className={`bg-sky-300 w-32 h-12 rounded-lg shadow-md justify-center items-center flex gap-2`}><h1>All </h1><h1 className="flex justify-center items-center w-9 h-9 bg-sky-700 text-white rounded-full">0</h1></button>
                                <button className={`bg-gray-300 w-32 h-12 rounded-lg shadow-md justify-center items-center flex gap-2`}><h1>Active </h1><h1 className="flex justify-center items-center w-9 h-9 bg-sky-700 text-white rounded-full">0</h1></button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex flex-col border-2 border-sky-600 rounded-2xl px-2 pb-2 bg-sky-100 shadow-md gap-1">
                        <div className="p-2 flex flex-col justify-center items-center">
                            <label htmlFor="stuId">
                                <input onChange={e => handleIdTyping(e)} placeholder="Type Student Id" className="outline outline-sky-300 p-2 rounded-lg text-center font-bold text-lg" pattern="[1-2]{1}[0-4,7-9]{1}[6-9]{1}[0-9]{2}" type="number" name="stuId" id="stuId" step={1} minLength={5} maxLength={5} />
                            </label>
                            <div className="mt-2 flex justify-center items-center gap-2 font-semibold">
                                <button onClick={() => handleFilterActive(false)} className={`${!activeStu ? "bg-sky-300" : "bg-gray-300"} w-32 h-12 rounded-lg shadow-md justify-center items-center flex gap-2`}><h1>All </h1><h1 className="flex justify-center items-center w-9 h-9 bg-sky-700 text-white rounded-full">{searchArr.length}</h1></button>
                                <button onClick={() => handleFilterActive(true)} className={`${activeStu ? "bg-sky-300" : "bg-gray-300"} w-32 h-12 rounded-lg shadow-md justify-center items-center flex gap-2`}><h1>Active </h1><h1 className="flex justify-center items-center w-9 h-9 bg-sky-700 text-white rounded-full">{searchArr.length === 0 ? 0 : searchArr.filter(ele => ele.active_status === true).length}</h1></button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            {
                                activeStu ?
                                    searchArr.filter(ele => ele.active_status === true).map((ele, index) => <Link key={index} to={`/students/details/${ele.school_id}`}><div className={`flex rounded-lg shadow-md gap-1 px-2 py-1 text-left font-semibold ${ele.active_status ? "bg-sky-300 text-sky-700" : "bg-gray-300 text-gray-700"}`}><h1>{ele.school_id}</h1><h1>{ele.stu_name}</h1></div></Link>)
                                    :
                                    searchArr.map((ele, index) => <Link key={index} to={`/students/details/${ele.school_id}`}><div className={`flex rounded-lg shadow-md gap-1 px-2 py-1 text-left font-semibold ${ele.active_status ? "bg-sky-300 text-sky-700" : "bg-gray-300 text-gray-700"}`}><h1>{ele.school_id}</h1><h1>{ele.stu_name}</h1></div></Link>)
                            }
                        </div>
                    </div>
            }
        </div>
    );
};

export default StudentsSearch;