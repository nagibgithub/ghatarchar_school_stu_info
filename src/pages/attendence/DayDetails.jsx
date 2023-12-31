import { useEffect, useState } from "react";
import Loading from "../../contents/Loading";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useUserName from "../../hooks/useUserName";
import BatchClassName from "../../contents/BatchClassName";
import AttendenceDetailsCard from "./AttendenceDetailsCard";
import PageTile from "../../contents/PageTile";

const DayDetails = () => {

    const [dayData, setDayData] = useState(null);
    const [loading, setLoading] = useState(true);
    const dayId = useParams().id;
    const { loadingUserData, setUserUid, userInfo } = useUserName();
    useEffect(() => {
        setLoading(true);
        const url = `https://school-student-info-client.vercel.app/day_details/${dayId}`;
        axios.get(url).then(res => { setDayData(res.data); setUserUid(res.data.teacher_uid); setLoading(false); }).catch(err => { console.log(err); Swal.fire({ title: err.message }) });
    }, [dayId, setUserUid]);

    return (
        <div>
            {
                loading ?
                    <>
                        <PageTile mainTitle={<span>Class: Loading...!</span>}></PageTile>
                        <Loading></Loading>
                    </>
                    :
                    <>
                        <PageTile link={`/attendence/attendence_list/${dayData.batch_no}`} mainTitle={<span>Class: {<BatchClassName batchNo={dayData.batch_no}></BatchClassName>}</span>} ></PageTile>
                        <AttendenceDetailsCard loadingUserData={loadingUserData} presentDbData={dayData} setLoading={setLoading} setPresentDbData={setDayData} userInfo={userInfo}></AttendenceDetailsCard>
                    </>
            }
        </div>
    );
};

export default DayDetails;


// const PresentStudent = ({ pd, present }) => {

//     const [stuData, setStuData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     useEffect(() => {
//         setLoading(true);
//         const url = `https://school-student-info-client.vercel.app/student_id/${pd}`;
//         axios.get(url).then(res => { setStuData(res.data); setLoading(false) }).catch(err => { console.log(err); setLoading(false); });
//     }, [pd]);

//     return (
//         <div className={`flex gap-2 border-2 ${present ? "border-green-700" : "border-red-700"} rounded-full px-4 py-2 font-semibold ${present ? "bg-green-200" : "bg-red-200"}`}>
//             {
//                 loading ?
//                     <h1><span className="loading loading-bars loading-sm"></span> <span className="loading loading-bars loading-sm"></span> <span className="loading loading-bars loading-sm"></span></h1>
//                     :
//                     <>
//                         <h1>{stuData.school_id}</h1>
//                         <h1>{stuData.stu_name}</h1>
//                     </>
//             }
//         </div>
//     )
// }











// <>
//     <hr className="border-blue-800 my-2" />
//     <div className="flex flex-col gap-2 font-semibold text-lg text-center">
//         <h1>{convertDateAndTime(dayData.present_time, "shortDate")}</h1>
//         <h1>{convertDateAndTime(dayData.present_time, "shortTime")}</h1>
//     </div>
//     <hr className="border-blue-800 my-2" />
//     <div>
//         {
//             (loadingUserData === true || userInfo === "" || userInfo === null) ?
//                 <Loading></Loading>
//                 :
//                 <div className="flex justify-center items-center gap-2">
//                     <img className="rounded-full w-20 shadow-md" src={userInfo.teacher_photo} alt="" />
//                     <h1 className="capitalize font-bold text-center text-lg text-sky-800">{userInfo?.teacher_name}</h1>
//                 </div>
//         }
//     </div>
//     <hr className="border-blue-800 my-2" />
//     <h1 className="my-3 text-center font-bold text-green-700 text-xl">Present Student {dayData.present_ids.length}</h1>
//     <div className="flex flex-col gap-1">
//         {
//             dayData.present_ids.map((pd, index) => <StudentAttendCard key={index} data={pd} present={true} present_full_data={dayData} setLoading={setLoading} setPresentData={setDayData} present_time={dayData.present_time}></StudentAttendCard>)
//         }
//     </div>
//     <hr className="border-blue-800 my-2" />
//     <div className="">
//         <h1 className="my-3 text-center font-bold text-red-700 text-xl">Absent Student {dayData.absent_ids.length}</h1>
//     </div>
//     <div className="flex flex-col gap-1">
//         {
//             dayData.absent_ids.map((pd, index) => <StudentAttendCard key={index} data={pd} present={false} present_full_data={dayData} setLoading={setLoading} setPresentData={setDayData} present_time={dayData.present_time}></StudentAttendCard>)
//         }
//     </div>
//     <hr className="border-blue-800 my-2" />
// </>