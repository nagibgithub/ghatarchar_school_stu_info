import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentList from "../contents/StudentList";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const batchToClass = { '17': 'SSC-22', '18': 'SSC-23', '19': 'Ten', '20': 'Nine', '21': 'Eight', '22': 'Seven', '23': 'Six' };

const AttendenceClass = () => {

    sessionStorage.clear();
    const stuBath = useParams().class;

    const [stuData, setStuData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const url = `https://school-student-info-client.vercel.app/student/batch/${stuBath}`;
        setLoading(true);
        fetch(url).then(res => res.json()).then(data => { setStuData(data); setLoading(false) });
    }, [stuBath]);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="my-5">
                {
                    isLoading ?
                        <h1 className="text-5xl font-extrabold">Loading...</h1>
                        :
                        <div className="flex flex-col justify-center items-center">
                            <h1>Class {batchToClass[stuBath]} students of Batch - {stuBath} is {stuData.length}</h1>
                            <SubmitBtn stuData={stuData}></SubmitBtn>
                            <div className="flex flex-col gap-3 mx-1">
                                {
                                    stuData.map((res, key) => <StudentList key={key} stuData={res}></StudentList>)
                                }
                            </div>
                            <SubmitBtn stuData={stuData}></SubmitBtn>
                        </div>
                }
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default AttendenceClass;

const SubmitBtn = ({ stuData }) => {

    const stuBath = useParams().class;
    const handleReset = () => {
        Swal.fire({
            title: `Are you sure?`,
            text: `If you confirm All present will be clear`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            denyButtonText: `Not Confirm`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                sessionStorage.clear();
                Swal.fire('Clear All Present', `for class: ${batchToClass[stuBath]}`, 'success')
                location.reload();
            } else if (result.isDenied) {
                Swal.fire('Present Is not Cleared', '', 'info')
            }
        })

    };

    const handleSubmit = () => {
        const dataFromSessionStor = JSON.parse(sessionStorage.getItem("id"));

        if (dataFromSessionStor === null || dataFromSessionStor.length === 0) {
            toast.error('You dont call any student', {
                duration: 1000,
                style: {
                    border: '2px solid #ff3200',
                    padding: '8px',
                    color: '#000000',
                },
                iconTheme: {
                    primary: '#ff2222',
                    secondary: '#ffffff',
                },
            })
        } else {
            Swal.fire({
                text: `Total Present: ${dataFromSessionStor.length}, out of ${stuData.length}, and absent student is ${stuData.length - dataFromSessionStor.length}`,
                title: `Do you want to submit the Attendence of ${batchToClass[stuBath]}`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                denyButtonText: `Not Confirm`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {

                    const presentIds = [];
                    const absentIds = [];

                    for (const i of stuData) {
                        dataFromSessionStor.includes(i._id) ?
                            presentIds.push(i._id)
                            :
                            absentIds.push(i._id);
                    }

                    const presentedList = [presentIds, absentIds];

                    fetch("http://localhost:5000/students/present", {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(presentedList)
                    }).then(res => res.json()).then(data => {
                        console.log(data);
                    });

                    Swal.fire('Attendence Submitted', `for class: ${batchToClass[stuBath]}`, 'success')
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        }

    };

    return (
        <div className="flex gap-2 my-5">
            <button onClick={() => handleReset()} className="px-4 rounded-lg py-2 bg-rose-300 text-rose-800 text-lg font-semibold">Reset All</button>
            <button onClick={() => handleSubmit()} className="px-4 rounded-lg py-2 bg-green-300 text-green-800 text-lg font-semibold">Submit</button>
        </div>
    );
};