import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PageTile from "../../contents/PageTile";
import { batchName } from "../../contents/batchAndClass";
import Loading from "../../contents/Loading";
import StudentsDetailsComponents from "../../contents/StudentsDetailsComponents";
import useDateAndTime from "../../hooks/useDateAndTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import StudentMainButtons from "../../contents/StudentMainButtons";
import StuPaymentCard from "./StuPaymentCard";

const StudentDetailsInfo = () => {

    const stuId = useParams().id;

    const [stuDataLoading, setStuDataLoading] = useState(true);
    const [stuData, setStuData] = useState({});
    const { convertDateAndTime } = useDateAndTime();
    const presentLastSummary = stuData.present_data?.length <= 15 ? stuData.present_data : stuData.present_data?.slice(stuData.present_data?.length - 15, stuData.present_data?.length);

    useEffect(() => {
        setStuDataLoading(true);
        const url = `https://school-student-info-client.vercel.app/student/${stuId}`;
        axios.get(url).then(res => { setStuDataLoading(false); setStuData(res.data); }).catch(err => { console.log(err); Swal.fire({ title: err.message }) });
    }, [stuId]);

    return (
        <div className="mx-2">
            <StudentMainButtons studentButtonLoading={stuDataLoading}></StudentMainButtons>
            {
                stuDataLoading ?
                    <PageTile link="/students/search" mainTitle={"Loading..."} subTitle={"Loading..."}></PageTile>
                    :
                    <PageTile link={`/students/attendence_info/${stuData.batch_no}`} mainTitle={stuData.school_id} subTitle={`Class: ${batchName[stuData.batch_no]}`}></PageTile>
            }
            {
                stuDataLoading ?
                    <Loading></Loading>
                    :
                    <div>
                        <h1 className="font-bold text-2xl text-center text-sky-700">{stuData.stu_name}</h1>
                        <div>
                            <StuPaymentCard stuId={stuData.school_id}></StuPaymentCard>
                        </div>
                        <StudentsDetailsComponents stuData={stuData}></StudentsDetailsComponents>

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



                        <div className="border-2 border-orange-600 bg-orange-200 rounded-3xl p-4 my-2">
                            {
                                stuData.admission_info ?
                                    <>
                                        <h1 className="font-bold">Admission Info:</h1>
                                        <h1 className="font-bold">{convertDateAndTime(stuData.admission_info.admission_date, "shortTime")}, {convertDateAndTime(stuData.admission_info.admission_date, "shortDate")}</h1>
                                        <h1 className="font-bold">{stuData.admission_info.admission_message !== "" && stuData.admission_info.admission_message}</h1>
                                    </>
                                    :
                                    <h1 className="font-bold text-gray-400">Admission Info is not available</h1>
                            }
                        </div>
                        <div>
                            {
                                stuData.message?.length === 0 ?
                                    <>
                                    </>
                                    :
                                    stuData.message.map((ele, index) => <div key={index} className="border-2 border-sky-600 bg-sky-200 rounded-3xl p-4 my-2">
                                        <h1 className="font-semibold">{convertDateAndTime(ele.message_time, "shortTime")}, {convertDateAndTime(ele.message_time, "shortDate")}</h1>
                                        <h1 className="capitalize text-sky-600 font-bold">{ele.message_sender}:</h1>
                                        <h1>{ele.message}</h1>
                                    </div>)
                            }
                        </div>

                        <div className="flex justify-center my-2">
                            <Link to={`/student_info/${stuData.school_id}`}><button className="btn btn-success">Update Information</button></Link>
                        </div>
                    </div>
            }
        </div>
    );
};

export default StudentDetailsInfo;