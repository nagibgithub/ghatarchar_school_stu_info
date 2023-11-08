import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../contents/Loading";

const PresentToday = () => {

    const batchId = useParams().batchId;
    const [presentDbData, setPresentDbData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { setLoading(true); const url = `https://school-student-info-client.vercel.app/batch_last_presentDb/${batchId}`; axios.get(url).then(res => { setPresentDbData(res.data); setLoading(false); }).catch(err => { console.log(err); setLoading(false) }); }, [batchId]);

    return (
        <div>
            {
                loading ?
                    <Loading></Loading>
                    :
                    <>
                        <hr className="border-blue-800 my-2" />
                        <h1>Present Students</h1>
                        <div className="flex flex-col gap-1">
                            {
                                presentDbData.present_ids.map((pd, index) => <PresentStudent present={true} pd={pd} key={index}></PresentStudent>)
                            }
                        </div>
                        <hr className="border-blue-800 my-2" />
                        <h1>Absent Students</h1>
                        <div className="flex flex-col gap-1">
                            {
                                presentDbData.absent_ids.map((pd, index) => <PresentStudent present={false} pd={pd} key={index}></PresentStudent>)
                            }
                        </div>
                        <hr className="border-blue-800 my-2" />
                    </>
            }
        </div>
    );
};

export default PresentToday;

const PresentStudent = ({ pd, present }) => {

    const [stuData, setStuData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const url = `https://school-student-info-client.vercel.app/student_id/${pd}`;
        axios.get(url).then(res => { setStuData(res.data); setLoading(false) }).catch(err => { console.log(err); setLoading(false); });
    }, [pd]);

    return (
        <div className={`flex gap-2 border-2 ${present ? "border-green-700" : "border-red-700"} rounded-full px-4 py-2 font-semibold ${present ? "bg-green-200" : "bg-red-200"}`}>
            {
                loading ?
                    <h1><span className="loading loading-bars loading-sm"></span> <span className="loading loading-bars loading-sm"></span> <span className="loading loading-bars loading-sm"></span></h1>
                    :
                    <>
                        <h1>{stuData.school_id}</h1>
                        <h1>{stuData.stu_name}</h1>
                    </>
            }
        </div>
    )
}