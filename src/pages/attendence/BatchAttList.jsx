import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../contents/Loading";
import AttendenListCard from "./AttendenListCard";
import PageTile from "../../contents/PageTile";
import BatchClassName from "../../contents/BatchClassName";

const BatchAttList = () => {

    const batchId = useParams().batchId;

    const [attenList, setAttenList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const url = `https://school-student-info-client.vercel.app/batch_all_present_array/${batchId}`
        axios.get(url).then(res => { setAttenList(res.data); setLoading(false); }).catch(err => { console.log(err); setLoading(false); Swal.fire({ title: err.message }); })
    }, [batchId]);

    return (
        <div>
            <PageTile subTitle={"Attendence List"} mainTitle={<span>Class: <BatchClassName batchNo={batchId}></BatchClassName></span>}></PageTile>
            <div className="flex flex-col gap-2 my-4">
                {
                    loading ?
                        <Loading></Loading>
                        :
                        <div className="collapse bg-base-200 flex flex-col gap-3">
                            {
                                attenList.map((ele, index) => <AttendenListCard key={index} data={ele}></AttendenListCard>)
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default BatchAttList;