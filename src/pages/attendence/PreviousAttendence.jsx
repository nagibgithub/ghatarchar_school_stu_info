import { Link } from "react-router-dom";

const PreviousAttendence = () => {


    const studentBatchInfo = [
        { value: "23", batchClass: "Six" },
        { value: "22", batchClass: "Seven" },
        { value: "21", batchClass: "Eight" },
        { value: "20", batchClass: "Nine" },
        { value: "19", batchClass: "Ten" },
        { value: "18", batchClass: "SSC - 23" },
        { value: "17", batchClass: "SSC - 22" },
    ];




    return (
        <div className="my-5">
            <div className="flex flex-col justify-center items-center gap-2 text-lg">
                {
                    studentBatchInfo.map((batch, index) => <Link to={`/previous_days/${batch.value}`} key={index}><button className="btn btn-success w-52 font-bold">{batch.batchClass}</button></Link>)
                }
            </div>
        </div>
    );
};

export default PreviousAttendence;