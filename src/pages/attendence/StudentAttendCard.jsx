import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const StudentAttendCard = ({ data, present, present_time, present_full_data, setLoading, setPresentData }) => {

    const [stuLoading, setStuLoading] = useState(true);
    const [stuData, setStuData] = useState({});
    useEffect(() => {
        setStuLoading(true);
        const url = `https://school-student-info-client.vercel.app/student/${data}`;
        axios.get(url).then(res => { setStuData(res.data); setStuLoading(false); }).catch(err => { console.log(err); setStuLoading(false); })
    }, [data]);

    const handleChangePresent = () => {
        Swal.fire({ title: `<h1>${stuData.school_id}</br>${stuData.stu_name}</h1>`, html: `<h1><b>${present ? "Present" : "Absent"} to ${present ? "Absent" : "Present"}</b></h1>`, showConfirmButton: true, showCancelButton: true, confirmButtonText: `Make ${present ? "Absent" : "Present"}`, confirmButtonColor: present ? "#dc2626" : "#16a34a" }).then(res => {
            if (res.isConfirmed) {
                setLoading(true);
                const newPresentData = stuData.present_data.map((ele) => {
                    if (ele.present_time === present_time) {
                        ele.present_status = !ele.present_status;
                        return ele;
                    } else {
                        return ele;
                    }
                });

                const newPresentArray = [...present_full_data.present_ids];
                const newAbsentArray = [...present_full_data.absent_ids];
                if (present) {
                    newAbsentArray.push(data);
                    newPresentArray.splice(newPresentArray.indexOf(data), 1);
                } else {
                    newPresentArray.push(data);
                    newAbsentArray.splice(newAbsentArray.indexOf(data), 1);
                }

                present_full_data.present_ids = newPresentArray;
                present_full_data.absent_ids = newAbsentArray;

                const patchData = { stuData: newPresentData, attendenceData: present_full_data };

                const url = `https://school-student-info-client.vercel.app/present_update/${data}`;
                axios.patch(url, patchData).then(res => {
                    console.log(res.data);
                }).catch(err => console.log(err));


                setPresentData(present_full_data);
                setInterval(() => setLoading(false), 1000);
            }
        })
    }

    return (
        <div className={`flex gap-3 border-[3px] ${present ? "border-green-700" : "border-red-700"} rounded-full px-4 py-2 font-semibold ${present ? "bg-green-200" : "bg-red-200"}`}>
            {
                stuLoading ?
                    <div className="flex w-full justify-between items-center">
                        <h1 className={`${present ? "text-green-700" : "text-red-700"} font-bold`}><span className="loading loading-bars loading-sm"></span> <span className="loading loading-bars loading-sm"></span></h1>
                        <button><FontAwesomeIcon icon={faRotate} spin={stuLoading ? true : false} /></button>
                    </div>
                    :
                    <div className="flex w-full justify-between items-center">
                        <h1 className={`${present ? "text-green-700" : "text-red-700"} font-semibold`}><span>{stuData.school_id}</span> {stuData.stu_name}</h1>
                        <button onClick={() => handleChangePresent()} className={`${!present ? "text-green-700" : "text-red-700"}`}><FontAwesomeIcon icon={faRotate} spin={stuLoading ? true : false} /></button>
                    </div>
            }
        </div>
    )
}

export default StudentAttendCard;