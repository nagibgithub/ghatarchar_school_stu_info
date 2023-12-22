import axios from "axios";
import useDateAndTime from "../../hooks/useDateAndTime";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const AttendenListCard = ({ data }) => {

    const { absent_ids, present_ids, present_time, teacher_uid, _id } = data;
    const { convertDateAndTime } = useDateAndTime();

    const [userInfo, setUserInfo] = useState(null);
    const [loadingUserData, setLoadingUserData] = useState(true);

    useEffect(() => {
        setLoadingUserData(true);
        const url = `https://school-student-info-client.vercel.app/teacher_info_uid/${teacher_uid}`;
        axios.get(url).then(res => { setUserInfo(res.data); setLoadingUserData(false); }).catch(err => { console.log(err); setLoadingUserData(false); Swal.fire({ title: err.message }); });
    }, [teacher_uid]);

    return (
        <>
            <div className="bg-sky-200 collapse shadow-md rounded-2xl">
                <input type="checkbox" name="my-accordion-1" />
                <div className="collapse-title flex flex-col">
                    <h1 className="text-center font-bold">{convertDateAndTime(present_time, "shortDate")}</h1>
                </div>
                <div className="collapse-content">
                    <hr className="border my-2 border-sky-800 rounded-full" />
                    {
                        (loadingUserData === true || userInfo === "" || userInfo === null) ?
                            <h1 className="text-center"><span className="loading loading-bars loading-sm"></span><span className="loading loading-bars loading-sm"></span></h1>
                            :
                            <div>
                                <h1 className="font-semibold capitalize text-center">{userInfo.teacher_name}</h1>
                                <h1 className="font-semibold capitalize text-center">{convertDateAndTime(present_time, "shortTime")}</h1>
                            </div>
                    }
                    <hr className="border my-2 border-sky-800 rounded-full" />
                    <div className="font-bold text-center grid grid-cols-5 justify-center items-center">
                        <div className="col-span-1"></div>
                        <div className="col-span-3">
                            <h1 className="text-green-700">Total Present: {present_ids.length}</h1>
                            <h1 className="text-red-700">Total Absent: {absent_ids.length}</h1>
                        </div>
                        <div className="col-span-1">
                            <Link to={`/attendence/day_details/${_id}`}><button className="btn btn-circle btn-outline"><FontAwesomeIcon icon={faArrowRight} /></button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AttendenListCard;