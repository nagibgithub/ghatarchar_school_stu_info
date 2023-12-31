import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../contents/Loading";
import useUserName from "../../hooks/useUserName";
import PageTile from "../../contents/PageTile";
import BatchClassName from "../../contents/BatchClassName";
import AttendenceDetailsCard from "./AttendenceDetailsCard";

const PresentToday = () => {

    const batchId = useParams().batchId;
    const [presentDbData, setPresentDbData] = useState([]);
    const [loading, setLoading] = useState(true);
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
        <div className="mx-1">
            <PageTile mainTitle={<span>Class: <BatchClassName batchNo={batchId}></BatchClassName></span>} subTitle={"Last Attendence"}></PageTile>
            <div>
                {
                    loading ?
                        <Loading></Loading>
                        :
                        <AttendenceDetailsCard loadingUserData={loadingUserData} presentDbData={presentDbData} setLoading={setLoading} setPresentDbData={setPresentDbData} userInfo={userInfo}></AttendenceDetailsCard>
                }
            </div>
        </div>
    );
};

export default PresentToday;