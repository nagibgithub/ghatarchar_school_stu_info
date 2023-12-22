import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import Swal from "sweetalert2";

const useAdmin = () => {

    const [adminLoading, setAdminLoading] = useState(true);
    const [adminStatus, setAdminStatus] = useState(false);
    const { loggedUser } = useAuth();

    useEffect(() => {
        setAdminLoading(true);
        const url = `https://school-student-info-client.vercel.app/user_admin/${loggedUser.uid}`;
        axios.get(url).then(res => { setAdminStatus(res.data.is_admin); setAdminLoading(false) }).catch(err => { console.log(err); Swal.fire({ title: err.message }); setAdminLoading(false); });
    }, [loggedUser]);

    const result = {
        adminLoading,
        adminStatus
    }

    return result;

};

export default useAdmin;