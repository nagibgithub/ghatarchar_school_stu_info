import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../../contents/Loading";
import useDateAndTime from "../../hooks/useDateAndTime";
import { Link } from "react-router-dom";

const Login = () => {

    const { loggedUser, logOut, googleLogin, loading } = useContext(AuthContext);
    const handleGoogleLogin = () => googleLogin();
    const handleLogout = () => {
        Swal.fire({ title: "Are You Sure?", text: "Your want to log it out", confirmButtonText: "Log Out", showConfirmButton: true, showDenyButton: true, }).then(res => {
            res.isConfirmed ? logOut() : Swal.fire({ title: "You are still log in", timer: 500 });
        });
    };

    return (
        <div className="w-full">
            <div className="flex flex-col justify-center items-center my-2 gap-2">
                {loading ?
                    <>
                        <Loading></Loading>
                    </>
                    :
                    loggedUser ?
                        <>
                            <div>
                                <LoggedUserDataShow handleLogout={handleLogout}></LoggedUserDataShow>
                            </div>
                        </>
                        :
                        <div onClick={() => handleGoogleLogin()} className="flex flex-col p-5 hover:shadow-none border-sky-200 border-4 rounded-3xl shadow-md bg-sky-100 gap-2 justify-center items-center my-5 cursor-pointer">
                            <img className="w-14" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Google Logo" />
                            <h1 className="font-bold text-sky-600 text-3xl">Google Login</h1>
                        </div>
                }
            </div>
        </div>
    );
};

export default Login;

const LoggedUserDataShow = ({ handleLogout }) => {

    const [loggedUserData, setLoggedUserData] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);
    const { loggedUser } = useContext(AuthContext);
    const { convertDateAndTime } = useDateAndTime();

    useEffect(() => {
        setDataLoading(true);
        const url = `https://school-student-info-client.vercel.app/teacher_info_uid/${loggedUser?.uid}`;
        axios.get(url).then(data => { setLoggedUserData(data.data); setDataLoading(false); }).catch(err => console.log(err));
    }, [loggedUser]);

    return (
        <>
            {
                dataLoading ?
                    <Loading></Loading>
                    :
                    <div className="flex flex-col justify-center items-center py-4 gap-2 text-lg font-bold text-sky-800 bg-sky-100 px-4 rounded-lg shadow-lg">
                        <img className="" src={loggedUserData?.teacher_photo} alt={loggedUserData.teacher_name} />
                        <div className="text-center flex flex-col gap-2">
                            <h1>{loggedUserData.teacher_name}</h1>
                            <h1>{loggedUserData.teacher_email}</h1>
                            <div>
                                <h1>Id Creation date: </h1>
                                <h1>{convertDateAndTime(loggedUserData.teacher_idCreation_at, "shortDate")}</h1>
                            </div>
                        </div>
                        <Link to={`/users_update/${loggedUserData._id}`}>
                            <div className="cursor-pointer text-center border-2 rounded-full w-28 h-28 flex justify-center items-center shadow-md bg-green-300">
                                <h1>Update Profile</h1>
                            </div>
                        </Link>
                        <div onClick={handleLogout} className="cursor-pointer border-2 rounded-full w-28 h-28 flex justify-center items-center shadow-md bg-orange-300">
                            <h1 className="font-extrabold text-lg">Log Out</h1>
                        </div>
                    </div>
            }
        </>
    )
}