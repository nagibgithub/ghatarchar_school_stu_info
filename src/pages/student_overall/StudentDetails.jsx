import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../contents/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const StudentDetails = () => {
    const [loading, setLoading] = useState(true);
    const [stuData, setStuData] = useState(null);
    const [status, setStatus] = useState(null);
    const stuId = useParams().id;

    useEffect(() => { setLoading(true); axios.get(`https://school-student-info-client.vercel.app/student_id/${stuId}`).then(res => { setStuData(res.data); setStatus(res.data.active_status); setLoading(false); }).catch(err => console.log(err)) }, [stuId]);

    const handleStatusChange = id => { setLoading(true); axios.patch(`https://school-student-info-client.vercel.app/student_status_change/${id}`, { active_status: !status }).then(res => { console.log(res.data); res.data.modifiedCount === 1 && setStatus(!status); setLoading(false); }).catch(err => { console.log(err); setLoading(false) }); };

    const handleUpdateStuInfo = e => {
        e.preventDefault();
        if (e.target.religion.value === "") {
            toast.error("Set The Religion", { duration: 1500, style: { border: '2px solid #ff0000', padding: '18px', color: '#212121', }, iconTheme: { primary: '#ff0000', secondary: '#FFFAEE', }, });
        } if (e.target.gender.value === "") {
            toast.error("Set The Gender. 'Male' or 'Female'", { duration: 1500, style: { border: '2px solid #ff0000', padding: '18px', color: '#212121', }, iconTheme: { primary: '#ff0000', secondary: '#FFFAEE', }, });
        } else {
            Swal.fire({
                title: "Do you want to update?", showConfirmButton: true, showCancelButton: true, confirmButtonText: "Update"
            }).then(res => {
                if (res.isConfirmed) {
                    setLoading(true);
                    const stu_name = e.target.stuName.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    const stu_birthCerNum = e.target.stuBirthCertificate.value;
                    const father_name = e.target.fatherName.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    const mother_name = e.target.motherName.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    const mobile_no = e.target.mobile.value;
                    const mobile_2 = e.target.mobile2.value;
                    const gender = e.target.gender.value;
                    const religion = e.target.religion.value;
                    const stu_dateOfBirth = e.target.dateOfBirth.value;

                    axios.patch(`https://school-student-info-client.vercel.app/student_infoUpdate/${stuData._id}`, { stu_name, stu_birthCerNum, father_name, mother_name, mobile_no, mobile_2, gender, religion, stu_dateOfBirth }).then(res => {
                        console.log(res.data);
                        if (res.data.modifiedCount === 1) {
                            Swal.fire({ title: "Data is updated" });
                            setLoading(false);
                        } else {
                            toast.error("Maybe Something is going wrong...!");
                            setLoading(false);
                        }
                    }).catch(err => {
                        console.log(err);
                        Swal.fire(err.message);
                        setLoading(false);
                    });
                } else {
                    toast.error("Maybe Something is going wrong...!");
                    setLoading(false);
                }
            }).catch(err => {
                console.log(err);
                Swal.fire(err.message);
                setLoading(false);
            });
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex items-center">
                <button onClick={() => history.back()} className="btn btn-info"><FontAwesomeIcon icon={faArrowLeft} /></button>
            </div>
            <div>
                {
                    loading ?
                        <Loading></Loading>
                        :
                        <div>

                            <form onSubmit={e => handleUpdateStuInfo(e)} className="bg-sky-100 my-5 shadow-md border-2 rounded-xl px-4 py-2 border-sky-400 ">
                                <div className="font-bold text-xl text-center">
                                    <h1>{stuData.stu_name}</h1>
                                    <h1>School Id: <span className="text-sky-800">{stuData.school_id}</span></h1>
                                </div>

                                {/* student name */}
                                <div className="form-control w-full mx-auto my-2 max-w-xs shadow-md p-2 rounded-lg bg-sky-200">
                                    <label htmlFor="stuName" className="label"><span className="text-md font-bold text-sky-950">Student Full Name: </span></label>
                                    <input name="stuName" type="text" id="stuName" placeholder="Type Name" defaultValue={stuData.stu_name} className="input capitalize input-bordered w-full max-w-xs font-semibold" required />
                                </div>

                                {/* student birth Certificate number */}
                                <div className="form-control w-full mx-auto my-2 max-w-xs shadow-md p-2 rounded-lg bg-sky-200">
                                    <label htmlFor="stuBirthCertificate" className="label"><span className="text-md font-bold text-sky-950">Student Birth Certificate Number: </span></label>
                                    <input name="stuBirthCertificate" min={1} step={1} type="number" id="stuBirthCertificate" placeholder="Type Birth Certificate Number" defaultValue={stuData.stu_birthCerNum ? stuData.stu_birthCerNum : null} className="input capitalize input-bordered w-full max-w-xs font-semibold" />
                                </div>

                                {/* student father's name */}
                                <div className="form-control w-full mx-auto my-2 max-w-xs shadow-md p-2 rounded-lg bg-sky-200">
                                    <label htmlFor="fatherName" className="label"><span className="text-md font-bold text-sky-950">Father Name: </span></label>
                                    <input name="fatherName" type="text" id="fatherName" placeholder="Type father's Name" defaultValue={!stuData.father_name ? null : stuData.father_name} className="input capitalize input-bordered w-full max-w-xs font-semibold" />
                                </div>

                                {/* student mother's name */}
                                <div className="form-control w-full mx-auto my-2 max-w-xs shadow-md p-2 rounded-lg bg-sky-200">
                                    <label htmlFor="motherName" className="label"><span className="text-md font-bold text-sky-950">Mother Name: </span></label>
                                    <input name="motherName" type="text" id="motherName" placeholder="Type mother's Name" defaultValue={!stuData.mother_name ? null : stuData.mother_name} className="input capitalize input-bordered w-full max-w-xs font-semibold" />
                                </div>

                                {/* mobile number */}
                                <div className="form-control w-full mx-auto my-2 max-w-xs shadow-md p-2 rounded-lg bg-sky-200">
                                    <label htmlFor="mobile" className="label"><span className="text-md font-bold text-sky-950">Contact Number: </span></label>
                                    <input name="mobile" type="tel" id="mobile" defaultValue={stuData.mobile_no} placeholder="01********" pattern="[0]{1}[1]{1}[3-9]{1}[0-9]{8}" min={11} max={11} className="input font-mono capitalize input-bordered w-full max-w-xs font-semibold" required />
                                </div>

                                {/* mobile number 2 */}
                                <div className="form-control w-full mx-auto my-2 max-w-xs shadow-md p-2 rounded-lg bg-sky-200">
                                    <label htmlFor="mobile2" className="label"><span className="text-md font-bold text-sky-950">Contact Number 2: <span>(</span>Optional<span>)</span> </span></label>
                                    <input name="mobile2" type="tel" id="mobile2" defaultValue={stuData.mobile_2 ? stuData.mobile_2 : null} placeholder="01********" pattern="[0]{1}[1]{1}[3-9]{1}[0-9]{8}" min={11} max={11} className="font-mono input capitalize input-bordered w-full max-w-xs font-semibold" />
                                </div>

                                {/* date of birth */}
                                <div className="form-control w-full mx-auto my-2 max-w-xs shadow-md p-2 rounded-lg bg-sky-200">
                                    <label htmlFor="dateOfBirth" className="label"><span className="text-md font-bold text-sky-950">Date of Birth</span></label>
                                    <input defaultValue={stuData.stu_dateOfBirth ? stuData.stu_dateOfBirth : null} type="date" name="dateOfBirth" id="dateOfBirth" className="input input-bordered w-full max-w-xs cursor-pointer" />
                                </div>

                                {/* gender change */}
                                <div className="px-4 py-2 my-2 border-gray-300 form-control w-full max-w-xs shadow-md rounded-lg bg-sky-200">
                                    <div className="py-2">
                                        <h1 className="text-md font-bold text-sky-950">Select Gender:</h1>
                                    </div>
                                    <hr className="border border-sky-300 mb-3" />
                                    <div className="flex gap-3 items-center">

                                        {/* male radio */}
                                        <div className="flex items-center gap-1">
                                            <label className="text-xl font-bold text-green-600 cursor-pointer" htmlFor="genderMale">Male</label>
                                            <input className="radio radio-success" type="radio" name="gender" id="genderMale" value="male" defaultChecked={stuData.gender === "male" ? true : false} />
                                        </div>

                                        {/* female radio */}
                                        <div className="flex items-center gap-1">
                                            <label className="text-xl font-bold text-primary cursor-pointer" htmlFor="genderFemale">Female</label>
                                            <input className="radio radio-primary" type="radio" name="gender" id="genderFemale" value="female" defaultChecked={stuData.gender === "female" ? true : false} />
                                        </div>

                                    </div>
                                </div>

                                {/* religion change */}
                                <div className="px-4 py-2 my-2 border-gray-300 form-control w-full max-w-xs shadow-md rounded-lg bg-sky-200">
                                    <div className="py-2">
                                        <h1 className="text-md font-bold text-sky-950">Select Religion:</h1>
                                    </div>
                                    <hr className="border border-sky-300 mb-3" />
                                    <div className="flex gap-3 items-center">

                                        {/* islam radio */}
                                        <div className="flex items-center gap-1">
                                            <label className="text-xl font-bold text-green-600 cursor-pointer" htmlFor="religionIslam">Islam</label>
                                            <input className="radio radio-success" type="radio" name="religion" id="religionIslam" value="islam" defaultChecked={stuData.religion === "islam" ? true : false} />
                                        </div>

                                        {/* hindu radio */}
                                        <div className="flex items-center gap-1">
                                            <label className="text-xl font-bold text-primary cursor-pointer" htmlFor="religionHindu">Hindu</label>
                                            <input className="radio radio-primary" type="radio" name="religion" id="religionHindu" value="hindu" defaultChecked={stuData.religion === "hindu" ? true : false} />
                                        </div>

                                    </div>
                                </div>

                                {/* form submit button */}
                                <div className="form-control flex w-full mx-auto my-2 max-w-xs shadow-md p-2 rounded-lg bg-sky-200">
                                    <input className="btn btn-primary" type="submit" value="Submit" />
                                </div>

                            </form>


                            <hr className="border-sky-600 my-3" />
                            <h1>{stuData.school_id}</h1>
                            <h1>{stuData.stu_name}</h1>
                            <div className="flex items-center gap-3 border-2 rounded ">
                                <h1>Student Active Status {status ? "Active" : "In Active"}</h1>
                                <button onClick={() => handleStatusChange(stuData._id)} className={`btn ${status ? "btn-error" : "btn-success"}`}>{status ? "Make In Active" : "Make Active"}</button>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default StudentDetails;