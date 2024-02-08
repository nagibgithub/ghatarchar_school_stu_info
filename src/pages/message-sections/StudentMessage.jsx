import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageTile from "../../contents/PageTile";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MainButton from "../../contents/MainButton";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const StudentMessage = () => {

    return (
        <div className="flex justify-center items-center flex-col mx-2">
            <PageTile link="/message" mainTitle={"Student Message"}></PageTile>
            <div className="grid justify-center items-center gap-2 grid-cols-2">
                <AdmissionMessageButton></AdmissionMessageButton>
                <AllNewAdmission></AllNewAdmission>
                <StudentMessageSection></StudentMessageSection>
            </div>
        </div>
    );
};

export default StudentMessage;

const AdmissionMessageButton = () => {

    const [numberOfMessages, setNumberOfMessages] = useState(0);
    const [messageNumberLoading, setMessageNumberLoading] = useState(true);

    useEffect(() => {
        setMessageNumberLoading(true);
        const url = `https://school-student-info-client.vercel.app/stu_new_admission_message_number`;
        axios.get(url).then(res => { setNumberOfMessages(res.data.message); setMessageNumberLoading(false) }).catch(err => { console.log(err); });
    }, []);

    return (
        <>
            <Link to={numberOfMessages === 0 ? "" : "/message/student/admission"} className="indicator">
                {
                    messageNumberLoading ?
                        <div className="indicator-item">
                            <span className="loading loading-ring loading-md"></span>
                        </div>
                        :
                        <span className={`indicator-item indicator-top badge ${numberOfMessages === 0 ? "badge-success" : "badge-secondary"}`}>{numberOfMessages}</span>
                }
                <MainButton btn_name={<FontAwesomeIcon icon={faMessage} />} title={"New Admission"}></MainButton>
            </Link>
        </>
    );
};

const AllNewAdmission = () => {

    const [newAdmission, setNewAdmission] = useState(0);
    const [newAdmissionLoading, setNewAdmissionLoading] = useState(true);

    useEffect(() => {
        setNewAdmissionLoading(true);
        const url = `https://school-student-info-client.vercel.app/stu_new_admission_number`;
        axios.get(url).then(res => { setNewAdmission(res.data.admission); setNewAdmissionLoading(false) }).catch(err => { console.log(err); });
    }, []);

    return (
        <>
            <Link to={newAdmission === 0 ? "" : "/message/student/all_admission"} className="indicator">
                {
                    newAdmissionLoading ?
                        <div className="indicator-item">
                            <span className="loading loading-ring loading-md"></span>
                        </div>
                        :
                        <span className={`indicator-item indicator-top badge ${newAdmission === 0 ? "badge-success" : "badge-secondary"}`}>{newAdmission}</span>
                }
                <MainButton btn_name={<FontAwesomeIcon icon={faMessage} />} title={"All Admission"}></MainButton>
            </Link>
        </>
    );
};

const StudentMessageSection = () => {

    const [studentGeneralMessageData, setStuGeneralMessageData] = useState(0);
    const [stuMessageLoading, setStudentMessageLoading] = useState(true);

    useEffect(() => {
        setStudentMessageLoading(true);
        const url = `https://school-student-info-client.vercel.app/message_student/new_count`;
        axios.get(url).then(res => { setStuGeneralMessageData(res.data.message); setStudentMessageLoading(false); }).catch(err => { console.log(err); Swal.fire({ title: err.message, icon: "error" }) });
    }, []);

    return (
        <>
            <Link to={studentGeneralMessageData !== 0 && '/message/student/general/new'} className="indicator">
                {
                    stuMessageLoading ?
                        <div className="indicator-item">
                            <span className="loading loading-ring loading-md"></span>
                        </div>
                        :
                        <span className={`indicator-item indicator-top badge ${studentGeneralMessageData === 0 ? "badge-success" : "badge-secondary"}`}>{studentGeneralMessageData}</span>
                }
                <MainButton btn_name={<FontAwesomeIcon icon={faMessage} />} title={"New Message"}></MainButton>
            </Link>
        </>
    );
};

