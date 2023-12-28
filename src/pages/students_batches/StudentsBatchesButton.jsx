import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../contents/Loading";
import { Link } from "react-router-dom";
import PageTile from "../../contents/PageTile";
import StudentMainButtons from "../../contents/StudentMainButtons";

const StudentsBatchesButton = ({ link = "/", btnLink, batchArr, mainTitle, subTitle }) => {

    const [batches, setBatches] = useState([]);
    const [loadingBatch, setLoadingBatch] = useState(true);
    const [batchName, setBatchName] = useState({});
    const [errMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        setLoadingBatch(true);
        const url = 'https://school-student-info-client.vercel.app/studetns_class_name';
        axios.get(url).then(res => { setBatches(Object.keys(res.data[0]).reverse()); setBatchName(res.data[0]); setLoadingBatch(false) }).catch(err => { console.log(err); setErrorMessage(err.message); setLoadingBatch(false); });
    }, []);

    return (
        <div className="flex flex-col justify-center items-center gap-2 my-5">
            <StudentMainButtons studentButtonLoading={loadingBatch}></StudentMainButtons>
            {
                loadingBatch ?
                    <Loading></Loading>
                    :
                    errMessage !== null ?
                        <h1 className="text-3xl font-bold text-red-600">{errMessage}</h1>
                        :
                        <>
                            <PageTile link={link} mainTitle={mainTitle} subTitle={subTitle}></PageTile>
                            {
                                batches.map((pd, index) => <Link className={batchArr === undefined ? "contents" : batchArr.includes(pd) ? "contents" : "hidden"} key={index} to={`${btnLink}/${pd}`}><button disabled={batchArr === undefined ? false : batchArr.includes(pd) ? false : true} onClick={() => sessionStorage.clear("id")} className="btn btn-success w-40 font-bold text-lg">{batchName[pd]}</button></Link>)
                            }
                        </>
            }
        </div>
    );
};

export default StudentsBatchesButton;