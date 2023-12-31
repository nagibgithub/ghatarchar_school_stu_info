import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../contents/Loading";

const StudentTutionCard = ({ stuId }) => {


    const [paymentDetailsLoading, setPaymentDetailsLoading] = useState(true);
    const [paymentDetails, setPaymentDetails] = useState([]);

    useEffect(() => {
        setPaymentDetailsLoading(true);
        const url = `https://school-student-info-client.vercel.app/student_payment/${stuId}`;
        axios.get(url).then(res => {
            setPaymentDetails(res.data);
            setPaymentDetailsLoading(false);
        }).catch(err => { console.log(err); Swal.fire({ title: err.message }); });
    }, [stuId]);




    return (
        <div>
            <h1>this is StudentTutionCard {stuId}</h1>
            {
                paymentDetailsLoading ?
                    <Loading></Loading>
                    :
                    <div className="flex flex-col justify-center items-center">
                        <h1>{paymentDetails.length}</h1>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="col-span-1">Tution: </div>
                            <div className="col-span-1">{paymentDetails[paymentDetails.length - 1]?.tutionFixed}</div>
                            <div className="col-span-1"></div>
                            <div className="col-span-1">Total: {paymentDetails.reduce((acc, student) => acc + student.total, 0)}</div>
                            <div className="col-span-1">-</div>

                        </div>

                    </div>
            }
        </div>
    );
};

export default StudentTutionCard;


