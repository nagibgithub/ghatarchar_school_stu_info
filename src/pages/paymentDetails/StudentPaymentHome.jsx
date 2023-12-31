import { useParams } from "react-router-dom";
import PageTile from "../../contents/PageTile";
import NextAndPrevButton from "../../contents/NextAndPrevButton";
import StudentMainButtons from "../../contents/StudentMainButtons";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PaymentDetails from "./PaymentDetails";

const StudentPaymentHome = () => {


    const stuId = useParams().id;
    const [stuNameLoading, setStuNameLoading] = useState(true);
    const [stuName, setStuName] = useState({});
    useEffect(() => {
        setStuNameLoading(true);
        const url = `https://school-student-info-client.vercel.app/stu_name/${stuId}`;
        axios.get(url).then(res => { setStuName(res.data.stu_name); setStuNameLoading(false); }).catch(err => { console.log(err); Swal.fire({ title: err.message }) });
    }, [stuId]);


    return (
        <div>
            <StudentMainButtons studentButtonLoading={stuNameLoading}></StudentMainButtons>
            <PageTile mainTitle={<span>Id: {stuId}</span>} subTitle={stuNameLoading ? "Loading...!" : stuName} link={`/students/details/${stuId}`}></PageTile>
            <NextAndPrevButton stuId={stuId} btnLink={'student_payment'}></NextAndPrevButton>

            <PaymentDetails></PaymentDetails>



        </div>
    );
};

export default StudentPaymentHome;