import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../contents/Loading";
import ExamStudent from "./ExamStudent";
import { examEightSubject, examNineTenSubject, examSixSevenSubject, examTitle } from "../../contents/examSubjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import BatchClassName from "../../contents/BatchClassName";

const ExamBatch = () => {

    const batchId = useParams().batchId;

    const [batchStuData, setBatchStuData] = useState([]);
    const [examName, setExamName] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errMessage, setErrMessage] = useState(null);
    useEffect(() => {
        setLoading(true);
        setErrMessage(null);
        const url = `https://school-student-info-client.vercel.app/student_batch/${batchId}`;
        axios.get(url).then(res => { setBatchStuData(res.data); setLoading(false); }).catch(err => { setErrMessage(err.message); console.log(err); setLoading(false); })
    }, [batchId]);

    const handleSelect = e => setSelectedSubject(e.target.value);
    const handleExamTitle = e => setExamName(e.target.value);


    return (
        <div>
            <div className="flex items-center">
                <button onClick={() => history.back()} className="btn btn-info"><FontAwesomeIcon icon={faArrowLeft} /></button>
            </div>
            {
                loading ?
                    <Loading></Loading>
                    :
                    errMessage !== null ?
                        <h1>{errMessage}</h1>
                        :
                        <div className="mb-5 font-bold">
                            <div className="text-xl px-4 py-2 bg-sky-100 mx-2 rounded-3xl shadow-md my-3 text-center">
                                <h1 className="">Exam Data Entry</h1>
                                <h1 className="">Class: <span className="text-sky-900">{<BatchClassName batchNo={batchId}></BatchClassName>}</span></h1>
                            </div>

                            <div className="text-xl px-4 py-2 bg-sky-100 mx-2 rounded-3xl shadow-md my-3 text-center">
                                {
                                    examName === null ?
                                        <>
                                            <h1 className="my-2">Select Exam Name</h1>
                                            <select onChange={e => handleExamTitle(e)} className="select select-bordered w-full max-w-xs">
                                                <option className="hidden">Select Exam</option>
                                                {
                                                    examTitle.map((ele, index) => <option key={index}>{ele}</option>)
                                                }
                                            </select>
                                        </>
                                        :
                                        <div className="my-2">
                                            <h1>Exam Title:</h1>
                                            <div className="flex gap-2 justify-center items-center my-2">
                                                <h1>{examName}</h1>
                                                <button onClick={() => setExamName(null)} className="btn btn-outline text-lg"><FontAwesomeIcon icon={faPenToSquare} /></button>
                                            </div>
                                        </div>
                                }
                            </div>

                            <div className="text-xl px-4 py-2 bg-sky-100 mx-2 rounded-3xl shadow-md my-3 text-center">
                                {
                                    selectedSubject === null ?
                                        <>
                                            <h1 className="my-2">Select Subjects</h1>
                                            <select onChange={e => handleSelect(e)} className="select select-bordered w-full max-w-xs">
                                                <option className="hidden">Select Subject</option>
                                                {
                                                    (batchId === "23" || batchId === "22") ?
                                                        examSixSevenSubject.map((el, key) => <option value={el.subValue} key={key}>{el.subject}</option>)
                                                        :
                                                        batchId === "21" ?
                                                            examEightSubject.map((el, key) => <option value={el.subValue} key={key}>{el.subject}</option>)
                                                            :
                                                            batchId === "20" ?
                                                                examNineTenSubject.map((el, key) => <option value={el.subValue} key={key}>{el.subject}</option>)
                                                                :
                                                                <h1>Please Select the right Class</h1>
                                                }
                                            </select>
                                        </>
                                        :
                                        <div className="my-2">
                                            <h1>Selected Subject:</h1>
                                            <div className="flex gap-2 justify-center items-center my-2">
                                                <h1>{selectedSubject}</h1>
                                                <button onClick={() => setSelectedSubject(null)} className="btn btn-outline text-lg"><FontAwesomeIcon icon={faPenToSquare} /></button>
                                            </div>
                                        </div>
                                }
                            </div>


                            <div className="rounded-xl mx-2 bg-sky-100 p-2 ">
                                {
                                    batchStuData.map((ele, index) => <ExamStudent ele={ele} key={index}></ExamStudent>)
                                }
                            </div>
                        </div>
            }
        </div>
    );
};

export default ExamBatch;