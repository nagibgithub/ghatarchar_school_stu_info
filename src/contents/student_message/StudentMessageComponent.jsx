import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import Loading from "../Loading";
import StuMessageStuInfo from "./StuMessageStuInfo";

const StudentMessageComponent = ({ studentDataLoading, selectedStudent, handleEditStuId,searchStudent }) => {

    const [sendToStatus, setSendToStatus] = useState(true);
    const [messageSubjectStatus, setMessageSubjectStatus] = useState(true);
    const [sendToStatusData, setSendToStatusData] = useState("pickOne");
    const [textAreaTextCount, setTextAreaTextCount] = useState(0);
    const [messageSubject, setMessageSubject] = useState("select-one");
    const auth = useAuth();

    const getColorClass = (count) => {
        if (count >= 500) {
            return "text-red-700";
        } else if (count >= 450) {
            return "text-orange-700";
        } else if (count >= 400) {
            return "text-orange-600";
        } else if (count >= 300) {
            return "text-yellow-700";
        } else if (count >= 200) {
            return "text-blue-500";
        } else if (count >= 100) {
            return "text-green-600";
        } else {
            return "text-green-700";
        }
    };

    const messageSubjects = [
        { subjectValue: "attendence", subName: "Class Attendence" },
        { subjectValue: "fee", subName: "Tution Fee" },
        { subjectValue: "study", subName: "Study" },
        { subjectValue: "guardian", subName: "Guardian FeedBack" },
        { subjectValue: "dress", subName: "Dress" },
        { subjectValue: "exam", subName: "Exam" },
        { subjectValue: "manner", subName: "Manners" },
        { subjectValue: "other", subName: "Others" },
    ];

    const handleMessageSendTo = e => { setSendToStatusData(e.target.value); setSendToStatus(false); };
    const handleMessageSubject = e => { setMessageSubject(e.target.value); setMessageSubjectStatus(e.target.value === "select-one" ? true : false) };
    const handleTextAreaValue = e => setTextAreaTextCount(e.target.value.length);

    const handleTextSubmit = e => {
        e.preventDefault();
        if (messageSubject === "select-one") {
            Swal.fire({ title: "Select a subject plz...!", icon: "warning" });
        } else if (!auth.loggedUser.uid) {
            toast.error("maybe something is wrong...");
        } else if (sendToStatus === true) {
            Swal.fire({ title: "Select who see your message?", icon: "warning" });
        } else {
            Swal.fire({ title: "Are you sure?", text: "You want to send message", icon: "question", showConfirmButton: true, confirmButtonText: "Send", showCancelButton: true }).then(res => {
                if (res.isConfirmed) {
                    const messageData = {};
                    messageData.messageType = "student_message";
                    messageData.student_info = selectedStudent;
                    messageData.sender_info = { teacher_uid: auth.loggedUser.uid, teacher_name: auth.loggedUser.displayName };
                    messageData.message_sendTo = sendToStatusData;
                    messageData.message_subject = messageSubject;
                    messageData.message_body = e.target.message.value;
                    const url = `https://school-student-info-client.vercel.app/message_student`;
                    axios.post(url, messageData).then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({ title: "Message send successfully", icon: "success" });
                        } else {
                            toast.error("Message not send");
                        }
                    }).catch(err => { console.log(err); toast.error("Message not send"); });
                }
            });
        }
    };

    if (studentDataLoading) {
        return (
            <Loading></Loading>
        )
    } else {
        return (
            <div className="m-1 border p-1 rounded-xl shadow-md bg-sky-100">
                <StuMessageStuInfo searchStudent={searchStudent} handleEditStuId={handleEditStuId} selectedStudent={selectedStudent}></StuMessageStuInfo>
                <div>
                    {
                        sendToStatus ?
                            <div className="bg-sky-200 rounded-xl flex justify-center items-center px-4 py-2 my-2 shadow-md">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text text-sky-700 font-bold">Message sent to:</span>
                                    </div>
                                    <select defaultValue={"pickOne"} onChange={e => handleMessageSendTo(e)} className="select select-bordered w-full">
                                        <option value={"pickOne"} disabled >Select Your Message Privacy</option>
                                        <option value={"head"}>Only HeadTeacher</option>
                                        <option value={"teacher"}>All Teacher</option>
                                    </select>
                                </label>
                            </div>
                            :
                            <div className="flex justify-between my-2 px-4 py-2 font-bold text-sky-800 bg-sky-200 rounded-xl shadow-md">
                                <h1>Send to: {sendToStatusData === "head" ? "Only Head Teacher" : sendToStatusData === "teacher" ? "All Teacher" : "Undefined"}</h1>
                                <button onClick={() => setSendToStatus(true)}><FontAwesomeIcon icon={faEdit} /></button>
                            </div>
                    }
                </div>

                <div>
                    {
                        !sendToStatus &&
                        <>
                            <div>
                                {
                                    messageSubjectStatus ?
                                        <div className="bg-sky-200 px-4 py-2 rounded-xl shadow-md">
                                            <label className="form-control w-full max-w-xs">
                                                <div className="label">
                                                    <span className="label-text text-sky-700 font-bold">Message Subject:</span>
                                                </div>
                                                <select onChange={e => handleMessageSubject(e)} defaultValue={"select-one"} className="select select-bordered">
                                                    <option value={"select-one"} disabled>Pick one</option>
                                                    <option value={"attendence"}>Class Attendence</option>
                                                    <option value={"fee"}>Tution Fee</option>
                                                    <option value={"study"}>Study</option>
                                                    <option value={"guardian"}>Guardian FeedBack</option>
                                                    <option value={"dress"}>Dress</option>
                                                    <option value={"exam"}>Exam</option>
                                                    <option value={"manner"}>Manners</option>
                                                    <option value={"other"}>Others</option>
                                                </select>
                                            </label>
                                        </div>
                                        :
                                        <div className="flex justify-between my-2 px-4 py-2 font-bold text-sky-800 bg-sky-200 rounded-xl shadow-md">
                                            <h1>Subject: {messageSubjects.find(ele => ele.subjectValue === messageSubject).subName}</h1>
                                            <button onClick={() => setMessageSubjectStatus(true)}><FontAwesomeIcon icon={faEdit} /></button>
                                        </div>
                                }
                            </div>
                            <div>
                                {
                                    !messageSubjectStatus &&
                                    <form onSubmit={e => handleTextSubmit(e)} className="bg-sky-200 px-4 py-2 my-2 shadow-md rounded-xl">
                                        <div>
                                            <label className="form-control">
                                                <div className="label">
                                                    <span className="label-text font-bold text-sky-800">Type Your Message:</span>
                                                    <span className={`label-text font-semibold ${getColorClass(textAreaTextCount)}`}>{textAreaTextCount}/500</span>
                                                </div>
                                                <textarea onChange={e => handleTextAreaValue(e)} id="message" className="textarea font-semibold text-sky-700 textarea-bordered h-24" maxLength={500} placeholder="Type here"></textarea>
                                            </label>
                                        </div>
                                        <div className="my-2">
                                            <input className="btn btn-block btn-info shadow-md" type="submit" value="Send" />
                                        </div>
                                    </form>
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        );
    }
};

export default StudentMessageComponent;