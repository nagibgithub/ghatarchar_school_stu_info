import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useDateAndTime from "../../hooks/useDateAndTime";
import { Link } from "react-router-dom";
import PageTile from "../../contents/PageTile";

const LastAttendenceInfoCard = ({ data, batchNo }) => {

    const [userInfo, setUserInfo] = useState(null);
    const [loadingUserData, setLoadingUserData] = useState(true);
    const { convertDateAndTime } = useDateAndTime();

    useEffect(() => {
        setLoadingUserData(true);
        const url = `https://school-student-info-client.vercel.app/teacher_info_uid/${data.teacher_uid}`;
        axios.get(url).then(res => { setUserInfo(res.data); setLoadingUserData(false); }).catch(err => { console.log(err); setLoadingUserData(false); Swal.fire({ title: err.message }); });
    }, [data]);

    return (
        <div className="border-2 bg-red-200 border-red-600 rounded-3xl p-5 flex justify-center items-center flex-col">
            <PageTile mainTitle={"Warning"} subTitle={"Attendence already done"} color="red"></PageTile>
            <div>
                {
                    (loadingUserData === true || userInfo === "" || userInfo === null) ?
                        <div className="flex justify-center items-center gap-2 flex-col">
                            <div className="flex justify-center items-center gap-2">
                                <span className="loading loading-ring loading-lg"></span>
                                <h1 className="capitalize font-bold text-center text-red-800">
                                    <span className="loading loading-bars loading-sm"></span>
                                    <span className="loading loading-bars loading-sm"></span>
                                    <span className="loading loading-bars loading-sm"></span>
                                </h1>
                            </div>
                            <h1 className="capitalize font-bold text-center text-red-800">Teacher Name is loading...!</h1>
                            <h1 className="capitalize font-bold text-center text-red-800">Please Wait</h1>
                            <Link to={`/attendence_today/${batchNo}`}><button className="btn btn-ghost btn-outline">Go to attendence details</button></Link>
                        </div>
                        :
                        <div className="flex justify-center items-center gap-2 flex-col">
                            <div className="flex justify-center items-center gap-2">
                                <img className="rounded-full w-16 shadow-md" src={userInfo.teacher_photo} alt="" />
                                <h1 className="capitalize font-bold text-center text-red-800">{userInfo?.teacher_name}</h1>
                            </div>
                            <h1 className="capitalize font-bold text-center text-red-800">Already call the attendence</h1>
                            <h1 className="capitalize font-bold text-center text-red-800">At: {convertDateAndTime(data?.present_time, "shortTime")}</h1>
                            <Link to={`/attendence_today/${batchNo}`}><button className="btn btn-ghost btn-outline">Go to attendence details</button></Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default LastAttendenceInfoCard;