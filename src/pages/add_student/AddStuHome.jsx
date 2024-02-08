import StudentsBatchesButton from "../students_batches/StudentsBatchesButton";

const AddStuHome = () => {

    const mainTitle = "Add New Student";
    const subTitle = "Select the class";

    return (
        <div>
            <StudentsBatchesButton link="/students" btnLink={`/students/add_student/batch`} mainTitle={mainTitle} subTitle={subTitle} batchArr={["24", "23", "22", "21", "20"]}></StudentsBatchesButton>
        </div>
    );
};

export default AddStuHome;