import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useUserName = () => {

    const [userInfo, setUserInfo] = useState(null);
    const [loadingUserData, setLoadingUserData] = useState(true);
    const [userUid, setUserUid] = useState(null);

    useEffect(() => {
        setLoadingUserData(true);
        const url = `https://school-student-info-client.vercel.app/teacher_info_uid/${userUid}`;
        axios.get(url).then(res => { setUserInfo(res.data); setLoadingUserData(false); }).catch(err => { console.log(err); setLoadingUserData(false); Swal.fire({ title: err.message }); });
    }, [userUid]);

    return {
        setUserUid,
        userInfo,
        loadingUserData
    }
};

export default useUserName;