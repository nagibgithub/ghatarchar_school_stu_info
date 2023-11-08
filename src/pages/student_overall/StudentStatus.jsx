import StudentsBatchesButton from "../students_batches/StudentsBatchesButton";

const StudentStatus = () => {

    return (
        <div>
            <StudentsBatchesButton btnLink={"/all_student_info_batch"} mainTitle={"Student Personal Information"} subTitle={"Select the class"} batchArr={['24', "23", "22"]}></StudentsBatchesButton>
        </div>
    );
};

export default StudentStatus;