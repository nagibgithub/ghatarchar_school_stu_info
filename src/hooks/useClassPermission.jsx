import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const useClassPermission = () => {

    const [teacherClassLoading, setLoading] = useState(true);
    const [classTeacher, setClassTeacher] = useState(false);
    const { loggedUser } = useAuth();

    useEffect(() => {
        setLoading(true);
        const url = `https://school-student-info-client.vercel.app/user_class_permission/${loggedUser?.uid}`;
        axios.get(url).then(res => { setClassTeacher(res.data.permissions.class_teacher); setLoading(false) }).catch(err => { console.log(err); Swal.fire({ title: err.message }); setLoading(false); });
    }, [loggedUser]);

    const result = {
        teacherClassLoading,
        classTeacher
    }

    return result;




};

export default useClassPermission;