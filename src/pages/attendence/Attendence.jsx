import StudentsBatchesButton from "../students_batches/StudentsBatchesButton";

const Attendence = () => {

    return (
        <StudentsBatchesButton btnLink={"/batch"} mainTitle={"Attendence"} subTitle={"Select The Class"} batchArr={["19", "20", "21", "22", "23", "24"]}></StudentsBatchesButton>
    );
};

export default Attendence;