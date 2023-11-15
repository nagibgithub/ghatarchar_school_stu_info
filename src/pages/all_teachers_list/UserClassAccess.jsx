import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../contents/Loading";
import { batchName } from "../../contents/batchAndClass";
import Swal from "sweetalert2";

const UserClassAccess = ({ classAccessArr, teacherID }) => {

    const [selectedValue, setSelectedValue] = useState([]);
    const [batches, setBatches] = useState([]);
    const [loadingBatch, setLoadingBatch] = useState(true);
    const [errMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        setLoadingBatch(true);
        const url = 'https://school-student-info-client.vercel.app/student_batches_arr';
        axios.get(url).then(data => { setBatches(data.data.reverse()); setLoadingBatch(false) }).catch(err => { console.log(err); setErrorMessage(err.message); setLoadingBatch(false); });
        setSelectedValue(classAccessArr);
    }, [classAccessArr]);





    const handleChecked = e => {
        const checkboxValue = e.target.value;
        // Check if the checkbox is checked or unchecked
        if (e.target.checked) {
            // If checked, add the value to the selectedClasses array
            setSelectedValue(prevSelectedClasses => [...prevSelectedClasses, checkboxValue]);
        } else {
            // If unchecked, remove the value from the selectedClasses array
            setSelectedValue(prevSelectedClasses => prevSelectedClasses.filter(value => value !== checkboxValue));
        }
    }


    const chengeAccess = id => {
        Swal.fire({ title: "Update Changes...?", text: `Batches: ${selectedValue.join(', ')}`, showConfirmButton: true, showCancelButton: true, confirmButtonText: "Update" }).then(res => {
            if (res.isConfirmed) {
                setLoadingBatch(true);

                const url = `https://school-student-info-client.vercel.app/user_status/class_permisison_update/${id}`;
                const arrPars = selectedValue.map(ele => parseInt(ele)).sort().reverse();
                const arrString = arrPars.map(ele => ele.toString());
                axios.patch(url, arrString).then(res => {
                    if (res.data.modifiedCount === 1) {
                        Swal.fire({ title: `Updated successfully`, icon: "success" });
                        setLoadingBatch(false);
                    }
                }).catch(err => { console.log(err); setLoadingBatch(false); });
            }
        })
    };



    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-sky-950 font-bold text-xl">Class Access Permission</h1>
            {
                loadingBatch ?
                    <Loading></Loading>
                    :
                    errMessage === null ?
                        <div>
                            {
                                batches.map((ele, index) => <div key={index} className="flex gap-2 items-center">
                                    <input value={ele} className="checkbox checkbox-success" type="checkbox" name="classSelected" id={ele} onChange={e => handleChecked(e)} defaultChecked={selectedValue.includes(ele) === true ? true : false} />
                                    <label className="cursor-pointer label font-bold text-sky-800" htmlFor={ele}>{batchName[ele]}</label>
                                </div>)
                            }
                            <div className="my-2">
                                <button onClick={() => chengeAccess(teacherID)} className="btn btn-success">Update Selected Class</button>
                            </div>
                        </div>
                        :
                        <h1>{errMessage}</h1>
            }
        </div>
    );
};

export default UserClassAccess;