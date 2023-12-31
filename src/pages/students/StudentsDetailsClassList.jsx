import StudentsBatchesButton from "../students_batches/StudentsBatchesButton";

const StudentsDetailsClassList = () => {

    return (
        <div>
            <StudentsBatchesButton link="/students" btnLink={"/students/details_list"} mainTitle={"Students List"} subTitle={"Select Class"}></StudentsBatchesButton>
        </div>
    );
};

export default StudentsDetailsClassList;