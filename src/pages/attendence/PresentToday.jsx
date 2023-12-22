import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../contents/Loading";
import useDateAndTime from "../../hooks/useDateAndTime";
import useUserName from "../../hooks/useUserName";
import HorizonLine from "../../contents/HorizonLine";
import PageTile from "../../contents/PageTile";
import StudentAttendCard from "./StudentAttendCard";

const PresentToday = () => {

    const batchId = useParams().batchId;
    const [presentDbData, setPresentDbData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { convertDateAndTime } = useDateAndTime();
    const { loadingUserData, setUserUid, userInfo } = useUserName();

    useEffect(() => {
        setLoading(true);
        const url = `https://school-student-info-client.vercel.app/batch_last_presentDb/${batchId}`;
        axios.get(url).then(res => {
            setPresentDbData(res.data);
            setUserUid(res.data.teacher_uid);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, [batchId, setUserUid]);

    return (
        <>
            <PageTile mainTitle={"Last Attendence"} subTitle={"Summary"}></PageTile>
            <div>
                {
                    loading ?
                        <Loading></Loading>
                        :
                        <>
                            <HorizonLine></HorizonLine>
                            <div className="flex flex-col gap-2 font-semibold text-lg text-center">
                                <h1>{convertDateAndTime(presentDbData.present_time, "shortDate")}</h1>
                                <h1>{convertDateAndTime(presentDbData.present_time, "shortTime")}</h1>
                            </div>
                            <HorizonLine></HorizonLine>
                            <div>
                                {
                                    (loadingUserData === true || userInfo === "" || userInfo === null) ?
                                        <Loading></Loading>
                                        :
                                        <h1 className="capitalize font-bold text-center text-lg text-sky-800">{userInfo?.teacher_name}</h1>
                                }
                            </div>
                            <HorizonLine></HorizonLine>
                            <h1 className="text-lg font-bold text-center text-green-700">Present Student: {presentDbData.present_ids.length}</h1>
                            <div className="flex flex-col gap-1">
                                {
                                    presentDbData.present_ids.map((pd, index) => <StudentAttendCard present_full_data={presentDbData} present_time={presentDbData.present_time} setLoading={setLoading} setPresentData={setPresentDbData} present={true} data={pd} key={index}></StudentAttendCard>)
                                }
                            </div>
                            <HorizonLine></HorizonLine>
                            <h1 className="text-lg font-bold text-center text-red-700">Absent Student: {presentDbData.absent_ids.length}</h1>
                            <div className="flex flex-col gap-1">
                                {
                                    presentDbData.absent_ids.map((pd, index) => <StudentAttendCard present_full_data={presentDbData} present_time={presentDbData.present_time} setLoading={setLoading} setPresentData={setPresentDbData} present={false} data={pd} key={index}></StudentAttendCard>)
                                }
                            </div>
                            <HorizonLine></HorizonLine>
                        </>
                }
            </div>
        </>
    );
};

export default PresentToday;