import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../contents/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { batchName } from "../../contents/batchAndClass";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const AddStudent = () => {

    const batchId = useParams().batch;
    const [lastBatchId, setLastBatchId] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { loggedUser } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://school-student-info-client.vercel.app/last_id/${batchId}`).then(res => {
            const newClassForBatch = { "24": 6, "23": 7, "22": 8, "21": 9 };
            setLastBatchId(batchId + newClassForBatch[batchId] + (res.data.school_id + 1).toString()[3] + (res.data.school_id + 1).toString()[4]);
            setLoading(false);
        }).catch(err => { console.log(err); setLoading(false) });
    }, [batchId]);

    const handleNewStuInfo = e => {
        e.preventDefault();
        if (e.target.gender.value === "") {
            toast.error('Select Gender Male or Female', { style: { border: "2px solid #ff0000", padding: "16px" }, duration: 1000 });
        } else if (e.target.religion.value === "") {
            toast.error('Select Religion Islam or Hindu', { style: { border: "2px solid #ff0000", padding: "16px" }, duration: 1000 });
        } else {
            const stu_name = e.target.stuName.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            const gender = e.target.gender.value;
            const religion = e.target.religion.value;
            const batch_no = batchId;
            const school_id = parseInt(lastBatchId);
            const mobile_no = e.target.mobile.value;
            const admission_message = e.target.optionalText.value;
            const admission_dataEntry = loggedUser.uid;
            const admission_date = (new Date()).getTime();
            const admission_info = { admission_date, admission_dataEntry, admission_message };
            Swal.fire({
                title: `Id: ${school_id} <br/> ${stu_name} <br/> Class: ${batchName[batchId]} <br/> Gender: ${gender} <br/> Mobile: ${mobile_no}`,
                showConfirmButton: true,
                showCancelButton: true
            }).then(res => {
                if (res.isConfirmed === true) {
                    const result = { school_id, stu_name, gender, batch_no, mobile_no, religion, admission_info };
                    const url = "https://school-student-info-client.vercel.app/add_new_student";
                    axios.post(url, result).then(res => console.log(res.data)).catch(err => console.log(err))
                    Swal.fire({
                        title: `${stu_name} is added <br/> Id: ${school_id}`,
                        showConfirmButton: true,
                    }).then(res => {
                        if (res.isConfirmed) {
                            navigate(`/add_student`)
                        }
                        navigate(`/add_student`)
                    });
                    navigate(`/add_student`)
                }
            })
        }
    };

    return (
        <div className="my-5">
            {
                loading ?
                    <Loading></Loading>
                    :
                    <div>
                        <div className="flex items-center">
                            <button onClick={() => history.back()} className="btn btn-info"><FontAwesomeIcon icon={faArrowLeft} /></button>
                        </div>
                        <div className="px-4 my-5 py-2 rounded-lg shadow-lg bg-sky-100 mx-5">
                            <h1 className="text-center text-3xl font-bold">Class: <span className="text-blue-900">{batchName[batchId]}</span></h1>
                            <h1 className="text-center text-3xl font-bold">New id: <span className="text-blue-900">{lastBatchId}</span></h1>
                        </div>
                        <form onSubmit={(e) => handleNewStuInfo(e)} className="flex flex-col justify-center items-center gap-3 p-5 rounded-3xl bg-sky-100 shadow-lg">

                            {/* student name */}
                            <div className="form-control w-full max-w-xs shadow-md p-2 rounded-lg bg-sky-200">
                                <label htmlFor="stuName" className="label"><span className="text-xl font-bold text-sky-950">Student Full Name: </span></label>
                                <input name="stuName" type="text" id="stuName" placeholder="Type Name" className="input capitalize input-bordered w-full max-w-xs font-semibold" required />
                            </div>

                            {/* mobile number */}
                            <div className="form-control w-full max-w-xs shadow-md p-2 rounded-lg bg-sky-200">
                                <label htmlFor="mobile" className="label"><span className="text-xl font-bold text-sky-950">Contact Number: </span></label>
                                <input name="mobile" type="tel" id="mobile" placeholder="01********" pattern="[0]{1}[1]{1}[3-9]{1}[0-9]{8}" min={11} max={11} className="input input-bordered w-full max-w-xs" required />
                            </div>

                            {/* gender change */}
                            <div className="px-4 py-2 border-gray-300 form-control w-full max-w-xs shadow-md p-2 rounded-lg bg-sky-200">
                                <div className="py-2">
                                    <h1 className="text-xl font-bold text-sky-950">Select Gender:</h1>
                                </div>
                                <hr className="border border-sky-300 mb-3" />
                                <div className="flex gap-3 items-center">

                                    {/* male radio */}
                                    <div className="flex items-center gap-1">
                                        <label className="text-xl font-bold text-green-600 cursor-pointer" htmlFor="genderMale">Male</label>
                                        <input className="radio radio-success" type="radio" name="gender" id="genderMale" value="male" />
                                    </div>

                                    {/* female radio */}
                                    <div className="flex items-center gap-1">
                                        <label className="text-xl font-bold text-primary cursor-pointer" htmlFor="genderFemale">Female</label>
                                        <input className="radio radio-primary" type="radio" name="gender" id="genderFemale" value="female" />
                                    </div>

                                </div>
                            </div>

                            {/* religion change */}
                            <div className="px-4 py-2 border-gray-300 form-control w-full max-w-xs shadow-md p-2 rounded-lg bg-sky-200">
                                <div className="py-2">
                                    <h1 className="text-xl font-bold text-sky-950">Select Religion:</h1>
                                </div>
                                <hr className="border border-sky-300 mb-3" />
                                <div className="flex gap-3 items-center">

                                    {/* islam radio */}
                                    <div className="flex items-center gap-1">
                                        <label className="text-xl font-bold text-green-600 cursor-pointer" htmlFor="religionIslam">Islam</label>
                                        <input className="radio radio-success" type="radio" name="religion" id="religionIslam" value="islam" defaultChecked />
                                    </div>

                                    {/* hindu radio */}
                                    <div className="flex items-center gap-1">
                                        <label className="text-xl font-bold text-primary cursor-pointer" htmlFor="religionHindu">Hindu</label>
                                        <input className="radio radio-primary" type="radio" name="religion" id="religionHindu" value="hindu" />
                                    </div>

                                </div>
                            </div>

                            {/* optional message */}
                            <div className="form-control w-full max-w-xs shadow-md p-2 rounded-lg bg-sky-200">
                                <label htmlFor="optionalText" className="label"><span className="text-xl font-bold text-sky-950">Extra Info: </span></label>
                                <textarea name="optionalText" className="textarea textarea-info" id="optionalText" placeholder="Student Extra Info (Optional)"></textarea>
                            </div>

                            {/* form submit button */}
                            <div className="flex gap-3">
                                <input className="btn btn-primary" type="submit" value="Submit" />
                                <div className="btn btn-warning btn-circle">Reset</div>
                            </div>
                        </form>
                    </div>
            }
        </div>
    );
};

export default AddStudent;