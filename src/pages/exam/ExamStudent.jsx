import { useState } from "react";

const ExamStudent = ({ ele }) => {

    const [cqNumber, setCqNumber] = useState("");
    const [mcqNumber, setMcqNumber] = useState("");
    const [totalNumber, setTotalNumber] = useState("");

    const handleCqNumber = e => {
        e.target.value === "" ? setCqNumber(0) : setCqNumber(parseInt(e.target.value));
    };
    const handleMcqNumber = e => {
        e.target.value === "" ? setMcqNumber(0) : setMcqNumber(parseInt(e.target.value));
    };


    const TotalNumber = () => {
        const total = Number(cqNumber) + Number(mcqNumber);
        isNaN(total) ? setTotalNumber(0) : setTotalNumber(total);
        return (
            <h1>{totalNumber}</h1>
        )

    }

    console.log(typeof cqNumber, cqNumber);
    console.log(typeof mcqNumber, mcqNumber);
    console.log(typeof totalNumber, totalNumber);

    return (
        <div className="grid grid-cols-7 justify-between my-2 border h-24 shadow-md px-2 py-1 rounded-xl bg-sky-50">
            <div className="col-span-3 mr-2 text-sm flex flex-col justify-center">
                <h1 className="my-1 text-xl text-sky-800">{ele.school_id}</h1>
                <h1 className="my-1">{ele.stu_name}</h1>
            </div>
            <div className="col-span-3 text-sm text-center flex gap-1">
                <form className="flex flex-col gap-2 justify-center">
                    <div className="grid grid-cols-2 items-center">
                        <h1 className="text-right mr-2">CQ: </h1>
                        <input onChange={(e) => handleCqNumber(e)} step={1} min={0} max={100} className="w-14 text-center h-9 p-1" type="number" name="cq" id="" placeholder="CQ" />
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <h1 className="text-right mr-2">MCQ: </h1>
                        <input onChange={(e) => handleMcqNumber(e)} step={1} min={0} max={100} className="w-14 text-center h-9 p-1" type="number" name="cq" id="" placeholder="MCQ" />
                    </div>
                </form>
                <h1>{ }</h1>
            </div>
            <div className="col-span-1 text-center flex flex-col gap-2 justify-center items-center">
                <h1>Total</h1>
                <TotalNumber></TotalNumber>
            </div>
        </div>
    );
};

export default ExamStudent;