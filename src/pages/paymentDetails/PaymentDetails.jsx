import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PaymentDetails = () => {

    const stuId = useParams().id;
    const [paymentData, setPaymentData] = useState([]);
    const [loadingPayment, setLoadingPayment] = useState(true);

    useEffect(() => {
        setLoadingPayment(true);
        const url = `https://school-student-info-client.vercel.app/student_payment/${stuId}`;
        axios.get(url).then(res => { setPaymentData(res.data); setLoadingPayment(false); })
    }, [stuId]);

    return (
        <div className="mx-2 my-4">

            {
                loadingPayment ?
                    <h1>Loading...</h1>
                    :
                    <>
                        <div>
                            <h1 className="text-center font-bold">Tution Fixed: {paymentData[paymentData?.length - 1]?.tutionFixed}</h1>
                            {
                                paymentData[paymentData?.length - 1]?.preDue === 0 ?
                                    <h1 className="text-center p-2 bg-green-200 text-green-700 rounded-xl my-2 border-2 border-green-700 text-xl font-bold">No Due Amount</h1>
                                    :
                                    <h1 className="text-center p-2 bg-yellow-200 text-yellow-800 rounded-xl my-2 border-2 border-yellow-700 text-xl font-bold">Due Amount: <span className={paymentData[paymentData?.length - 1]?.preDue !== 0 ? "text-red-600" : "text-green-600"}>{(paymentData[paymentData?.length - 1]?.preDue * -1).toLocaleString()}</span></h1>
                            }
                        </div>
                        <div>
                            <OthersPaymentCard paymentData={paymentData}></OthersPaymentCard>
                        </div>
                        <div className="shadow-md">
                            <div className="grid grid-cols-4 justify-center bg-sky-300 items-center border-2 text-sm rounded-t-xl border-sky-400 p-1 font-bold ">
                                <div className="col-span-1 text-center">Date</div>
                                <div className="col-span-1 text-center">Receipt</div>
                                <div className="col-span-1 text-center">Amount</div>
                                <div className="col-span-1 text-center">Due</div>
                            </div>
                            {
                                paymentData.map((data, index) => <PaymentCard payment={data} key={index} indexNo={paymentData.length - index}></PaymentCard>)
                            }
                        </div>

                    </>
            }
        </div>
    );
};

export default PaymentDetails;

const PaymentCard = ({ payment, indexNo }) => {

    const dateFormatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short', year: "2-digit" });
    const formattedDate = dateFormatter.format(new Date((new Date('1900-01-01')).getTime() + payment.dateNum * 24 * 60 * 60 * 1000));

    return (
        <div className={`grid grid-cols-4 justify-center h-8 ${indexNo % 2 === 0 ? "bg-sky-200" : "bg-sky-50"} border-x-2 border-t border-sky-400 items-center ${indexNo === 1 && "border-b-2 rounded-b-xl"}`}>
            <h1 className="col-span-1 text-end text-sm font-bold">{formattedDate}</h1>
            <h1 className="col-span-1 text-center text-sm">{payment.receiptNo}</h1>
            <h1 className="col-span-1 text-center text-sm font-bold">{payment.paid.toLocaleString()}</h1>
            <h1 className="col-span-1 text-center text-sm font-bold text-red-600">{(typeof payment.preDue !== "number" || payment.preDue === 0) ? "-" : (payment.preDue * -1).toLocaleString()}</h1>
        </div>
    );
};

const OthersPaymentCard = ({ paymentData }) => {

    const othersPaymentItems = [
        { title: "Admission", item: "admission" },
        { title: "Form Fee", item: "formFee" },
        { title: "Exam-1", item: "exam1" },
        { title: "Exam-2", item: "exam2" },
        { title: "Exam-3", item: "exam3" },
        { title: "Exam-4", item: "exam4" },
        { title: "Id Card", item: "idCard" },
        { title: "Diary", item: "diary" },
        { title: "Reg:", item: "registration" },
        { title: "Other1", item: "other1" },
        { title: "Other2", item: "other2" }
    ];

    const paymentMonths = [
        { title: 'Jan', item: 'jan' },
        { title: 'Feb', item: 'feb' },
        { title: 'Mar', item: 'mar' },
        { title: 'Apr', item: 'apr' },
        { title: 'May', item: 'may' },
        { title: 'Jun', item: 'jun' },
        { title: 'Jul', item: 'jul' },
        { title: 'Aug', item: 'aug' },
        { title: 'Sep', item: 'sep' },
        { title: 'Oct', item: 'oct' },
        { title: 'Nov', item: 'nov' },
        { title: 'Dec', item: 'dec' }
    ];

    return (
        <div className="my-2 rounded-xl text-sm">
            <div className="grid grid-cols-2 gap-1 font-bold">
                <div className="grid grid-cols-2 rounded-t-lg bg-sky-300 border-t-2 border-sky-500 border-x-2">
                    <h1 className="col-span-1 text-center">Month</h1>
                    <h1 className="col-span-1 text-center">Taka</h1>
                </div>
                <div className="grid grid-cols-2 rounded-t-lg bg-sky-300 border-t-2 border-sky-500 border-x-2">
                    <h1 className="col-span-1 text-center">Others</h1>
                    <h1 className="col-span-1 text-center">Taka</h1>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-1">
                <div className="col-span-1">
                    {
                        paymentMonths.map((data, index) => <MonthPaymentCard index={index} indexNo={paymentMonths.length - index} paymentData={paymentData} data={data} key={index}></MonthPaymentCard>)
                    }
                </div>
                <div className="col-span-1">
                    {
                        othersPaymentItems.map((data, index) => <MonthPaymentCard index={index} indexNo={othersPaymentItems.length - index} paymentData={paymentData} data={data} key={index}></MonthPaymentCard>)
                    }
                </div>
            </div>
        </div>
    );
};

const MonthPaymentCard = ({ data, paymentData, indexNo, index }) => {

    return (
        <div className={`${indexNo === 1 && "rounded-b-lg border-b-2"} h-7 border-t border-sky-500 border-x-2 grid grid-cols-2 justify-center items-center ${index % 2 === 0 ? "bg-sky-50" : "bg-sky-200"}`}>
            <h1 className="font-semibold px-1">{data.title}</h1>
            <h1 className="text-end pr-2 font-semibold">{paymentData.filter(ele => ele[data.item]).length === 0 ? "-" : paymentData.filter(ele => ele[data.item]).map(ele => ele[data.item]).reduce((a, b) => a + b)}</h1>
        </div>

    );
};