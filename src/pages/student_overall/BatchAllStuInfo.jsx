import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../contents/Loading";
import StudentList from "./StudentList";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BatchAllStuInfo = () => {

    const batchID = useParams().batchId;

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


    return (
        <div>
            <div className="flex items-center">
                <button onClick={() => history.back()} className="btn btn-info"><FontAwesomeIcon icon={faArrowLeft} /></button>
            </div>
            <div>
                {
                    loading ?
                        <Loading></Loading>
                        :
                        <div className="flex flex-col justify-between gap-2 my-5">
                            {
                                batchStudentsData.map((pd, index) => <StudentList changeStudentList={changeStudentList} key={index} pd={pd}></StudentList>)
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default BatchAllStuInfo;