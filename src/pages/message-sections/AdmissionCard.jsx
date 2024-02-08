import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useDateAndTime from "../../hooks/useDateAndTime";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";
import batchNameInCode from "../../contents/batchNameInCode";

const AdmissionCard = ({ data }) => {

    const { admission_info, school_id, stu_name, _id } = data;
    const { admission_date, admission_message, markAsRead } = admission_info;
    const { convertDateAndTime } = useDateAndTime();
    const [markAsReadLoading, setMarkAsReadLoading] = useState(false);
    const [markAsReadStatus, setMarkAsReadStatus] = useState(markAsRead);

    const handleMarkAsRead = id => {
        Swal.fire({ icon: "question", title: "Mark As Read...?", showConfirmButton: true, confirmButtonText: "Mark as Read", showCancelButton: true }).then(res => {
            if (res.isConfirmed) {
                setMarkAsReadLoading(true);
                const url = `https://school-student-info-client.vercel.app/stu_new_admission_mark_as_read/${id}`;
                axios.patch(url, { markAsRead: true }).then(res => {
                    if (res.data.modifiedCount === 1) {
                        toast.success("Marked As Read");
                        setMarkAsReadStatus(true);
                        setMarkAsReadLoading(false);
                    }
                }).catch(err => { console.log(err); setMarkAsReadLoading(false) });
            }
        });

    };

    return (
        <div className="border-2 border-orange-600 p-2 rounded-xl shadow-md bg-orange-100 flex flex-col gap-2">
            <div className="flex justify-between">
                <h1 className="font-semibold text-sm">{convertDateAndTime(admission_date, "shortDate")}</h1>
                <h1 className="font-semibold text-sm">{convertDateAndTime(admission_date, "shortTime")}</h1>
                {
                    markAsReadLoading ?
                        <button className="btn btn-xs">Loading...!</button>
                        :
                        markAsReadStatus ?
                            <button className="btn btn-xs btn-circle btn-success"><FontAwesomeIcon icon={faCheck} /></button>
                            :
                            <button onClick={() => handleMarkAsRead(_id)} className="btn btn-xs">Mark As Read</button>
                }
            </div>
            <div className="flex gap-1 font-bold">
                <h1>{school_id}</h1>
                <h1>{stu_name}</h1>
            </div>
            <div className="font-bold text-green-800 flex justify-between items-center">
                <h1>Class: {batchNameInCode[school_id.toString()[0] + school_id.toString()[1]]}</h1>
                <Link to={`/students/details/${school_id}`}><button className="btn btn-circle btn-sm btn-info shadow-md border-2 border-sky-800"><FontAwesomeIcon icon={faArrowRight} /></button></Link>
            </div>
            <div><p>{admission_message}</p></div>
        </div>
    );
};
export default AdmissionCard;