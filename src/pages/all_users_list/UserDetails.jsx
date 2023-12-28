import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../contents/Loading";
import axios from "axios";
import Swal from "sweetalert2";
import useDateAndTime from "../../hooks/useDateAndTime";
import UserClassAccess from "./UserClassAccess";
import { faRotate, faTrash } from "@fortawesome/free-solid-svg-icons";
import HorizonLine from "../../contents/HorizonLine";
import PageTile from "../../contents/PageTile";

const UserDetails = () => {

    const userUid = useParams().id;
    const navigation = useNavigate();
    const { convertDateAndTime } = useDateAndTime();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [changeEditorLoading, setEditorLoading] = useState(false);
    const [editorStatus, setEditorStatus] = useState(false);

    useEffect(() => {
        setLoading(true);
        const url = `https://school-student-info-client.vercel.app/teacher_info/${userUid}`;
        axios.get(url).then(res => { setUserData(res.data); setEditorStatus(res.data.permissions.is_editor); setLoading(false); }).catch(err => { console.log(err); setLoading(false); Swal.fire({ title: `${err.message}` }) });
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
                });
            }
        });
    };

    const handleChangeEditor = uid => {
        Swal.fire({ title: `Change Editor`, text: `${editorStatus ? "Remove Editor Permission" : "Give Editor Permission"}`, showConfirmButton: true, showCancelButton: true, confirmButtonText: `${editorStatus ? "Remove Editor" : "Make Editor"}`, confirmButtonColor: `${editorStatus ? "red" : "green"}`, }).then(res => {
            if (res.isConfirmed) {
                setEditorLoading(true);
                const url = `https://school-student-info-client.vercel.app/user_is_editor/${uid}`;
                axios.patch(url, { is_editor: !editorStatus }).then(res => {
                    if (res.data.modifiedCount === 1) {
                        Swal.fire({ title: "Successfully Change Editor", timer: 1500 });
                        setEditorStatus(!editorStatus);
                        setEditorLoading(false);
                    } else {
                        Swal.fire({ title: "Something is going wrong...!", timer: 2000 });
                        setEditorLoading(false);
                    }
                });
            } else {
                Swal.fire({ title: "Status not changed...!", timer: 2000 });
                setEditorLoading(false);
            }
        })
    };


    return (
        <div>
            {
                loading ?
                    <PageTile mainTitle="Loading...!" subTitle="Loading...!"></PageTile>
                    :
                    <PageTile link="/users" mainTitle={userData.teacher_name} subTitle={userData.teacher_email}></PageTile>
            }
            {
                loading ?
                    <Loading></Loading>
                    :
                    <>
                        <HorizonLine></HorizonLine>

                        <div className="flex flex-col justify-center items-center">
                            <img className="w-fit" src={userData.teacher_photo} alt="" />
                        </div>


                        {/* <div className="flex flex-col justify-center items-center">
                            <h1 className="font-bold"><span className="text-2xl text-sky-900">{userData.teacher_name}</span></h1>
                            <h1 className="font-bold"><span className="text-sky-900 font-mono">{userData.teacher_email}</span></h1>
                        </div> */}


                        <HorizonLine></HorizonLine>

                        <div className="flex flex-col justify-center items-center gap-1 text-xl">
                            <h1 className="font-bold">Id Creation date</h1>
                            <h1 className="font-bold"><span className="text-sky-900">{convertDateAndTime(userData.teacher_idCreation_at, "shortDate")}</span> - <span className="text-sky-900">{convertDateAndTime(userData.teacher_idCreation_at, "shortTime")}</span></h1>

                        </div>

                        <HorizonLine></HorizonLine>

                        <div>

                            {/* class teacher */}
                            <UserClassAccess classAccessArr={userData.permissions.class_teacher} teacherID={userData._id}></UserClassAccess>

                            <HorizonLine></HorizonLine>

                            {/* admin */}
                            <div>
                            </div>

                            {/* editor */}
                            <div>
                                <div className="flex gap-5 justify-center items-center text-lg">
                                    {
                                        changeEditorLoading ?
                                            <>
                                                <h1 className={`font-bold`}><span className="loading loading-bars loading-sm"></span> <span className="loading loading-bars loading-sm"></span></h1>
                                                <button className={`btn btn-circle ${editorStatus ? "btn-error" : "btn-success"}`}><FontAwesomeIcon icon={faRotate} spin /></button>
                                            </>
                                            :
                                            <>
                                                <h1 className={`${editorStatus ? "text-green-700" : "text-red-700"} font-bold`}>{editorStatus ? "Editor" : "Not Editor"}</h1>
                                                <button onClick={() => handleChangeEditor(userData.teacher_uid)} className={`btn btn-circle ${editorStatus ? "btn-error" : "btn-success"}`}><FontAwesomeIcon icon={faRotate} /></button>
                                            </>
                                    }
                                </div>
                            </div>

                            {/* visitor */}
                            <div>

                            </div>

                        </div>

                        <HorizonLine></HorizonLine>
                        <div className="flex justify-center items-center my-5">
                            <button onClick={() => handleDeleteUser(userUid)} className="btn btn-error btn-lg shadow-md"><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                        <HorizonLine></HorizonLine>
                    </>
            }
        </div>
    );
};

export default UserDetails;