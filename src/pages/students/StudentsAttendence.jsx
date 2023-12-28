import StudentsBatchesButton from "../students_batches/StudentsBatchesButton";

const StudentsAttendence = () => {






    return (
        <div>
            <StudentsBatchesButton link="/students" btnLink={"/students/details_list"} mainTitle={"Student List"} subTitle={"Select Class"}></StudentsBatchesButton>
        </div>
    );
};

export default StudentsAttendence;