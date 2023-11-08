import { faArrowRight, faArrowsRotate, faCircleCheck, faCircleXmark, faPerson, faPersonDress, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const StudentList = ({ pd, changeStudentList }) => {
    const [status, setStatus] = useState(null);
    const [genderStatus, setGenderStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingGender, setGenderLoading] = useState(false);
    const [loadingDelete, setDeleteLoading] = useState(false);
    useEffect(() => { setStatus(pd.active_status), setGenderStatus(pd.gender) }, [pd]);

    const handleGenderFemale = id => { setGenderLoading(true); axios.patch(`https://school-student-info-client.vercel.app/student_gender_update/${id}`, { gender: "female" }).then(res => { res.data.modifiedCount === 1 && setGenderStatus("female"); setGenderLoading(false) }).catch(err => { console.log(err); setGenderLoading(false) }) };
    const handleGenderMale = id => { setGenderLoading(true); axios.patch(`https://school-student-info-client.vercel.app/student_gender_update/${id}`, { gender: "male" }).then(res => { res.data.modifiedCount === 1 && setGenderStatus("male"); setGenderLoading(false) }).catch(err => { console.log(err); setGenderLoading(false) }) };
    const handleStatusChange = id => { setLoading(true); axios.patch(`https://school-student-info-client.vercel.app/student_status_change/${id}`, { active_status: !status }).then(res => { res.data.modifiedCount === 1 && setStatus(!status); setLoading(false); }).catch(err => { console.log(err); setLoading(false) }); };
    const handleStudentDelete = id => {
        Swal.fire({
            title: `${pd.stu_name} will be removed...!`,
            text: "Are you sure?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#ff0000"
        }).then(res => {
            if (res.isConfirmed === true) {
                setDeleteLoading(true);
                Swal.fire({
                    title: 'Submit Delete Code',
                    input: 'password',
                    inputLabel: 'Password',
                    showCancelButton: true,
                    confirmButtonText: 'Look up',
                    inputValidator: (value) => {
                        if (!value) {
                            return 'You need to write something!'
                        }
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (result.value === "7317279") {
                            axios.delete(`https://school-student-info-client.vercel.app/delete_stu/${id}`).then(res => {
                                if (res.data.deletedCount === 1) {
                                    // console.log(res.data);
                                    setDeleteLoading(false);
                                    changeStudentList(id);
                                }
                            }).catch(err => {
                                console.log(err);
                                setDeleteLoading(false);
                            });
                        } else {
                            Swal.fire({
                                title: "Code is not matched",
                                text: `${pd.stu_name} is not removed`,
                                timer: 2000
                            })
                            setDeleteLoading(false);
                        }
                        setDeleteLoading(false);
                    }
                    setDeleteLoading(false);
                }).catch(err => {
                    console.log(err);
                    setDeleteLoading(false);
                })
            }
        }).catch(err => {
            console.log(err);
            setDeleteLoading(false);
        })
    };

    return (
        <div className={`p-4 rounded-lg shadow-md ${status ? "status_active" : "status_inactive"}`}>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <h1>{pd.school_id}</h1>
                    <h1>{pd.stu_name}</h1>
                </div>
                <div>
                    {
                        loading ?
                            <h1 className=""><span className="loading loading-ring loading-xs"></span></h1>
                            :
                            <h1 className="">{status ? <FontAwesomeIcon icon={faCircleCheck} /> : <FontAwesomeIcon icon={faCircleXmark} />}</h1>
                    }
                </div>
            </div>
            <hr className={`${status ? "status_active" : "status_inactive"} my-2`} />
            <div>
                {
                    loadingGender ?
                        < div className="flex justify-between items-center">
                            <h1>Gender: <span className="loading loading-bars loading-md"></span></h1>
                            <div className="w-8 h-8 rounded-full border-2 flex justify-center items-center bg-white">
                                <span className="loading loading-ring loading-xs"></span>
                            </div>
                        </div>
                        :
                        genderStatus === null ?
                            < div className="flex justify-between items-center">
                                <h1>Gender: Undefined</h1>
                                <div className="w-8 h-8 rounded-full border-2 flex justify-center items-center bg-white">

                                </div>
                            </div>
                            :
                            genderStatus === "male" ?
                                <div className="flex justify-between items-center">
                                    <h1>Gender: Boy</h1>
                                    <div className="w-8 h-8 rounded-full border-2 flex justify-center items-center bg-blue-300 border-blue-800">
                                        <h1 className="px-1 text-lg text-blue-800"><FontAwesomeIcon icon={faPerson} /></h1>
                                    </div>
                                </div>
                                :
                                <div className="flex justify-between items-center">
                                    <h1>Gender: Girl</h1>
                                    <div className="w-8 h-8 rounded-full border-2 flex justify-center items-center bg-pink-300 border-pink-800">
                                        <h1 className="px-1 text-lg text-pink-600"><FontAwesomeIcon icon={faPersonDress} /></h1>
                                    </div>
                                </div>
                }
            </div>
            <hr className={`${status ? "status_active" : "status_inactive"} my-2`} />
            <div className="grid grid-cols-2 justify-center items-center text-center">
                <div className="col-span-1">
                    {
                        loadingGender ?
                            <div className="grid grid-cols-2 justify-center items-center">
                                <span className="loading loading-bars loading-sm"></span>
                                <span className="loading loading-bars loading-sm"></span>
                            </div>
                            :
                            genderStatus === "male" ?
                                <div className="grid grid-cols-2 justify-center items-center">
                                    <button onClick={() => handleGenderFemale(pd._id)} className="col-span-1 btn w-40 btn-neutral">Change Gender Status</button>
                                </div>
                                :
                                genderStatus === "female" ?
                                    <div className="grid grid-cols-2 justify-center items-center">
                                        <button onClick={() => handleGenderMale(pd._id)} className="col-span-1 btn w-40 btn-neutral">Change Gender Status</button>
                                    </div>
                                    :
                                    <div className="grid grid-cols-2 justify-center items-center">
                                        <button onClick={() => handleGenderMale(pd._id)} className="col-span-1 btn w-20 btn-info">Male</button>
                                        <button onClick={() => handleGenderFemale(pd._id)} className="col-span-1 btn w-20 btn-secondary">Female</button>
                                    </div>
                    }
                </div>
                <div className="col-span-1">
                    {
                        loading ?
                        <button className="btn btn-error btn-circle"><FontAwesomeIcon icon={faArrowsRotate} spin/></button>
                            :
                            pd.batch_no === "24" ?
                                loadingDelete ?
                                    <button className="btn btn-info w-24"><span className="loading loading-bars loading-md"></span></button>
                                    :
                                    <div className="flex justify-center items-center gap-2">
                                        <button onClick={() => handleStudentDelete(pd._id)} className="btn btn-error btn-circle"><FontAwesomeIcon icon={faTrash} /></button>
                                        <Link to={`/student_info/${pd._id}`}>
                                            <button className="btn btn-circle btn-info"><FontAwesomeIcon icon={faArrowRight} /></button>
                                        </Link>
                                    </div>
                                :
                                <div className="flex justify-center items-center gap-2">
                                    <button onClick={() => handleStatusChange(pd._id)} className="btn btn-error btn-circle"><FontAwesomeIcon icon={faArrowsRotate} /></button>
                                    <Link to={`/student_info/${pd._id}`}>
                                        <button className="btn btn-circle btn-info"><FontAwesomeIcon icon={faArrowRight} /></button>
                                    </Link>
                                </div>
                    }
                </div>
            </div>
        </div >
    );
};

export default StudentList;