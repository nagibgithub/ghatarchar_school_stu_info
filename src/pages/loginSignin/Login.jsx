import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../../contents/Loading";

const Login = () => {

    const { loggedUser, logOut, googleLogin, loading } = useContext(AuthContext);
    const handleGoogleLogin = () => googleLogin();
    const handleLogout = () => {
        Swal.fire({ title: "Are You Sure?", text: "Your want to log it out", confirmButtonText: "Log Out", showConfirmButton: true, showDenyButton: true, }).then(res => {
            res.isConfirmed ? logOut() : Swal.fire({ title: "You are still log in", timer: 1000 });
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
                            <LoggedUserDataShow></LoggedUserDataShow>
                            <div>
                                <HandleLogOut handleLogout={handleLogout}></HandleLogOut>
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

const LoggedUserDataShow = () => {

    const [loggedUserData, setLoggedUserData] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);
    const { loggedUser } = useContext(AuthContext);

    useEffect(() => {
        setDataLoading(true);
        const url = `http://localhost:3000/teacher_info_uid/${loggedUser?.uid}`;
        axios.get(url).then(data => { setLoggedUserData(data.data); setDataLoading(false); }).catch(err => console.log(err));
    }, [loggedUser]);

    return (
        <>
            {
                dataLoading ?
                    <Loading></Loading>
                    :
                    <div className="flex flex-col justify-center items-center py-4 gap-2 text-lg font-bold text-sky-800 bg-sky-200 px-4 rounded-lg shadow-lg">
                        <img className="" src={loggedUserData.teacher_photo} alt={loggedUserData.teacher_name} />
                        <div className="text-center flex flex-col gap-2">
                            <h1>{loggedUserData.teacher_name}</h1>
                            <h1>{loggedUserData.teacher_email}</h1>
                            <h1>{loggedUserData.teacher_roll}</h1>
                        </div>
                    </div>
            }
        </>
    )
}

// const LastLoginInfo = ({ lastLoggedTime }) => {

//     // lastLoggedTime.forEach(element => {
//     //     console.log((new Date(parseInt(element))));
//     // });

//     return (
//         <>
//             <div className="text-center font-mono">
//                 {
//                     lastLoggedTime.map((el, index) => <h1 key={index}>{(new Date(parseInt(el))).toDateString()} -- {(new Date(parseInt(el))).toLocaleTimeString()}</h1>)
//                 }
//             </div>
//         </>
//     );
// };

const HandleLogOut = ({ handleLogout }) => {
    return (
        <div onClick={handleLogout} className="cursor-pointer border-2 rounded-full w-28 h-28 flex justify-center items-center shadow-md bg-orange-300">
            <h1 className="font-extrabold text-lg">Log Out</h1>
        </div>
    );
}