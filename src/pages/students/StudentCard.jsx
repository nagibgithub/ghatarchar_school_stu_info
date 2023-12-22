import { faArrowRight, faCircle, faMessage } from "@fortawesome/free-solid-svg-icons";
import { IoCall } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import Loading from "../../contents/Loading";
import useDateAndTime from "../../hooks/useDateAndTime";
import { Link } from "react-router-dom";

const StudentCard = ({ stuData, stuDataLoading }) => {

    const [teacherNameLoading, setTeacherNameLoading] = useState(false);
    const { convertDateAndTime } = useDateAndTime();

    const presentLastSummary = stuData.present_data?.length <= 15 ? stuData.present_data : stuData.present_data.slice(stuData.present_data?.length - 15, stuData.present_data?.length);
    const handleMobileCall = phoneNumber => {
        Swal.fire({ title: phoneNumber, showConfirmButton: true, confirmButtonText: "Call", showCancelButton: true }).then(res => {
            if (res.isConfirmed) {
                window.location.href = `tel:${phoneNumber}`;
            }
        });
    };
    const handleAdmissionMessage = admissionData => {
        setTeacherNameLoading(true);
        const url = `https://school-student-info-client.vercel.app/teacher_name/${admissionData?.admission_dataEntry}`;
        axios.get(url).then(res => {
            res.data.teacher_name ?
                Swal.fire({
                    title: stuData.stu_name,
                    text: `Entry: ${res.data.teacher_name}, ${admissionData.admission_message && `Message: ${admissionData.admission_message}`}`
                })
                :
                setTeacherNameLoading(false);
            setTeacherNameLoading(false);
        });
    };


    const handleStudentMessage = message => {
        Swal.fire({
            title: "Last Message",
            text: `Sender: ${message[message.length - 1].message_sender}, ${convertDateAndTime(message[message.length - 1].message_time, "shortTime")}, ${convertDateAndTime(message[message.length - 1].message_time, "shortDate")}, Message: ${message[message.length - 1].message}`,
        });
    };

    return (
        <div className="flex flex-col px-4 py-2 rounded-lg shadow-lg bg-sky-100 border-2 border-sky-700 shadow-slate-600">
            {
                stuDataLoading ?
                    <div>
                        <div className="flex gap-2">
                            <h1 className="font-mono"><span className="loading loading-bars loading-md"></span></h1>
                            <h1><span className="loading loading-bars loading-md"></span> <span className="loading loading-bars loading-md"></span></h1>
                        </div>
                        <hr className="border border-sky-700 my-1" />
                    </div>
                    :
                    <div>
                        <div className="">
                            <h1 className="py-2 shadow-md text-center texl-lg font-bold">{stuData.school_id}</h1>

                            <div className="my-1">
                                <h1 className="text-lg font-bold">{stuData.stu_name}</h1>
                                <h1 className="text-sm">Father: {stuData.father_name}</h1>
                                <h1 className="text-sm">Mother: {stuData.mother_name}</h1>
                            </div>
                            <div className="flex gap-1 justify-center items-center my-1">
                                <button onClick={() => handleMobileCall(stuData.mobile_no)} className={`${stuData.mobile_no ? "btn btn-success" : "btn btn-disabled"}`}>{stuData.mobile_no ? <span>{stuData.mobile_no}</span> : <span className="flex gap-1 justify-center items-center"><IoCall /> Not Set</span>}</button>
                                <button onClick={() => handleMobileCall(stuData.mobile_2)} className={`${stuData.mobile_2 ? "btn btn-success" : "btn btn-disabled"}`}>{stuData.mobile_2 ? <span>{stuData.mobile_2}</span> : <span className="flex gap-1 justify-center items-center"><IoCall /> Not Set</span>}</button>
                            </div>
                        </div>
                        <div className="py-1 my-2 shadow-md border-2 border-sky-50 rounded-lg bg-sky-200">
                            {
                                stuData.present_data?.length === 0 ?
                                    <h1 className="font-bold text-red-500 text-center">Present data is not available</h1>
                                    :
                                    <>
                                        <div className="flex gap-1 justify-center items-center my-2">
                                            {
                                                presentLastSummary.map((pd, index) => <FontAwesomeIcon key={index} icon={faCircle} size="sm" color={pd.present_status ? "green" : "red"} />)
                                            }
                                        </div>
                                    </>
                            }
                        </div>
                        <div className="flex justify-center gap-1">
                            <button disabled={stuData.admission_info?.admission_message ? false : true} onClick={() => handleAdmissionMessage(stuData.admission_info)} className="btn btn-info shadow-md text-lg btn-circle w-20"><FontAwesomeIcon icon={faMessage} /></button>
                            <button disabled={stuData.message?.length === 0 ? true : false} onClick={() => handleStudentMessage(stuData.message)} className="btn btn-info shadow-md text-lg btn-circle w-20"><RiMessage2Fill /></button>
                            <Link to={`/students/details/${stuData.school_id}`}><button className="btn btn-info shadow-md text-lg btn-circle w-20"><FontAwesomeIcon icon={faArrowRight} color="blue" /></button></Link>
                        </div>
                    </div>
            }
            {
                teacherNameLoading &&
                <div className="toast toast-center toast-middle">
                    <div className="bg-sky-100 px-8 py-4 rounded-3xl border-sky-500 border-2 shadow-xl shadow-black">
                        <span><Loading></Loading></span>
                    </div>
                </div>
            }
        </div >
    );
};

export default StudentCard;