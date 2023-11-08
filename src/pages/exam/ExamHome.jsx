import StudentsBatchesButton from "../students_batches/StudentsBatchesButton";

const ExamHome = () => {
    return (
        <div>
            <StudentsBatchesButton btnLink={'/exam/batch'} mainTitle={"Exam Information"} subTitle={"Select Class"} batchArr={["20", "21", "22", "23"]}></StudentsBatchesButton>
        </div>
    );
};

export default ExamHome;