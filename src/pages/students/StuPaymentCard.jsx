import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../contents/Loading";

const StuPaymentCard = ({ stuId }) => {

    const [paymentLoading, setPaymentLoading] = useState(true);
    const [paymentData, setPaymentData] = useState([]);

    useEffect(() => {
        setPaymentLoading(true);
        const url = `https://school-student-info-client.vercel.app/student_payment/${stuId}`;
        axios.get(url).then(res => { setPaymentData(res.data); setPaymentLoading(false); }).catch(err => { console.log(err); Swal.fire({ title: err.message }) });
    }, [stuId]);


    return (
        <div>
            {
                paymentLoading ?
                    <Loading></Loading>
                    :
                    <>
                        {

                            paymentData.reverse()[0]?.preDue &&
                            <div className="border-2 bg-yellow-200 border-yellow-700 rounded-2xl px-4 py-2 text-xl font-bold text-center">
                                {
                                    typeof paymentData.reverse()[0].preDue === "number" ?
                                        <h1>Due Payment: <span className="text-red-600">{paymentData.reverse()[0].preDue}</span></h1>
                                        :
                                        <h1 className="text-green-600">No Due amount</h1>
                                }
                            </div>
                        }
                        <div>
                            {
                                paymentData.map((ele, index) => <PaymentCard key={index}></PaymentCard>)
                            }
                        </div>
                    </>
            }
        </div>
    );
};

export default StuPaymentCard;

const PaymentCard = () => {
    return (
        <h1>payment</h1>
    )
};