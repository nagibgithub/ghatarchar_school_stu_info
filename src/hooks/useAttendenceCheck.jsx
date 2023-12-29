import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useAttendenceCheck = () => {

    const [loadingAttendenceCheck, setLoadingAttendenceCheck] = useState(true);
    const [attendenceCheckStatus, setAttendenceCheckStatus] = useState({});
    const [lastAttendenceData, setLastAttendenceData] = useState({});
    const [batchId, setBatchId] = useState(null);
    useEffect(() => {
        setLoadingAttendenceCheck(true);
        const url = `https://school-student-info-client.vercel.app/attendence_check/${batchId}`;
        axios.get(url).then(res => { setAttendenceCheckStatus(res.data.message); setLastAttendenceData(res.data); setLoadingAttendenceCheck(false) }).catch(err => { console.log(err); Swal.fire({ title: err.message }) });
    }, [batchId]);

    return {
        setBatchId,
        loadingAttendenceCheck,
        attendenceCheckStatus,
        lastAttendenceData
    };

};

export default useAttendenceCheck;