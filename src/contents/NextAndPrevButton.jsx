import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const NextAndPrevButton = ({ stuId, btnLink }) => {

    const navigate = useNavigate();
    const currentId = useParams().id;
    const stuBatchNo = stuId.toString()[0] + stuId.toString()[1];
    const [stuIdArr, setStuIdArr] = useState([]);
    const [stuIdArrLoading, setStuIdArrLoading] = useState(true);

    console.log(currentId);

    useEffect(() => {
        setStuIdArrLoading(true);
        const url = `https://school-student-info-client.vercel.app/stu_id_arr_batch?batch=${stuBatchNo}`
        axios.get(url).then(res => { setStuIdArr(res.data); setStuIdArrLoading(false); }).catch(err => { console.log(err); Swal.fire({ title: err.message, text: "Something is wrong" }); });
    }, [stuBatchNo]);

    const handleSelectId = e => {
        e.preventDefault();
        console.log(e.target.value);
        navigate(`/${btnLink}/${e.target.value}`);
    };

    return (
        <div className="flex justify-between m-2">
            {
                stuIdArrLoading ?
                    <>
                        <button className="rounded-lg bg-sky-400 btn text-sky-800 font-bold text-center flex justify-start items-center shadow-md w-24 gap-2 h-12">
                            <h1><FontAwesomeIcon icon={faArrowLeft} /></h1>
                            <h1><span className="loading loading-dots loading-xs"></span></h1>
                        </button>

                        <button className="rounded-lg bg-sky-400 btn text-sky-800 font-bold text-center flex justify-end items-center shadow-md w-24 gap-2 h-12">
                            <h1><span className="loading loading-dots loading-xs"></span></h1>
                            <h1><FontAwesomeIcon icon={faArrowRight} /></h1>
                        </button>
                    </>
                    :
                    <>
                        <Link to={stuIdArr.indexOf(stuId.toString()) === 0 ? "" : `/${btnLink}/${stuIdArr[stuIdArr.indexOf(stuId.toString()) - 1]}`}>
                            <button disabled={stuIdArr.indexOf(stuId.toString()) === 0 ? true : false} className="rounded-lg bg-sky-400 btn text-sky-800 font-bold text-center flex justify-start items-center shadow-md w-24 gap-2 h-12">
                                <h1>{stuIdArr.indexOf(stuId.toString()) === 0 ? "No Stu" : <span><FontAwesomeIcon icon={faArrowLeft} /> {stuIdArr[stuIdArr.indexOf(stuId.toString()) - 1]}</span>}</h1>
                            </button>
                        </Link>

                        <select defaultValue={currentId} onChange={e => handleSelectId(e)} className="select select-info">
                            <option disabled>Choose Id</option>
                            {
                                // stuIdArr.map((ele, index) => <option selected={ele === stuId ? true : false} key={index}>{ele}</option>)
                                stuIdArr.map((ele, index) => <option key={index}>{ele}</option>)
                            }
                        </select>


                        <Link to={stuIdArr.indexOf(stuId.toString()) === stuIdArr.length - 1 ? "" : `/${btnLink}/${stuIdArr[stuIdArr.indexOf(stuId.toString()) + 1]}`}>
                            <button disabled={stuIdArr.indexOf(stuId.toString()) === stuIdArr.length - 1 ? true : false} className="rounded-lg bg-sky-400 btn text-sky-800 font-bold text-center flex justify-end items-center shadow-md w-24 gap-2 h-12">
                                <h1>{stuIdArr.indexOf(stuId.toString()) === stuIdArr.length - 1 ? "No Stu" : <span>{stuIdArr[stuIdArr.indexOf(stuId.toString()) + 1]} {<FontAwesomeIcon icon={faArrowRight} />}</span>}</h1>
                            </button>
                        </Link>
                    </>
            }


        </div>
    );
};

export default NextAndPrevButton;
