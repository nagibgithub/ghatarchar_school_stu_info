import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../../contents/Loading";

const Login = () => {
    const [loggedUserData, setLoggedUserData] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);

    const { loggedUser, logOut, googleLogin, loading } = useContext(AuthContext);
    const handleGoogleLogin = () => googleLogin();
    const handleLogout = () => Swal.fire({ title: "Are You Sure?", text: "Your want to log it out", confirmButtonText: "Log Out", showConfirmButton: true, showDenyButton: true, }).then(res => { res.isConfirmed ? logOut() : Swal.fire({ title: "You are still log in", timer: 1000 }) });
    useEffect(() => {
        setDataLoading(true);
        const url = `https://school-student-info-client.vercel.app/teacher_info_uid/${loggedUser?.uid}`;
        axios.get(url).then(data => { setLoggedUserData(data.data); setDataLoading(false); }).catch(err => console.log(err));
    }, [loggedUser]);

    return (
        <div className="w-full">
            <div className="flex flex-col justify-center items-center my-10">
                {loading ?
                    <>
                        <Loading></Loading>
                    </>
                    :
                    loggedUser ?
                        <>
                            {
                                dataLoading ?
                                    <Loading></Loading>
                                    :
                                    loggedUserData ?
                                        <div className="">
                                            <img src={loggedUserData.teacher_photo} alt={loggedUserData.teacher_name} />
                                            <h1>{loggedUserData.teacher_name}</h1>
                                            <h1>{loggedUserData.teacher_email}</h1>
                                            <h1>{loggedUserData.teacher_roll}</h1>
                                        </div>
                                        :
                                        <h1>Something is going wrong maybe</h1>
                            }
                            <div onClick={handleLogout} className="cursor-pointer border-2 rounded-full w-28 h-28 flex justify-center items-center shadow-md bg-orange-300">
                                <h1 className="font-extrabold text-lg">Log Out</h1>
                            </div>
                        </>
                        :
                        <>
                            <img onClick={handleGoogleLogin} className="w-36 cursor-pointer border-2 p-2 rounded-full shadow-md" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="" />
                        </>
                }
            </div>
        </div>
    );
};

export default Login;