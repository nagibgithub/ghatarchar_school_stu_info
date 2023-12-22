import { useParams } from "react-router-dom";
import AttendenceMainBody from "./AttendenceMainBody";
import PageTile from "../../contents/PageTile";
import useDateAndTime from "../../hooks/useDateAndTime";
import useAdmin from "../../hooks/useAdmin";
import Loading from "../../contents/Loading";

const BatchAttendence = () => {

    sessionStorage.clear();
    const batchNo = useParams().batch;
    const { convertDateAndTime } = useDateAndTime();
    const { adminLoading, adminStatus } = useAdmin();

    return (
        <div className="px-2">
            {
                adminLoading ?
                    <Loading></Loading>
                    :
                    adminStatus ?
                        <AttendenceMainBody batchNo={batchNo}></AttendenceMainBody>
                        :
                        (new Date().getHours() < 12 && new Date().getHours() > 8) ?
                            <AttendenceMainBody batchNo={batchNo}></AttendenceMainBody>
                            :
                            <div>
                                <PageTile mainTitle={"Warning...!"}></PageTile>
                                <div className="flex flex-col justify-center items-center text-center font-bold">
                                    <h1 className="text-2xl">Now it is</h1>
                                    <h1 className="text-5xl text-red-700">{convertDateAndTime(new Date().getTime(), "shortTime")}</h1>
                                    <h1 className="text-orange-600">It is not the time to call the attendence</h1>
                                </div>
                            </div>
            }
        </div>
    );
};

export default BatchAttendence;