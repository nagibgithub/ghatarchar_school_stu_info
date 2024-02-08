import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../contents/Loading";
import PageTile from "../../contents/PageTile";
import useDateAndTime from "../../hooks/useDateAndTime";

const StudentMessageGeneralNew = () => {

    const [studentMessageGeneralLoading, setStudentMessageGeneralLoading] = useState(true);
    const [studentMessageGeneralData, setStudentMessageGeneralData] = useState([]);
    useEffect(() => {
        setStudentMessageGeneralLoading(true);
        const url = `https://school-student-info-client.vercel.app/message_student/new`;
        axios.get(url).then(res => { setStudentMessageGeneralData(res.data); setStudentMessageGeneralLoading(false); }).catch(err => { console.log(err); Swal.fire({ title: err.message, icon: "error" }) });
    }, []);

    return (
        <div className="mx-2">
            <PageTile mainTitle={"New Message"} link="/message/student"></PageTile>
            {
                studentMessageGeneralLoading ?
                    <Loading></Loading>
                    :
                    <div className="flex flex-col gap-2">
                        <h1 className="text-center font-bold text-xl my-2 text-sky-800">Total New Message: {studentMessageGeneralData.length}</h1>
                        {
                            studentMessageGeneralData.map((element, index) => <StudentMessageCard key={index} data={element}></StudentMessageCard>)
                        }
                    </div>
            }
        </div>
    );
};

export default StudentMessageGeneralNew;


const StudentMessageCard = ({ data }) => {
    const { convertDateAndTime } = useDateAndTime();
    const { student_info, message_body, message_subject, message_time, sender_info } = data;


    return (
        <div className="bg-sky-100 border-2 rounded-lg shadow-md border-sky-500 p-2">
            <div className="flex justify-between text-sm font-semibold text-sky-600">
                <h1>{convertDateAndTime(message_time, "shortDate")}</h1>
                <h1>{convertDateAndTime(message_time, "shortTime")}</h1>
            </div>
            <div className="flex gap-2 font-bold">
                <h1>{student_info.school_id}</h1>
                <h1>{student_info.stu_name}</h1>
            </div>
            <div className="bg-sky-300 font-semibold text-sm p-2 rounded-lg shadow-md">
                <h1>Sender: {sender_info.teacher_name}</h1>
                <hr />
                <h1 className="capitalize">Subject: {message_subject}</h1>
                <hr />
                <p>{message_body}</p>
            </div>
        </div>
    );
};