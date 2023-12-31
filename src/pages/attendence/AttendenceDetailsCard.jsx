import useDateAndTime from "../../hooks/useDateAndTime";
import StudentAttendCard from "./StudentAttendCard";

const AttendenceDetailsCard = ({ loadingUserData, userInfo, presentDbData, setLoading, setPresentDbData }) => {

    const { convertDateAndTime } = useDateAndTime();

    return (
        <>

            <div className="flex flex-col gap-1 my-2 font-bold text-center bg-sky-200 py-2 rounded-2xl shadow-md">
                {
                    (loadingUserData === true || userInfo === "" || userInfo === null) ?

                        <div className="flex flex-col justify-center items-center gap-2">
                            <h1 className="rounded-full w-20 shadow-md"><span className="loading loading-ring loading-lg"></span></h1>
                            <h1 className="capitalize font-bold text-center text-lg text-sky-800"><span className="loading loading-bars loading-sm"></span> <span className="loading loading-bars loading-sm"></span> <span className="loading loading-bars loading-sm"></span></h1>
                        </div>
                        :
                        <div className="flex flex-col justify-center items-center gap-2">
                            <img className="rounded-full w-20 shadow-md" src={userInfo.teacher_photo} alt="" />
                            <h1 className="capitalize font-bold text-center text-lg text-sky-800">{userInfo?.teacher_name}</h1>
                        </div>
                }
                <h1 className="text-lg">{convertDateAndTime(presentDbData.present_time, "shortDate")}, {convertDateAndTime(presentDbData.present_time, "shortTime")}</h1>
                <h1 className="text-lg font-bold text-center"><span className="text-green-700">Present: {presentDbData.present_ids.length}</span> - <span className="text-red-700">Absent: {presentDbData.absent_ids.length}</span></h1>



            </div>

            <div className="bg-green-100 p-2 rounded-2xl flex flex-col gap-1 shadow-md my-2">
                <h1 className="text-lg font-bold text-center text-green-700">Present Students: {presentDbData.present_ids.length}</h1>
                <div className="flex flex-col gap-1">
                    {
                        presentDbData.present_ids.map((pd, index) => <StudentAttendCard present_full_data={presentDbData} present_time={presentDbData.present_time} setLoading={setLoading} setPresentData={setPresentDbData} present={true} data={pd} key={index}></StudentAttendCard>)
                    }
                </div>
            </div>

            <div className="bg-red-100 p-2 rounded-2xl flex flex-col gap-1 shadow-md my-2">
                <h1 className="text-lg font-bold text-center text-red-700">Absent Students: {presentDbData.absent_ids.length}</h1>
                <div className="flex flex-col gap-1">
                    {
                        presentDbData.absent_ids.map((pd, index) => <StudentAttendCard present_full_data={presentDbData} present_time={presentDbData.present_time} setLoading={setLoading} setPresentData={setPresentDbData} present={false} data={pd} key={index}></StudentAttendCard>)
                    }
                </div>
            </div>

        </>
    );
};

export default AttendenceDetailsCard;