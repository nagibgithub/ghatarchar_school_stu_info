import { useEffect, useState } from "react";
import PageTile from "../../contents/PageTile";
import axios from "axios";
import Loading from "../../contents/Loading";
import AdmissionCard from "./AdmissionCard";

const AllAdmissionInfo = () => {

    const [admissionMessages, setAdmissionMessages] = useState([]);
    const [admissionMessageLoading, setAdmissionMessgeLoading] = useState(true);
    useEffect(() => {
        setAdmissionMessgeLoading(true);
        const url = `https://school-student-info-client.vercel.app/stu_admission_info`;
        axios.get(url).then(res => { setAdmissionMessages(res.data); setAdmissionMessgeLoading(false); }).catch(err => { console.log(err); });
    }, []);


    return (
        <div>
            <div className="m-1">
                <PageTile mainTitle={"Admission Message"} link="/message/student"></PageTile>
                {
                    admissionMessageLoading ?
                        <Loading></Loading>
                        :
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-center items-center p-2 shadow-md rounded-xl font-bold bg-sky-200">
                                <h1 className="text-sky-800">{admissionMessages.length} New Admission</h1>
                            </div>
                            {
                                admissionMessages.map((ele, index) => <AdmissionCard key={index} data={ele}></AdmissionCard>)
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default AllAdmissionInfo;