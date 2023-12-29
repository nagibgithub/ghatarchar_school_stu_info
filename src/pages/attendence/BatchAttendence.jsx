import { useParams } from "react-router-dom";
import AttendenceMainBody from "./AttendenceMainBody";
import PageTile from "../../contents/PageTile";
import useDateAndTime from "../../hooks/useDateAndTime";
import useAdmin from "../../hooks/useAdmin";
import Loading from "../../contents/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import LastAttendenceInfoCard from "./LastAttendenceInfoCard";

const BatchAttendence = () => {

    sessionStorage.clear();
    const batchId = useParams().batch;
    const { convertDateAndTime } = useDateAndTime();
    const { adminLoading, adminStatus } = useAdmin();

    const [loadingAttendenceCheck, setLoadingAttendenceCheck] = useState(true);
    const [attendenceCheckStatus, setAttendenceCheckStatus] = useState({});
    const [lastAttendenceData, setLastAttendenceData] = useState({});

    useEffect(() => {
        setLoadingAttendenceCheck(true);
        const url = `https://school-student-info-client.vercel.app/attendence_check/${batchId}`;
        axios.get(url).then(res => { setAttendenceCheckStatus(res.data.message); setLastAttendenceData(res.data); setLoadingAttendenceCheck(false) }).catch(err => { console.log(err); Swal.fire({ title: err.message }) });
    }, [batchId]);

    return (
        <div className="px-2">
            {
                adminLoading ?
                    <Loading></Loading>
                    :
                    loadingAttendenceCheck ?
                        <Loading></Loading>
                        :
                        (adminStatus && attendenceCheckStatus === true) ?
                            <AttendenceMainBody batchNo={batchId}></AttendenceMainBody>
                            :
                            (adminStatus && attendenceCheckStatus === false) ?
                                <>
                                    <LastAttendenceInfoCard batchNo={batchId} data={lastAttendenceData}></LastAttendenceInfoCard>
                                    <AttendenceMainBody batchNo={batchId}></AttendenceMainBody>
                                </>
                                :
                                attendenceCheckStatus === false ?
                                    <LastAttendenceInfoCard batchNo={batchId} data={lastAttendenceData}></LastAttendenceInfoCard>
                                    :

                                    (new Date().getHours() < 12 && new Date().getHours() > 9) ?
                                        <AttendenceMainBody batchNo={batchId}></AttendenceMainBody>
                                        :
                                        <div>
                                            <PageTile color="red" mainTitle={"Warning...!"}></PageTile>
                                            <div className="flex flex-col justify-center items-center text-center font-bold">
                                                <h1 className="text-2xl">Now it is</h1>
                                                <h1 className="text-5xl text-red-700">{convertDateAndTime(new Date().getTime(), "shortTime")}</h1>
                                                <h1 className="text-orange-600">It is not the time to call the attendence</h1>
                                            </div>
                                        </div>
            }
        </div>
    );
};

export default BatchAttendence;