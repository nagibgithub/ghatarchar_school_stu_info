import axios from "axios";
import { useEffect, useState } from "react";
import StudentList from "./StudentList";
import { useParams } from "react-router-dom";
import PageTile from "../../contents/PageTile";
import { batchName } from "../../contents/batchAndClass";
import StudentCardLoading from "../../contents/StudentCardLoading";
import StudentMainButtons from "../../contents/StudentMainButtons";

const BatchAllStuInfo = () => {

    const batchID = useParams().batchId;

    const [active, setActive] = useState(true);
    const [allStu, setAllStu] = useState(true);
    const [boys, setBoys] = useState(false);
    const [girls, setGirls] = useState(false);

    const [batchStudentsData, setBatchStudensData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const url = `https://school-student-info-client.vercel.app/student_batch_all/${batchID}`;
        axios.get(url).then(res => { setBatchStudensData(res.data); setLoading(false) }).catch(err => console.log(err));
    }, [batchID]);

    const changeStudentList = deletedId => {
        const newStuData = [];
        batchStudentsData.forEach(element => {
            if (element._id !== deletedId) {
                newStuData.push(element)
            }
        });
        setBatchStudensData(newStuData);
    };
    const handleSetActive = activeSt => setActive(activeSt);
    const handleSetAll = () => { setBoys(true); setGirls(true); setAllStu(true); };
    const handleBoys = () => { setBoys(true); setGirls(false); setAllStu(false); };
    const handleGirls = () => { setBoys(false); setGirls(true); setAllStu(false); };


    return (
        <div className="px-1">
            <StudentMainButtons studentButtonLoading={loading}></StudentMainButtons>
            <div className="flex items-center">
                <PageTile link="/students/all_students" mainTitle={`Class: ${batchName[batchID]}`} subTitle={`Update Students Info`}></PageTile>
            </div>
            <div>
                {
                    loading ?
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col justify-center shadow-md items-center gap-4 border-2 border-sky-700 rounded-lg p-2 bg-sky-100">
                                <div className="flex gap-2">
                                    <button className={`btn btn-info w-32 h-20 shadow-md text-sm`}><div className="flex flex-col justify-center items-center gap-1"><h1>All</h1><h1 className="flex justify-center items-center w-7 h-7 bg-sky-700 text-white rounded-full"><span className="loading loading-ring loading-lg"></span></h1></div></button>
                                    <button className={`btn btn-info w-32 h-20 shadow-md text-sm`}><div className="flex flex-col justify-center items-center gap-1"><h1>Active</h1><h1 className="flex justify-center items-center w-7 h-7 bg-sky-700 text-white rounded-full"><span className="loading loading-ring loading-lg"></span></h1></div></button>
                                </div>
                                <hr className="border w-full border-sky-700" />
                                <div className="flex gap-2">
                                    <button className={`btn btn-info w-24 h-20 shadow-md text-sm`}><div className="flex flex-col justify-center items-center gap-1"><h1>All</h1><h1 className="flex justify-center items-center w-7 h-7 bg-sky-700 text-white rounded-full"><span className="loading loading-ring loading-lg"></span></h1></div></button>
                                    <button className={`btn btn-info w-24 h-20 shadow-md text-sm`}><div className="flex flex-col justify-center items-center gap-1"><h1>Boys</h1><h1 className="flex justify-center items-center w-7 h-7 bg-sky-700 text-white rounded-full"><span className="loading loading-ring loading-lg"></span></h1></div></button>
                                    <button className={`btn btn-info w-24 h-20 shadow-md text-sm`}><div className="flex flex-col justify-center items-center gap-1"><h1>Girls</h1><h1 className="flex justify-center items-center w-7 h-7 bg-sky-700 text-white rounded-full"><span className="loading loading-ring loading-lg"></span></h1></div></button>
                                </div>
                            </div>
                            <StudentCardLoading></StudentCardLoading>
                            <StudentCardLoading></StudentCardLoading>
                            <StudentCardLoading></StudentCardLoading>
                            <StudentCardLoading></StudentCardLoading>
                            <StudentCardLoading></StudentCardLoading>
                        </div>
                        :
                        <>

                            <div className="flex flex-col justify-center shadow-md items-center gap-4 border-2 border-sky-700 rounded-lg p-2 bg-sky-100">
                                <div className="flex gap-2">
                                    <button onClick={() => handleSetActive(false)} className={`${!active ? "btn btn-info" : "btn"} w-32 h-20 shadow-md text-sm`}><div className="flex flex-col justify-center items-center gap-1"><h1>All</h1><h1 className="flex justify-center items-center w-7 h-7 bg-sky-700 text-white rounded-full">{batchStudentsData.length}</h1></div></button>
                                    <button onClick={() => handleSetActive(true)} className={`${active ? "btn btn-info" : "btn"} w-32 h-20 shadow-md text-sm`}><div className="flex flex-col justify-center items-center gap-1"><h1>Active</h1><h1 className="flex justify-center items-center w-7 h-7 bg-sky-700 text-white rounded-full">{batchStudentsData.filter(ele => ele.active_status).length}</h1></div></button>
                                </div>
                                <hr className="border w-full border-sky-700" />
                                {
                                    active ?
                                        <div className="flex gap-2">
                                            <button onClick={() => handleSetAll()} className={`${allStu ? "btn btn-info" : "btn"} w-24 h-20 shadow-md text-sm`}><div className="flex flex-col justify-center items-center gap-1"><h1>All</h1><h1 className="flex justify-center items-center w-7 h-7 bg-sky-700 text-white rounded-full">{batchStudentsData.filter(ele => ele.active_status).length}</h1></div></button>
                                            <button onClick={() => handleBoys(!boys)} className={`${boys ? "btn btn-info" : "btn"} w-24 h-20 shadow-md text-sm`}><div className="flex flex-col justify-center items-center gap-1"><h1>Boys</h1><h1 className="flex justify-center items-center w-7 h-7 bg-sky-700 text-white rounded-full">{batchStudentsData.filter(ele => ele.gender === "male" && ele.active_status).length}</h1></div></button>
                                            <button onClick={() => handleGirls(!girls)} className={`${girls ? "btn btn-info" : "btn"} w-24 h-20 shadow-md text-sm`}><div className="flex flex-col justify-center items-center gap-1"><h1>Girls</h1><h1 className="flex justify-center items-center w-7 h-7 bg-sky-700 text-white rounded-full">{batchStudentsData.filter(ele => ele.gender === "female" && ele.active_status).length}</h1></div></button>
                                        </div>
                                        :
                                        <div className="flex gap-2">
                                            <button onClick={() => handleSetAll()} className={`${allStu ? "btn btn-info" : "btn"} w-24 h-20 shadow-md text-sm`}><div className="flex flex-col justify-center items-center gap-1"><h1>All</h1><h1 className="flex justify-center items-center w-7 h-7 bg-sky-700 text-white rounded-full">{batchStudentsData.length}</h1></div></button>
                                            <button onClick={() => handleBoys(!boys)} className={`${boys ? "btn btn-info" : "btn"} w-24 h-20 shadow-md text-sm`}><div className="flex flex-col justify-center items-center gap-1"><h1>Boys</h1><h1 className="flex justify-center items-center w-7 h-7 bg-sky-700 text-white rounded-full">{batchStudentsData.filter(ele => ele.gender === "male").length}</h1></div></button>
                                            <button onClick={() => handleGirls(!girls)} className={`${girls ? "btn btn-info" : "btn"} w-24 h-20 shadow-md text-sm`}><div className="flex flex-col justify-center items-center gap-1"><h1>Girls</h1><h1 className="flex justify-center items-center w-7 h-7 bg-sky-700 text-white rounded-full">{batchStudentsData.filter(ele => ele.gender === "female").length}</h1></div></button>
                                        </div>
                                }
                            </div>

                            {/* <div className="flex flex-col justify-between gap-2 my-5">
                                {
                                    batchStudentsData.map((pd, index) => <StudentList changeStudentList={changeStudentList} key={index} pd={pd}></StudentList>)
                                }
                            </div> */}
                            <div className="flex flex-col gap-3 my-5">
                                {active ?
                                    (boys && girls) ?
                                        batchStudentsData.filter(ele => ele.active_status).map((ele, index) => <StudentList key={index} changeStudentList={changeStudentList} pd={ele} ></StudentList>)
                                        :
                                        (boys && !girls) ?
                                            batchStudentsData.filter(ele => (ele.active_status && ele.gender === "male")).map((ele, index) => <StudentList key={index} changeStudentList={changeStudentList} pd={ele} ></StudentList>)
                                            :
                                            (!boys && girls) ?
                                                batchStudentsData.filter(ele => (ele.active_status && ele.gender === "female")).map((ele, index) => <StudentList key={index} changeStudentList={changeStudentList} pd={ele} ></StudentList>)
                                                :
                                                batchStudentsData.filter(ele => ele.active_status).map((ele, index) => <StudentList key={index} changeStudentList={changeStudentList} pd={ele} ></StudentList>)
                                    :
                                    (boys && girls) ?
                                        batchStudentsData.map((ele, index) => <StudentList key={index} changeStudentList={changeStudentList} pd={ele} ></StudentList>)
                                        :
                                        (boys && !girls) ?
                                            batchStudentsData.filter(ele => ele.gender === "male").map((ele, index) => <StudentList key={index} changeStudentList={changeStudentList} pd={ele} ></StudentList>)
                                            :
                                            (!boys && girls) ?
                                                batchStudentsData.filter(ele => ele.gender === "female").map((ele, index) => <StudentList key={index} changeStudentList={changeStudentList} pd={ele} ></StudentList>)
                                                :
                                                batchStudentsData.map((ele, index) => <StudentList key={index} changeStudentList={changeStudentList} pd={ele} ></StudentList>)
                                }
                            </div>

                        </>
                }
            </div>
        </div>
    );
};

export default BatchAllStuInfo;