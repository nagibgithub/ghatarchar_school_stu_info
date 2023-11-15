import Loading from "../../contents/Loading";
import useAdmin from "../../hooks/useAdmin";
import useClassPermission from "../../hooks/useClassPermission";
import StudentsBatchesButton from "../students_batches/StudentsBatchesButton";

const Attendence = () => {

    const { loading, adminStatus } = useAdmin();
    const { teacherClassLoading, classTeacher } = useClassPermission();

    if (loading === true) {
        return (
            <Loading></Loading>
        )
    } else if (loading === false) {
        if (adminStatus === true) {
            return (
                <StudentsBatchesButton btnLink={"/batch"} mainTitle={"Attendence"} subTitle={"Select The Class"}></StudentsBatchesButton>
            )
        } else {
            if (teacherClassLoading === true) {
                return (
                    <Loading></Loading>
                )
            } else {
                return (
                    <StudentsBatchesButton btnLink={"/batch"} mainTitle={"Attendence"} subTitle={"Select The Class"} batchArr={classTeacher}></StudentsBatchesButton>
                )
            }
        }
    }
};

export default Attendence;