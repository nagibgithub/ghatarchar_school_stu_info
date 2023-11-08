import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentPresent from "./StudentPresent";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { batchName } from "../../contents/batchAndClass";

const BatchAttendence = () => {

    sessionStorage.clear();
    const [batchStudents, setBatchStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errMessage, setErrorMessage] = useState(null);
    const [featching, setFeatching] = useState(false);
    const batchNo = useParams().batch;

    useEffect(() => { setLoading(true); const url = `https://school-student-info-client.vercel.app/student_batch/${batchNo}`; axios.get(url).then(data => { setBatchStudents(data.data); setLoading(false); }).catch(err => { console.log(err); setErrorMessage(err.message); setLoading(false); }); }, [batchNo]);

    const handleReset = () => Swal.fire({ title: "Are you sure?", text: "You want to reset all present", confirmButtonText: "Reset", showDenyButton: true, denyButtonText: "Cancel" }).then(res => { if (res.isConfirmed) { setLoading(true); sessionStorage.clear(); setTimeout(() => setLoading(false), 50); } });

    return (
        <div className="flex flex-col justify-center items-center">

            <h1 className="font-bold text-xl my-1">Attendence for Class: {batchName[batchNo]}</h1>
            {
                loading ?
                    <h1 className="text-3xl font-bold">loading...!</h1>
                    :
                    errMessage !== null ?
                        <h1 className="text-5xl font-bold text-red-600">{errMessage}</h1>
                        :
                        <div>
                            <h1 className="font-bold text-xl my-1 text-center">Active Students: {batchStudents.length}</h1>
                            <div className={`${featching ? "contents" : "hidden"}`}><h1 className="my-5 font-bold text-red-500 text-xl border-2 rounded-2xl shadow-xl shadow-red-500 border-red-500 px-8 py-4 text-center">Sending Present Data<span className="loading loading-dots loading-xs"></span> <br /> <span className="loading loading-infinity loading-lg"></span> <br /> Please Wait for a moment</h1></div>
                            <div className={`${featching ? "hidden" : "contents"}`}>
                                <div className="flex justify-center items-center gap-3">
                                    <SubmitButton setLoading={setLoading} setFeatching={setFeatching} stuId={batchStudents}></SubmitButton>
                                    <button onClick={handleReset} className="btn font-bold btn-warning">Reset All</button>
                                </div>
                                <div className={`flex flex-col gap-2`}>
                                    {
                                        batchStudents.map((pd, index) => <StudentPresent stuId={pd} key={index}></StudentPresent>)
                                    }
                                </div>
                                <div className="flex justify-center items-center gap-3">
                                    <SubmitButton setLoading={setLoading} setFeatching={setFeatching} stuId={batchStudents}></SubmitButton>
                                    <button onClick={handleReset} className="btn font-bold btn-warning">Reset All</button>
                                </div>
                            </div>
                        </div>
            }
        </div>
    );
};

export default BatchAttendence;

const SubmitButton = ({ stuId, setFeatching, setLoading }) => {
    // console.log(stuId);

    const { loggedUser } = useContext(AuthContext);
    const batchId = useParams().batch;
    const navigate = useNavigate();

    const handleAttendenceSubmit = () => {
        const presentIdArray = JSON.parse(sessionStorage.getItem("id"));
        if (presentIdArray === null || presentIdArray.length === 0) {
            toast.error("You have to call the students first", {
                style: {
                    border: '4px solid #f03200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#f05500',
                    secondary: '#FFFAEE',
                },
                duration: 1000
            })
        } else {
            const absentIdArray = [];
            stuId.forEach(element => { !presentIdArray.includes(element._id) && absentIdArray.push(element._id) });
            Swal.fire({
                title: "Submit the presents?",
                text: `Present: ${presentIdArray.length} & Absent: ${absentIdArray.length}`,
                showConfirmButton: true,
                showDenyButton: true
            }).then(res => {
                if (res.isConfirmed) {
                    const url = `https://school-student-info-client.vercel.app/student_present/${batchId}`;
                    const userUid = loggedUser.uid;
                    setFeatching(true);
                    const myPromise = axios.patch(url, { presentIdArray, absentIdArray, userUid }).then(res => {
                        console.log(res.data);
                        if (res.data.presentDB.insertedId && res.data.resultAbsent.acknowledged === true && res.data.resultPresent.modifiedCount !== 0) {
                            setFeatching(false);
                            Swal.fire({
                                title: "every this is ok",
                                text: "আপনি রোল কল করতে পারছেন। ধন্যবাদ",
                                showConfirmButton: true,
                                confirmButtonText: "Present Summary"
                            }).then(res => res.isConfirmed ? navigate(`/attendence_today/${batchId}`) : navigate(`/attendence_today/${batchId}`));
                        } else {
                            setFeatching(false);
                            Swal.fire({
                                title: "something is going wrong",
                                text: "ফুয়াদ সার কে জানান যে সমস্যা হইছে"
                            });
                        }
                    }).catch(err => {
                        setLoading(true);
                        sessionStorage.clear();
                        setTimeout(() => setLoading(false), 50);
                        setFeatching(false);
                        console.log(err);
                        Swal.fire({ title: err.message });
                    });
                    toast.promise(myPromise, {
                        loading: 'Loading',
                        success: 'Got the data',
                        error: 'Error when fetching',
                    });
                }
            })
        }
    };

    return (
        <div className="flex justify-center items-center">
            <button onClick={() => handleAttendenceSubmit()} className="btn btn-success my-3 font-bold">Submit</button>
        </div>
    );
};