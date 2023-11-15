import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../contents/Loading";
import { Link } from "react-router-dom";
import { batchName } from "../../contents/batchAndClass";

const StudentsBatchesButton = ({ btnLink, batchArr, mainTitle, subTitle }) => {



    const [batches, setBatches] = useState([]);
    const [loadingBatch, setLoadingBatch] = useState(true);
    const [errMessage, setErrorMessage] = useState(null);

    // setBatches(["17", "18", "19", "20", "21", "22", "23", "24"]);

    useEffect(() => {
        setLoadingBatch(true);
        const url = 'https://school-student-info-client.vercel.app/student_batches_arr';
        axios.get(url).then(data => { setBatches(data.data.reverse()); setLoadingBatch(false) }).catch(err => { console.log(err); setErrorMessage(err.message); setLoadingBatch(false); });
    }, []);

    return (
        <div className="flex flex-col justify-center items-center gap-2 my-5">
            {
                loadingBatch ?
                    <Loading></Loading>
                    :
                    errMessage !== null ?
                        <h1 className="text-3xl font-bold text-red-600">{errMessage}</h1>
                        :
                        <>
                            <div className="bg-green-100 mb-5 font-bold text-green-700 px-8 py-6 text-3xl text-center rounded-3xl shadow-lg">
                                <h1>{mainTitle && mainTitle}</h1>
                                <hr />
                                <h1>{subTitle && subTitle}</h1>
                            </div>
                            {
                                batches.map((pd, index) => <Link className={batchArr === undefined ? "contents" : batchArr.includes(pd) ? "contents" : "hidden"} key={index} to={`${btnLink}/${pd}`}><button disabled={batchArr === undefined ? false : batchArr.includes(pd) ? false : true} onClick={() => sessionStorage.clear("id")} className="btn btn-success w-40 font-bold text-lg">{batchName[pd]}</button></Link>)
                            }
                        </>
            }
        </div>
    );
};

export default StudentsBatchesButton;