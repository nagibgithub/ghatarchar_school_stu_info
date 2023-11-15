import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../contents/Loading";
import axios from "axios";
import Swal from "sweetalert2";
import useDateAndTime from "../../hooks/useDateAndTime";
import UserClassAccess from "./UserClassAccess";

const UserDetails = () => {

    const userUid = useParams().id;
    const navigation = useNavigate();

    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const url = `https://school-student-info-client.vercel.app/teacher_info/${userUid}`;
        axios.get(url).then(res => { setUserData(res.data); setLoading(false); }).catch(err => { console.log(err); setLoading(false); Swal.fire({ title: `${err.message}` }) });
    }, [userUid]);

    const handleDeleteUser = id => {
        Swal.fire({ title: `Delete <br/> ${userData.teacher_name}?`, imageUrl: userData.teacher_photo, text: "Are you sure?", showConfirmButton: true, showCancelButton: true, confirmButtonText: "Delete", confirmButtonColor: "#ff0000" }).then(res => {
            if (res.isConfirmed) {
                Swal.fire({ title: "Enter your password", input: "password", inputLabel: "Password", inputPlaceholder: "Enter your password", inputAttributes: { maxlength: "10", autocapitalize: "off", autocorrect: "off" } }).then(res => {
                    if (res.isConfirmed) {
                        if (res.value === "7317279") {
                            axios.delete(`https://school-student-info-client.vercel.app/teacher/${id}`).then(res => {
                                if (res.data.deletedCount === 1) {
                                    Swal.fire({ title: "Successfully removed", icon: "success", timer: 1500 });
                                    navigation('/users');
                                } else {
                                    Swal.fire({ title: "Somethig is going wrong" })
                                }
                            }).catch(err => console.log(err));
                        } else {
                            Swal.fire({ title: "Your Password is not matched", timer: 1500 })
                        }
                    }
                })
            }
        })
    }

    const { convertDateAndTime } = useDateAndTime();
    // console.log();



    return (
        <div>
            <div className="flex items-center">
                <button onClick={() => history.back()} className="btn btn-info"><FontAwesomeIcon icon={faArrowLeft} /></button>
            </div>
            {
                loading ?
                    <Loading></Loading>
                    :
                    <>
                        <hr className="border-2 rounded-full border-sky-800 my-4" />

                        <div className="flex flex-col justify-center items-center">
                            <img className="w-fit" src={userData.teacher_photo} alt="" />
                        </div>

                        <hr className="border-2 rounded-full border-sky-800 my-4" />

                        <div className="flex flex-col justify-center items-center">
                            <h1 className="font-bold"><span className="text-2xl text-sky-900">{userData.teacher_name}</span></h1>
                            <h1 className="font-bold"><span className="text-sky-900 font-mono">{userData.teacher_email}</span></h1>
                        </div>

                        <hr className="border-2 rounded-full border-sky-800 my-4" />

                        <hr className="border-2 rounded-full border-sky-800 my-4" />

                        <div className="flex flex-col justify-center items-center gap-1 text-xl">
                            <h1 className="font-bold">Id Creation date</h1>
                            <h1 className="font-bold"><span className="text-sky-900">{convertDateAndTime(userData.teacher_idCreation_at, "shortDate")}</span> - <span className="text-sky-900">{convertDateAndTime(userData.teacher_idCreation_at, "shortTime")}</span></h1>

                        </div>

                        <hr className="border-2 rounded-full border-sky-800 my-4" />

                        <div>

                            {/* class teacher */}
                            <UserClassAccess classAccessArr={userData.class_teacher} teacherID={userData._id}></UserClassAccess>

                            <hr className="border-2 rounded-full border-sky-800 my-4" />

                            {/* admin */}
                            <div>
                            </div>

                            {/* editor */}
                            <div>

                            </div>

                            {/* visitor */}
                            <div>

                            </div>



                        </div>

                        <hr className="border-2 rounded-full border-sky-800 my-4" />

                        <div>
                            <button onClick={() => handleDeleteUser(userUid)} className="btn btn-circle btn-error shadow-md"><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </>
            }
        </div>
    );
};

export default UserDetails;