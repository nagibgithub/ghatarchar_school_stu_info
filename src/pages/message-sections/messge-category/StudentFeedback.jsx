import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import StudentMessageComponent from "../../../contents/student_message/StudentMessageComponent";

const StudentFeedback = () => {

    const [stuArrLoading, setStuArrLoading] = useState(true);
    const [stuArr, setStuArr] = useState([]);
    const [searchArr, setSearchArr] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [searchStudent, setSearchstudent] = useState(false);

    useEffect(() => {
        setStuArrLoading(true);
        const url = `https://school-student-info-client.vercel.app/student_id_array`;
        axios.get(url).then(res => { setStuArr(res.data); setStuArrLoading(false) }).catch(err => { console.log(err); Swal.fire({ title: err.message }) });
    }, []);

    const handleIdTyping = e => e.target.value === "" ? setSearchArr([]) : setSearchArr(stuArr.filter(element => element.school_id.toString().slice(0, e.target.value.length) === e.target.value));
    const handleStudenbutton = data => { setSelectedStudent(data); setSearchstudent(true); setSearchArr([]); };
    const handleEditStuId = () => { setSelectedStudent({}); setSearchstudent(false); };

    return (

        <div>
            {
                !searchStudent ?
                    stuArrLoading ?
                        <div className="flex flex-col border-2 border-sky-600 rounded-2xl p-2 bg-sky-100 shadow-md gap-1">
                            <div className="p-2 flex flex-col justify-center items-center">
                                <label><input defaultValue="Loading...! plz wait" readOnly className="outline outline-sky-300 bg-sky-300 p-2 rounded-lg text-center font-bold text-lg" /></label>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col border-2 border-sky-600 rounded-2xl p-2 bg-sky-100 shadow-md gap-1">
                            <div className="p-2 flex flex-col justify-center items-center">
                                <label htmlFor="stuId">
                                    <input onChange={e => handleIdTyping(e)} placeholder="Type Student Id" className="outline outline-sky-300 p-2 rounded-lg text-center font-bold text-lg" pattern="[1-2]{1}[0-4,7-9]{1}[6-9]{1}[0-9]{2}" type="number" name="stuId" id="stuId" step={1} minLength={5} maxLength={5} />
                                </label>
                            </div>
                            <div className="flex flex-col gap-2">
                                {
                                    searchArr.map((ele, index) => <button onClick={() => handleStudenbutton(ele)} key={index} className={`flex rounded-lg shadow-md gap-1 px-2 py-1 text-left font-semibold ${ele.active_status ? "bg-sky-300 text-sky-700" : "bg-gray-300 text-gray-700"}`}><h1>{ele.school_id}</h1><h1>{ele.stu_name}</h1></button>)
                                }
                            </div>
                        </div>
                    :
                    <div>
                        {
                            selectedStudent.school_id ?
                                <StudentMessageComponent searchStudent={searchStudent} handleEditStuId={handleEditStuId} selectedStudent={selectedStudent}></StudentMessageComponent>
                                :
                                <div>
                                    <h1 className="font-bold text-center text-lg text-red-400">No student is selected</h1>
                                </div>
                        }
                    </div>
            }
        </div>
    );
};

export default StudentFeedback;