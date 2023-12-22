import { Link, useParams } from "react-router-dom";
import MainButton from "../../contents/MainButton";
import PageTile from "../../contents/PageTile";
import { batchName } from "../../contents/batchAndClass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";

const BatchDetails = () => {


    const batchId = useParams().batchId;





    return (
        <div className="flex flex-col justify-center items-center">
            <PageTile mainTitle={batchName[batchId]} subTitle={"Attendence"}></PageTile>
            <div className="grid grid-cols-2 justify-center items-center gap-2">
                <Link className="mx-auto" to={`/batch/${batchId}`}><MainButton btn_name={<FontAwesomeIcon icon={faUserPlus} />} title={"New"} backgroundColorCode="bg-red-200 border-red-800 text-red-900"></MainButton></Link>
                <Link className="mx-auto" to={`/attendence_today/${batchId}`}><MainButton btn_name={<FontAwesomeIcon icon={faListCheck} />} title={"Last Atten"} backgroundColorCode="bg-green-200 text-green-800 border-green-800"></MainButton></Link>
                <Link className="mx-auto" to={`/attendence/attendence_list/${batchId}`}><MainButton btn_name={<FontAwesomeIcon icon={faListAlt} />} title={"All Atten"} backgroundColorCode="bg-yellow-200 border-yellow-800 text-yellow-800"></MainButton></Link>
            </div>
        </div>
    );
};

export default BatchDetails;