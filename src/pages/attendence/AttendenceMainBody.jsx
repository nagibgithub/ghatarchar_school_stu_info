import { useEffect, useState } from "react";
import Loading from "../../contents/Loading";
import SubmitButton from "../../contents/SubmitButton";
import StudentPresent from "./StudentPresent";
import Swal from "sweetalert2";
import axios from "axios";
import PageTile from "../../contents/PageTile";
import BatchClassName from "../../contents/BatchClassName";

const AttendenceMainBody = ({ batchNo }) => {

    const [featching, setFeatching] = useState(false);
    const [batchStudents, setBatchStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errMessage, setErrorMessage] = useState(null);

    useEffect(() => { setLoading(true); const url = `https://school-student-info-client.vercel.app/student_batch/${batchNo}`; axios.get(url).then(data => { setBatchStudents(data.data); setLoading(false); }).catch(err => { console.log(err); setErrorMessage(err.message); setLoading(false); }); }, [batchNo]);

    const handleReset = () => Swal.fire({ title: "Are you sure?", text: "You want to reset all present", confirmButtonText: "Reset", showDenyButton: true, denyButtonText: "Cancel" }).then(res => { if (res.isConfirmed) { setLoading(true); sessionStorage.clear(); setTimeout(() => setLoading(false), 50); } });

    return (
        <div className="flex flex-col justify-center items-center">
            <PageTile mainTitle={<span>Class: <BatchClassName batchNo={batchNo}></BatchClassName></span>} subTitle={loading ? "Loading...!" : errMessage ? "Error...!" : `Active Students: ${batchStudents.length}`}></PageTile>

            {
                loading ?
                    <Loading></Loading>
                    :
                    <div>
                        {
                            featching ?
                                <div className="my-5 font-bold text-sky-800 bg-sky-200 text-xl rounded-2xl shadow-md shadow-sky-200 px-8 py-4 text-center">
                                    <h1>Sending Present Data</h1>
                                    <span className="loading loading-infinity loading-lg"></span>
                                    <h1><progress className="progress bg-sky-400 w-56"></progress></h1>
                                    <h1>Please Wait for a moment</h1>
                                </div>
                                :
                                <div>
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
                        }
                    </div>

            }
        </div>
    );
};

export default AttendenceMainBody;