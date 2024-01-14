import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BatchClassName from "../../../contents/BatchClassName";
import useUserName from "../../../hooks/useUserName";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../contents/Loading";
import toast from "react-hot-toast";

const StudentFeedback = () => {

    const [stuArrLoading, setStuArrLoading] = useState(true);
    const [stuArr, setStuArr] = useState([]);
    const [searchArr, setSearchArr] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [searchStudent, setSearchstudent] = useState(true);
    const [sendToStatus, setSendToStatus] = useState(true);
    const [sendToStatusData, setSendToStatusData] = useState("pickOne");
    const [textAreaTextCount, setTextAreaTextCount] = useState(0);
    const [messageSubject, setMessageSubject] = useState("select-one");
    const auth = useAuth();
    const { loadingUserData, setUserUid, userInfo } = useUserName();

    // console.log(auth.loggedUser.uid);

    useEffect(() => {
        setStuArrLoading(true);
        const url = `https://school-student-info-client.vercel.app/student_id_array`;
        axios.get(url).then(res => { setStuArr(res.data); setStuArrLoading(false) }).catch(err => { console.log(err); Swal.fire({ title: err.message }) });
        setUserUid(auth.loggedUser.uid);
    }, [auth, setUserUid]);

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

    const handleIdTyping = e => {
        e.target.value === "" ?
            setSearchArr([])
            :
            setSearchArr(stuArr.filter(element => element.school_id.toString().slice(0, e.target.value.length) === e.target.value));
    };

    const handleStudenbutton = data => {
        setSearchstudent(false);
        setSelectedStudent(data);
        setSearchArr([]);
    };

    const handleMessageSendTo = e => {
        setSendToStatusData(e.target.value);
        setSendToStatus(false);
    };

    const handleEditStuId = () => {
        setSelectedStudent({});
        setSearchstudent(true);
    };

    const handleMessageSubject = e => setMessageSubject(e.target.value);

    const handleTextAreaValue = e => setTextAreaTextCount(e.target.value.length);

    const handleTextSubmit = e => {
        e.preventDefault();
        if (messageSubject === "select-one") {
            Swal.fire({
                title: "Select a subject plz...!",
                icon: "warning"
            });
        } else if (!userInfo.teacher_uid) {
            toast.error("maybe something is wrong...");
        } else if (sendToStatus === true) {
            Swal.fire({
                title: "Select who see your message?",
                icon: "warning"
            });
        } else {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to send message",
                icon: "question",
                showConfirmButton: true,
                confirmButtonText: "Send",
                showCancelButton: true
            }).then(res => {
                if (res.isConfirmed) {
                    const messageData = {};
                    messageData.messageType = "student_message";
                    messageData.student_info = selectedStudent;
                    messageData.sender_info = { teacher_uid: userInfo.teacher_uid, teacher_name: userInfo.teacher_name };
                    messageData.message_sendTo = sendToStatusData;
                    messageData.message_subject = messageSubject;
                    messageData.message_body = e.target.message.value;
                    messageData.message_time = new Date().getTime();
                    const url = `https://school-student-info-client.vercel.app/message_student`;
                    axios.post(url, messageData).then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Message send successfully",
                                icon: "success",
                            })
                        }
                        console.log(res.data);
                    }).catch(err => { console.log(err); });
                }
            })
        }
    };


    return (

        <div>
            {
                loadingUserData ?
                    <Loading></Loading>
                    :
                    searchStudent ?
                        stuArrLoading ?
                            <div className="flex flex-col border-2 border-sky-600 rounded-2xl p-2 bg-sky-100 shadow-md gap-1">
                                <div className="p-2 flex flex-col justify-center items-center">
                                    <label>
                                        <input defaultValue="Loading...! plz wait" readOnly className="outline outline-sky-300 bg-sky-300 p-2 rounded-lg text-center font-bold text-lg" />
                                    </label>
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
                                    <>
                                        <div className="flex justify-between px-4 py-2 font-bold text-sky-800 bg-sky-200 rounded-xl shadow-md">
                                            <div>
                                                <div><h1>Class: {<BatchClassName batchNo={selectedStudent.school_id.toString()[0] + selectedStudent.school_id.toString()[1]} />}</h1></div>
                                                <div>
                                                    <h1>School Id: {selectedStudent.school_id}</h1>
                                                    <h1>Name: {selectedStudent.stu_name}</h1>
                                                </div>
                                            </div>
                                            <button onClick={() => handleEditStuId()}><FontAwesomeIcon icon={faEdit} /></button>
                                        </div>
                                        <div>
                                            {
                                                sendToStatus ?
                                                    <div className="bg-sky-200 rounded-xl flex justify-center items-center px-4 py-2 my-2 shadow-md">
                                                        <select defaultValue={"pickOne"} onChange={e => handleMessageSendTo(e)} className="select select-bordered w-full">
                                                            <option value={"pickOne"} disabled >Message who see your message</option>
                                                            <option value={"head"}>Only HeadTeacher</option>
                                                            <option value={"teacher"}>All Teacher</option>
                                                        </select>
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
                                                <form onSubmit={e => handleTextSubmit(e)} className="bg-sky-200 px-4 py-2 my-2 shadow-md rounded-xl">
                                                    <div>
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