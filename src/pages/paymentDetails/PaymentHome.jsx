import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../contents/Loading";

const PaymentHome = () => {

    const [loadingPaymentData, setLoadingPaymentData] = useState(true);
    const [paymentData, setPaymentData] = useState([]);
    useEffect(() => {
        setLoadingPaymentData(true);
        const url = `https://school-student-info-client.vercel.app/student_payment`;
        axios.get(url).then(res => { setPaymentData(res.data); console.log(res.data); setLoadingPaymentData(false); }).catch(err => { console.log(err); });
    }, []);

    return (
        <div>
            {
                loadingPaymentData ?
                    <Loading></Loading>
                    :
                    <h1>{paymentData.length}</h1>
            }
        </div>
    );
};

export default PaymentHome;