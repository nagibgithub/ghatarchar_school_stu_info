import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../contents/Loading";
import axios from "axios";
import useAdmin from "../hooks/useAdmin";
import PageTile from "../contents/PageTile";
import MainButton from "../contents/MainButton";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const EditorRoute = ({ children }) => {

    const [userStatus, setUserStatus] = useState(false);
    const { loggedUser, loading } = useContext(AuthContext);
    const [editorLoading, setEditorLoading] = useState(true);
    const { adminLoading, adminStatus } = useAdmin();

    useEffect(() => {
        setEditorLoading(true);
        const url = `https://school-student-info-client.vercel.app/user_is_editor/${loggedUser.uid}`;
        axios.get(url).then(res => { setUserStatus(res.data.permissions.is_editor); setEditorLoading(false) }).catch(err => { console.log(err); setEditorLoading(false) });
    }, [loggedUser]);

    if (loading) {
        return (
            <Loading></Loading>
        )
    }

    if (adminLoading) {
        return <Loading></Loading>
    }

    if (adminStatus) {
        return children
    }

    if (editorLoading) {
        return (
            <Loading></Loading>
        )
    }

    if (userStatus) {
        return children
    }

    return (
        <div className="flex justify-center items-center text-center flex-col my-2">
            <PageTile mainTitle={"Warning...!"} subTitle={""} color="red"></PageTile>
            <img className="w-24" src="https://img.freepik.com/free-vector/warning-sign-gradient-shine_78370-1774.jpg" alt="" />
            <img className="w-40" src="https://img.freepik.com/free-vector/two-red-stop-signs-set_78370-1291.jpg" alt="" />
            <div className="px-5 flex flex-col gap-5 py-5 m-5 bg-yellow-200 font-bold">
                <h1 className="text-red-600">Please contact with HeadTeacher</h1>
                <h1 className="text-red-600">Entry Restricted</h1>
            </div>
            <Link to={'/'}><MainButton btn_name={<FaHome />} title={"Return Home"}></MainButton></Link>
        </div>
        // <Navigate to={'/'} replace></Navigate>
    )
};

export default EditorRoute;