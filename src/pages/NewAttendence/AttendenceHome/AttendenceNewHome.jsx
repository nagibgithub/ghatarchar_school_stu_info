import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import batchNameInCode from "../../../contents/batchNameInCode";
import AttendenceMainBody from "../../attendence/AttendenceMainBody";
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useDateAndTime from "../../../hooks/useDateAndTime";

const AttendenceNewHome = () => {

    const [selectClass, setClassType] = useState("pickOne");
    const [currentDate, setDate] = useState(new Date());
    const [selectDate, setSelectDate] = useState(false);
    const { convertDateAndTime } = useDateAndTime();

    const classes = [
        { batchNo: "24", batchClass: "Six" },
        { batchNo: "23", batchClass: "Seven" },
        { batchNo: "22", batchClass: "Eight" },
        { batchNo: "21", batchClass: "Nine" },
        { batchNo: "20", batchClass: "Ten" },
        { batchNo: "19", batchClass: "SSC-24" }
    ];

    const handleSelectClass = e => setClassType(e.target.value);
    const handleDateChange = e => { setDate(new Date(e.target.value)); setSelectDate(false); };
    const handleSelectCurrentDate = () => { setDate(new Date()), setSelectDate(false) };



    return (
        <div className="mx-2">
            <div>
                {
                    selectClass === "pickOne" ?
                        <div className="w-full flex justify-center items-center my-2">
                            <label className="form-control w-full bg-sky-200 rounded-xl shadow-md px-4 py-2">
                                <div className="label">
                                    <span className="label-text text-sky-700 font-bold">Select Class</span>
                                </div>
                                <div>
                                    <select defaultValue={"pickOne"} onChange={e => handleSelectClass(e)} className="select select-bordered w-full">
                                        <option value={"pickOne"} disabled >Pick one</option>
                                        {
                                            classes.map((ele, index) => <option className="cursor-pointer" key={index} value={ele.batchNo}>{ele.batchClass}</option>)
                                        }
                                    </select>
                                </div>
                            </label>
                        </div>
                        :
                        <div className="flex justify-between px-4 py-2 my-2 font-bold text-sky-800 bg-sky-200 rounded-xl shadow-md">
                            <h1>Class: {batchNameInCode[selectClass]}</h1>
                            <button onClick={() => setClassType("pickOne")}><FontAwesomeIcon icon={faEdit} /></button>
                        </div>
                }
                {
                    selectClass !== "pickOne" &&
                    <>
                        {
                            selectDate ?
                                <div className="flex flex-col justify-center items-center">
                                    <label htmlFor="date" className="flex flex-col justify-center w-full items-center shadow-md border-4 border-sky-500 p-4 gap-2 bg-sky-200 rounded-2xl ">
                                        <h1 className="font-bold text-lg text-sky-600">Select Attendence Date</h1>
                                        <div className="flex gap-2">
                                            <input onChange={e => handleDateChange(e)} className="p-2 cursor-pointer rounded-md w-52 font-semibold" defaultValue={new Date().toISOString().split('T')[0]} min={"2024-01-01"} max={new Date().toISOString().split('T')[0]} type="date" name="date" id="date" />
                                            <button onClick={() => handleSelectCurrentDate()} className="btn btn-square btn-success"><FontAwesomeIcon icon={faCheck} size="xl" color="green" /></button>
                                        </div>
                                    </label>
                                </div>
                                :
                                <>
                                    <div className="flex justify-between px-4 py-2 my-2 font-bold text-sky-800 bg-sky-200 rounded-xl shadow-md">
                                        <h1>Date: {convertDateAndTime(currentDate.getTime(), "shortDate")}</h1>
                                        <button onClick={() => setSelectDate(true)}><FontAwesomeIcon icon={faEdit} /></button>
                                    </div>
                                    <AttendenceMainBody batchNo={selectClass}></AttendenceMainBody>
                                </>
                        }
                    </>
                }

            </div>
        </div>
    )
};

export default AttendenceNewHome;