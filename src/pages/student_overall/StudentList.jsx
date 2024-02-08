import { faArrowRight, faArrowsRotate, faCircleCheck, faCircleXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaFemale, FaMale } from "react-icons/fa";
import StudentsDetailsComponents from "../../contents/StudentsDetailsComponents";

const StudentList = ({ pd, changeStudentList }) => {


    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setDeleteLoading] = useState(false);
    useEffect(() => { setStatus(pd.active_status) }, [pd]);

    const handleStatusChange = id => {
        Swal.fire({
            icon: "question", text: `${status ? "Active" : "InActive"} to ${!status ? "Active" : "InActive"}`, showConfirmButton: true, confirmButtonText: `Make ${!status ? "Active" : "InActive"}`, showCancelButton: true
        }).then(result => {
            if (result.isConfirmed) {
                setLoading(true);
                axios.patch(`https://school-student-info-client.vercel.app/student_status_change/${id}`, { active_status: !status }).then(res => { res.data.modifiedCount === 1 && setStatus(!status); setLoading(false); }).catch(err => { console.log(err); setLoading(false) });
            }
        })
    };

    const handleStudentDelete = id => {
        Swal.fire({ title: `${pd.stu_name} will be removed...!`, text: "Are you sure?", showConfirmButton: true, showCancelButton: true, confirmButtonText: "Delete", confirmButtonColor: "#ff0000" }).then(res => {
            if (res.isConfirmed === true) {
                setDeleteLoading(true);
                Swal.fire({
                    title: 'Submit Delete Code', input: 'password', inputLabel: 'Password', showCancelButton: true, confirmButtonText: 'Delete', confirmButtonColor: "red",
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
                                    setDeleteLoading(false);
                                    changeStudentList(id);
                                }
                            }).catch(err => {
                                console.log(err);
                                setDeleteLoading(false);
                            });
                        } else {
                            Swal.fire({ title: "Code is not matched", text: `${pd.stu_name} is not removed`, timer: 2000 });
                            setDeleteLoading(false);
                        }
                        setDeleteLoading(false);
                    }
                    setDeleteLoading(false);
                }).catch(err => {
                    console.log(err); setDeleteLoading(false);
                })
            }
        }).catch(err => {
            console.log(err); setDeleteLoading(false);
        });
    };

    return (
        <div className={`p-4 rounded-lg shadow-md border-2 border-sky-400`}>

            <div className="flex justify-between">
                <div>
                </div>
                <h1 className="flex justify-center text-center font-bold text-sky-700 text-lg">{pd.school_id}</h1>
                <div>
                    {
                        loading ?
                            <h1 className=""><span className="loading loading-ring loading-xs"></span></h1>
                            :
                            <h1 className="">{status ? <FontAwesomeIcon icon={faCircleCheck} color="green" /> : <FontAwesomeIcon icon={faCircleXmark} color="red" />}</h1>
                    }
                </div>
            </div>
            <hr className="border border-sky-600 my-2" />

            <div className="flex gap-2 justify-between items-center">
                <h1 className="font-bold text-xl">{pd.stu_name}</h1>
                <div>
                    {
                        pd.gender === "male" ?

                            <div className="w-8 h-8 rounded-full border-2 flex justify-center items-center bg-blue-200 border-blue-800">
                                <h1 className="px-1 text-lg text-blue-800"><FaMale /></h1>
                            </div>
                            :

                            <div className="w-8 h-8 rounded-full border-2 flex justify-center items-center bg-pink-200 border-pink-800">
                                <h1 className="px-1 text-lg text-pink-800"><FaFemale /></h1>
                            </div>
                    }
                </div>
            </div>

            <StudentsDetailsComponents stuData={pd}></StudentsDetailsComponents>

            <div>
                {
                    loading ?
                        <button className="btn btn-error btn-circle"><FontAwesomeIcon icon={faArrowsRotate} spin /></button>
                        :
                        pd.batch_no === "" ?
                            loadingDelete ?
                                <div className="flex justify-between items-center gap-2">
                                    <button className="btn btn-info w-24"><span className="loading loading-bars loading-md"></span></button>
                                    <button className="btn btn-info">Info Update <FontAwesomeIcon icon={faArrowRight} /></button>
                                    <button className="btn btn-info">Detail Info <FontAwesomeIcon icon={faArrowRight} /></button>
                                </div>
                                :
                                <div className="flex justify-between items-center gap-2">
                                    <button onClick={() => handleStudentDelete(pd._id)} className="btn btn-error btn-circle"><FontAwesomeIcon icon={faTrash} /></button>
                                    <Link to={`/student_info/${pd.school_id}`}>
                                        <button className="btn btn-info">Info Update <FontAwesomeIcon icon={faArrowRight} /></button>
                                    </Link>
                                    <Link to={`/students/details/${pd.school_id}`}><button className="btn btn-info">Detail Info <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                                </div>
                            :
                            <div className="flex justify-between items-center gap-2">
                                <button onClick={() => handleStatusChange(pd._id)} className="btn btn-error btn-circle"><FontAwesomeIcon icon={faArrowsRotate} /></button>
                                <Link to={`/student_info/${pd.school_id}`}>
                                    <button className="btn btn-info">Info Update <FontAwesomeIcon icon={faArrowRight} /></button>
                                </Link>
                                <Link to={`/students/details/${pd.school_id}`}><button className="btn btn-info">Detail Info <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                            </div>
                }
            </div>
        </div >
    );
};

export default StudentList;