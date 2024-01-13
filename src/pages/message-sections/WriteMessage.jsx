import { useState } from "react";
import PageTile from "../../contents/PageTile";
import StudentFeedback from "./messge-category/StudentFeedback";
import TeacherWriteMessage from "./messge-category/TeacherWriteMessage";
import ToDoWriteMessage from "./messge-category/ToDoWriteMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

const WriteMessage = () => {

    const [selectType, setSelectType] = useState("pickOne");
    const handleMessageType = e => setSelectType(e.target.value);

    return (
        <div className="mx-2">
            <PageTile mainTitle={"Write Your Message"} link="/message"></PageTile>
            {
                selectType === "pickOne" ?
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Select Message Type</span>
                        </div>
                        <div>
                            <select defaultValue={"pickOne"} onChange={e => handleMessageType(e)} className="select select-bordered">
                                <option value={"pickOne"} disabled >Pick one</option>
                                <option value={"stu"}>Student Feedback</option>
                                <option value={"tea"}>For Teachers</option>
                                <option value={"todo"}>To-Do</option>
                            </select>
                        </div>
                    </label>
                    :
                    <div className="flex justify-between px-4 py-2 font-bold text-sky-800 bg-sky-200 rounded-xl shadow-md">
                        <div className="flex gap-2">
                            <h1>Message Type: </h1>
                            <h1>{selectType === "stu" ? "About Student" : selectType === "tea" ? "General Message" : selectType === "todo" ? "Todo Message" : "Type Undefined"}</h1>
                        </div>
                        <button onClick={() => setSelectType("pickOne")}><FontAwesomeIcon icon={faEdit} /></button>
                    </div>
            }
            <div className="my-2">
                {
                    selectType === "stu" ?
                        <StudentFeedback></StudentFeedback>
                        :
                        selectType === "tea" ?
                            <TeacherWriteMessage></TeacherWriteMessage>
                            :
                            selectType === "todo" ?
                                <ToDoWriteMessage></ToDoWriteMessage>
                                :
                                <h1>Select Your Message Type first</h1>
                }
            </div>
        </div>
    );

};

export default WriteMessage;