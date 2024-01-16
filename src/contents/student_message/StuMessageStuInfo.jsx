import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BatchClassName from "../BatchClassName";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

const StuMessageStuInfo = ({ selectedStudent, handleEditStuId, searchStudent }) => {
    return (
        <div className="px-4 py-2 font-bold text-sky-800 bg-sky-200 rounded-xl shadow-md">
            <h1 className="underline">Student Information</h1>
            <div className="flex justify-between">
                <div>
                    <div><h1>Class: {<BatchClassName batchNo={selectedStudent.school_id.toString()[0] + selectedStudent.school_id.toString()[1]} />}</h1></div>
                    <div>
                        <h1>School Id: {selectedStudent.school_id}</h1>
                        <h1>Name: {selectedStudent.stu_name}</h1>
                    </div>
                </div>
                <div>
                    {
                        searchStudent &&
                        <button onClick={() => handleEditStuId()}><FontAwesomeIcon icon={faEdit} /></button>
                    }
                </div>
            </div>
        </div>
    );
};

export default StuMessageStuInfo;