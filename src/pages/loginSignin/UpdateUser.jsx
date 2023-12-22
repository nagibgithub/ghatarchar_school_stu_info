import UserDetailsForUpdate from "./UserDetailsForUpdate";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import { useParams } from "react-router-dom";
import Loading from "../../contents/Loading";
import PageTile from "../../contents/PageTile";

const UpdateUser = () => {


    const { loggedUser } = useContext(AuthContext);
    const userId = useParams().id;

    const [userDbId, setUserDbId] = useState(null);
    const [userDataLoading, setUserDataLoading] = useState(true);

    useEffect(() => {
        setUserDataLoading(true);
        const url = `https://school-student-info-client.vercel.app/teacher_id_check/${loggedUser.uid}`;
        axios.get(url).then(res => { setUserDbId(res.data); setUserDataLoading(false) }).catch(err => { console.log(err); setUserDataLoading(false); })
    }, [loggedUser]);

    if (userDataLoading) {
        return (
            <Loading></Loading>
        )
    }

    if (userDbId._id === userId) {
        return (
            <>
                <UserDetailsForUpdate></UserDetailsForUpdate>
            </>
        )
    } else {
        return (
            <>
                <PageTile></PageTile>
                <h1>Something is going wrong maybe</h1>
            </>
        )
    }
};

export default UpdateUser;