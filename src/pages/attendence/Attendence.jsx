import { Link } from "react-router-dom";

const Attendence = () => {

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
        <div className="flex flex-col justify-center items-center">



            <h1 className="text-3xl font-bold text-green-700 py-5">Select Your Class</h1>
            <div className="flex flex-col">
                {
                    studentBatchInfo.map((pd, index) => <Link to={`/attendence/class/${pd.value}`} key={index}><button onClick={() => localStorage.clear()} className="text-lg font-bold text-sky-800 btn my-1 w-52 btn-success">{pd.batchClass}</button></Link>)
                }
            </div>

        </div>
    );

};

export default Attendence;