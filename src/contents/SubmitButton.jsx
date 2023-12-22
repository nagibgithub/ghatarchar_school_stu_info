import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";

const SubmitButton = ({ stuId, setFeatching, setLoading }) => {

    const { loggedUser } = useContext(AuthContext);
    const batchId = useParams().batch;
    const navigate = useNavigate();

    const handleAttendenceSubmit = () => {
        const presentIdArray = JSON.parse(sessionStorage.getItem("id"));
        if (presentIdArray === null || presentIdArray.length === 0) {
            toast.error("You have to call the students first", { style: { border: '4px solid #f03200', padding: '16px', color: '#713200', }, iconTheme: { primary: '#f05500', secondary: '#FFFAEE', }, duration: 1000 })
        } else {
            const absentIdArray = [];
            stuId.forEach(element => { !presentIdArray.includes(element.school_id) && absentIdArray.push(element.school_id) });
            Swal.fire({ title: "Submit the presents?", text: `Present: ${presentIdArray.length} & Absent: ${absentIdArray.length}`, showConfirmButton: true, showDenyButton: true }).then(res => {
                if (res.isConfirmed) {
                    const url = `https://school-student-info-client.vercel.app/student_present/${batchId}`;
                    const userUid = loggedUser.uid;
                    setFeatching(true);
                    const myPromise = axios.patch(url, { presentIdArray, absentIdArray, userUid }).then(res => {
                        if (res.data.presentDB.insertedId && res.data.resultAbsent.acknowledged === true && res.data.resultPresent.modifiedCount !== 0) {
                            setFeatching(false);
                            Swal.fire({ title: "every this is ok", text: "আপনি রোল কল করতে পারছেন। ধন্যবাদ", showConfirmButton: true, confirmButtonText: "Present Summary" }).then(res => res.isConfirmed ? navigate(`/attendence_today/${batchId}`) : navigate(`/attendence_today/${batchId}`));
                            navigate(`/attendence_today/${batchId}`);
                        } else {
                            setFeatching(false);
                            Swal.fire({ title: "something is going wrong", text: "ফুয়াদ সার কে জানান যে সমস্যা হইছে" });
                        }
                    }).catch(err => { setLoading(true); sessionStorage.clear(); setTimeout(() => setLoading(false), 50); setFeatching(false); console.log(err); Swal.fire({ title: err.message }); });
                    toast.promise(myPromise, { loading: 'Loading', success: 'Got the data', error: 'Error when fetching', });
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

export default SubmitButton;