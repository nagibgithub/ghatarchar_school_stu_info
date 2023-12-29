import Loading from "../../contents/Loading";
import PageTile from "../../contents/PageTile";
import useAdmin from "../../hooks/useAdmin";
import useClassPermission from "../../hooks/useClassPermission";
import StudentsBatchesButton from "../students_batches/StudentsBatchesButton";

const Attendence = () => {

    const { adminLoading, adminStatus } = useAdmin();
    const { teacherClassLoading, classTeacher } = useClassPermission();

    if (adminLoading === true) {
        return (
            <Loading></Loading>
        );
    } else if (adminLoading === false) {
        if (adminStatus === true) {
            return (
                <StudentsBatchesButton link="/students" btnLink={"/attendence/batch_info"} mainTitle={"Attendence"} subTitle={"Select The Class"}></StudentsBatchesButton>
            )
        } else {
            if (teacherClassLoading === true) {
                return (
                    <Loading></Loading>
                )
            } else {
                return (
                    <>
                        {
                            classTeacher.length === 0 ?
                                <div className="font-bold text-center mt-5 px-2 flex flex-col justify-center items-center">
                                    <PageTile mainTitle={"Warning...!"}></PageTile>
                                    <img className="w-24" src="https://img.freepik.com/free-vector/warning-sign-gradient-shine_78370-1774.jpg" alt="" />
                                    <div className="px-5 flex flex-col gap-5 py-5 m-5 bg-yellow-200">
                                        <h1 className="text-red-600">উপস্থিতি কল করার জন্য আপনার কোনো ক্লাসের অনুমতি নাই।</h1>
                                        <h1>অনুগ্রহ করে প্রধান শিক্ষকের সাথে যোগাযোগ করুন।</h1>
                                    </div>
                                </div>
                                :
                                <StudentsBatchesButton link="/students" btnLink={"/attendence/batch_info"} mainTitle={"Attendence"} subTitle={"Select The Class"} batchArr={classTeacher}></StudentsBatchesButton>
                        }
                    </>
                )
            }
        }
    }
};

export default Attendence;