import { useParams } from "react-router-dom";
import PageTile from "../../contents/PageTile";
import NextAndPrevButton from "../../contents/NextAndPrevButton";
import StudentMainButtons from "../../contents/StudentMainButtons";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PaymentDetails from "./PaymentDetails";
import StudentMessageComponent from "../../contents/student_message/StudentMessageComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../contents/Loading";

const StudentPaymentHome = () => {

    const stuId = useParams().id;
    const [stuNameLoading, setStuNameLoading] = useState(true);
    const [stuName, setStuName] = useState({});
    const [selectedStudent, setSelectedStudent] = useState({});

    useEffect(() => {
        setStuNameLoading(true);
        const url = `https://school-student-info-client.vercel.app/stu_name/${stuId}`;
        axios.get(url).then(res => { setSelectedStudent({ school_id: stuId, stu_name: res.data.stu_name }); setStuName(res.data.stu_name); setStuNameLoading(false); }).catch(err => { console.log(err); Swal.fire({ title: err.message }) });
    }, [stuId]);

    // const handleMessageStatus = (id) => { setMessageStatus(true); document.getElementById(id).showModal() };

    return (
        <div className="relative">
            <StudentMainButtons studentButtonLoading={stuNameLoading}></StudentMainButtons>
            <PageTile mainTitle={<span>Id: {stuId}</span>} subTitle={stuNameLoading ? "Loading...!" : stuName} link={`/students/details/${stuId}`}></PageTile>
            <NextAndPrevButton stuId={stuId} btnLink={'students/student_payment'}></NextAndPrevButton>

            <PaymentDetails></PaymentDetails>

            <div className="fixed bottom-5 right-5">
                {/* <button onClick={() => handleMessageStatus(stuId)} className="btn btn-circle btn-info"><FontAwesomeIcon icon={faMessage} bounce color="blue" /></button> */}
                <button onClick={() => document.getElementById(stuId).showModal()} className="btn btn-circle btn-info w-14 h-14 shadow-md shadow-sky-400"><FontAwesomeIcon icon={faMessage} bounce color="blue" /></button>
            </div>

            <dialog id={stuId} className="modal">
                <div className="modal-box">
                    <div className="relative">
                        <form method="dialog" className="fixed top-0 right-0">
                            <button className="btn btn-circle btn-error"><FontAwesomeIcon icon={faClose} /></button>
                        </form>
                    </div>
                    <div>
                        {
                            stuNameLoading ?
                                <Loading></Loading>
                                :
                                <StudentMessageComponent studentDataLoading={stuNameLoading} selectedStudent={selectedStudent} handleEditStuId={null}></StudentMessageComponent>
                        }
                    </div>

                    <div>
                        <form method="dialog" className="flex justify-center items-center my-2">
                            <button className="btn btn-error"><FontAwesomeIcon icon={faClose} />Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default StudentPaymentHome;