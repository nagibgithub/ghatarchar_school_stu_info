import { useState } from "react";
import PageTile from "../../contents/PageTile";
import StudentFeedback from "./messge-category/StudentFeedback";
import TeacherWriteMessage from "./messge-category/TeacherWriteMessage";
import ToDoWriteMessage from "./messge-category/ToDoWriteMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import useAdmin from "../../hooks/useAdmin";
import Loading from "../../contents/Loading";

const WriteMessage = () => {

    const { adminLoading, adminStatus } = useAdmin();

    const [selectType, setSelectType] = useState("pickOne");
    const handleMessageType = e => setSelectType(e.target.value);

    return (
        <div className="mx-2">
            <PageTile mainTitle={"Write Your Message"} link="/message"></PageTile>
            {
                selectType === "pickOne" ?
                    <label className="form-control w-full max-w-xs bg-sky-200 rounded-xl shadow-md px-4 py-2">
                        <div className="label">
                            <span className="label-text text-sky-700 font-bold">Select Message Type</span>
                        </div>
                        <div>
                            {
                                adminLoading ?
                                    <Loading></Loading>
                                    :
                                    adminStatus ?
                                        <select defaultValue={"pickOne"} onChange={e => handleMessageType(e)} className="select select-bordered w-full">
                                            <option value={"pickOne"} disabled >Pick one</option>
                                            <option value={"tea"}>Normal Message</option>
                                            <option value={"stu"}>For Students</option>
                                            <option value={"todo"}>To-Do</option>
                                        </select>
                                        :
                                        <select defaultValue={"pickOne"} onChange={e => handleMessageType(e)} className="select select-bordered w-full">
                                            <option value={"pickOne"} disabled >Pick one</option>
                                            <option value={"stu"}>Student Feedback</option>
                                            <option value={"tea"}>For Teachers</option>
                                        </select>
                            }
                        </div>
                    </label>
                    :
                    <div className="flex justify-between px-4 py-2 font-bold text-sky-800 bg-sky-200 rounded-xl shadow-md">
                        <div className="flex gap-2">
                            <h1>Message Type: </h1>
                            <h1>{selectType === "stu" ? "Student" : selectType === "tea" ? "General Message" : selectType === "todo" ? "Todo Message" : "Type Undefined"}</h1>
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
                                <div className="label">
                                    <span className="label-text text-sky-700 font-bold"></span>
                                </div>
                }
            </div>
        </div>
    );

};

export default WriteMessage;