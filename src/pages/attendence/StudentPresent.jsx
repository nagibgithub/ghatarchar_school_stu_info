import { useState } from "react";
import "./attend.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { addToDb, removeFromDb } from "../../localStorage/sessionStorage";

const StudentPresent = ({ stuId }) => {

    const [present, setPresent] = useState(false);
    const { school_id, stu_name, _id } = stuId;
    const handlePresent = id => { setPresent(!present); !present ? addToDb(id) : removeFromDb(id); };
    const presentLastSummary = stuId.present_data.length <= 15 ? stuId.present_data : stuId.present_data.slice(stuId.present_data.length - 15, stuId.present_data.length);

    return (
        <div onClick={() => handlePresent(_id)} className={`${present ? "present-stu-div" : "absent-stu-div"} cursor-pointer border-2 w-full rounded-3xl p-2 shadow`}>
            <div className={`grid-cols-12 grid items-center`}>
                <h1 className={`col-span-2 font-semibold`}>{school_id}</h1>
                <h1 className={`col-span-9 font-semibold`}>{stu_name}</h1>
                <div className={`${present ? "present-sign" : "absent-sign"} col-span-1 rounded-full bg-green-400 w-7 h-7 flex justify-center items-center`}>
                    <h1 className={`${present ? "" : ""} font-extrabold`}>{present ? "P" : "A"}</h1>
                </div>
            </div>
            <hr className={`border my-2 ${present ? "border-green-700" : "border-red-700"}`} />
            <div className="">
                <div className="flex justify-center mx-3 gap-1">
                    {
                        presentLastSummary.map((pd, index) => <FontAwesomeIcon key={index} icon={faCircle} size="sm" color={pd.present_status ? "green" : "red"} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default StudentPresent;