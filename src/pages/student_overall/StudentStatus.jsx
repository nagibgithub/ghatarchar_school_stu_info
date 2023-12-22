import StudentsBatchesButton from "../students_batches/StudentsBatchesButton";

const StudentStatus = () => {

    return (
        <div>
            <StudentsBatchesButton link="/students" btnLink={"/all_student_info_batch"} mainTitle={"Student Personal Information"} subTitle={"Select the class"} batchArr={['24', "23", "22", "21", "20", "19"]}></StudentsBatchesButton>
        </div>
    );
};

export default StudentStatus;