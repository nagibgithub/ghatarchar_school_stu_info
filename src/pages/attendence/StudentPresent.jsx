import { useState } from "react";
import "./attend.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { addToDb, removeFromDb } from "../../localStorage/sessionStorage";

const StudentPresent = ({ stuId }) => {

    const [present, setPresent] = useState(false);
    const { school_id, stu_name, _id } = stuId;
    const handlePresent = id => { setPresent(!present); !present ? addToDb(id) : removeFromDb(id); };
    const presentLastSummary = stuId.present_data.length <= 3 ? stuId.present_data : stuId.present_data.slice(stuId.present_data.length - 3, stuId.present_data.length);

    return (
        <div onClick={() => handlePresent(_id)} className={`grid-cols-12 cursor-pointer border-2 w-full rounded-full p-2  shadow-md ${present ? "present-stu-div" : "absent-stu-div"} grid items-center`}>
            <h1 className={`col-span-2 font-semibold`}>{school_id}</h1>
            <h1 className={`col-span-7 font-semibold`}>{stu_name}</h1>
            <div className="col-span-2 flex justify-center gap-1">
                {
                    presentLastSummary.map((pd, index) => <FontAwesomeIcon key={index} icon={faCircle} size="sm" color={pd.present_status ? "green" : "red"} />)
                }
            </div>
            <div className={`${present ? "present-sign" : "absent-sign"} col-span-1 rounded-full bg-green-400 w-7 h-7 flex justify-center items-center`}>
                <h1 className={`${present ? "" : ""} font-extrabold`}>{present ? "P" : "A"}</h1>
            </div>
        </div>
    );
};

export default StudentPresent;