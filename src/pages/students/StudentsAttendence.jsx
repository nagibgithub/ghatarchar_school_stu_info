import StudentsBatchesButton from "../students_batches/StudentsBatchesButton";

const StudentsAttendence = () => {






    return (
        <div>
            <StudentsBatchesButton link="/students" btnLink={"/students/attendence_info"} mainTitle={"Attendence Info"} subTitle={"Select Class"}></StudentsBatchesButton>
        </div>
    );
};

export default StudentsAttendence;