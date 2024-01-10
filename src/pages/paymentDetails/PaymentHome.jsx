import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../contents/Loading";
import PageTile from "../../contents/PageTile";
import ExcelToJsDate from "../../contents/ExcelToJsDate";

const PaymentHome = () => {

    const [loadingPaymentData, setLoadingPaymentData] = useState(true);
    const [paymentData, setPaymentData] = useState([]);
    const [paymentDateArray, setDateWiseArray] = useState([]);
    useEffect(() => {
        setLoadingPaymentData(true);
        const url = `https://school-student-info-client.vercel.app/student_payment`;
        axios.get(url).then(res => {
            setPaymentData(res.data);
            const dateArray = [];
            res.data.forEach(ele => !dateArray.includes(ele.dateNum) && dateArray.push(ele.dateNum));
            setDateWiseArray(dateArray);
            setLoadingPaymentData(false);
        }).catch(err => { console.log(err); });
    }, []);

    console.log(paymentDateArray);

    return (
        <div className="mx-2">
            <PageTile mainTitle={"All Payment"}></PageTile>
            {
                loadingPaymentData ?
                    <Loading></Loading>
                    :
                    <div className="flex flex-col gap-5">
                        {
                            paymentDateArray.map((ele, index) => <div key={index} className="collapse grid gap-2 bg-sky-100 shadow-md rounded-lg">
                                <input type="checkbox" />
                                <div className="collapse-title grid grid-cols-5">
                                    <h1 className="font-bold text-center col-span-3"><ExcelToJsDate excelDate={ele} weekday={true}></ExcelToJsDate></h1>
                                    <h1 className="font-bold text-center text-sky-800 col-span-2">Total: {paymentData.filter(date => date.dateNum === ele).map(ele => ele.paid).reduce((a, b) => a + b).toLocaleString()}</h1>
                                </div>
                                <div className="collapse-content flex flex-col">
                                    <div >
                                        <div className="grid grid-cols-4 text-center text-sm font-bold border-2 border-sky-500 rounded-t-lg bg-sky-300">
                                            <h1 className="text-start pl-3">Id</h1>
                                            <h1>Amount</h1>
                                            <h1>Receipt</h1>
                                            <h1 className="text-end pr-2">Due</h1>
                                        </div>
                                    </div>
                                    {
                                        paymentData.filter(date => date.dateNum === ele).map((element, index) => <PaymentCard indexNo={paymentData.filter(date => date.dateNum === ele).length - index} index={index} key={index} paymentData={element}></PaymentCard>)
                                    }
                                </div>
                            </div>)
                        }
                    </div>
            }
        </div>
    );
};

export default PaymentHome;

const PaymentCard = ({ paymentData, indexNo, index }) => {

    const allowKeys = ["admission", "formFee", "exam1", "exam2", "exam3", "exam4", "idCard", "diary", "registration", "other1", "other2", 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const keysArray = Object.keys(paymentData).filter(ele => allowKeys.includes(ele));

    console.log(paymentData);

    return (
        <>
            <div onClick={() => document.getElementById(paymentData._id).showModal()} className={`${index % 2 === 0 ? "bg-sky-50" : "bg-sky-200"} text-sm border-t cursor-pointer p-2 border-sky-500 border-x-2 ${indexNo === 1 && "border-b-2 rounded-b-lg"}`}>
                <div className="grid grid-cols-4">
                    <h1 className="font-bold">{paymentData.school_id}</h1>
                    <h1 className="text-gray-600 font-semibold text-center">{paymentData.receiptNo}</h1>
                    <h1 className="text-blue-800 font-bold text-end">{paymentData.paid.toLocaleString()}</h1>
                    <h1 className="text-red-700 font-bold text-end pr-1">{paymentData.preDue !== 0 ? (paymentData.preDue * -1)?.toLocaleString() : "-"}</h1>
                </div>
            </div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id={paymentData._id} className="modal">
                <div className="bg-sky-100 p-4 rounded-3xl border-2 border-sky-700 shadow-md w-72">
                    <div className="flex justify-center items-center gap-2">
                        <h3 className="font-bold">{paymentData.school_id}</h3>
                        <h3 className="font-bold">{paymentData.stu_name}</h3>
                    </div>
                    <hr className="border border-sky-700" />
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            {
                                keysArray.map((ele, index) => <h1 className="capitalize" key={index}>{ele}</h1>)
                            }
                        </div>
                        <div>
                            {
                                keysArray.map((ele, index) => <h1 key={index} className="font-bold text-end">{paymentData[ele].toLocaleString()}</h1>)
                            }
                        </div>
                    </div>
                    <hr className="border border-sky-700" />
                    <div className="grid grid-cols-2 justify-between items-center">
                        <h1 className="capitalize">Total: </h1>
                        <h1 className="capitalize font-bold text-end">{paymentData.pay_total.toLocaleString()}</h1>
                    </div>
                    <div className="grid grid-cols-2 justify-between items-center">
                        <h1 className="capitalize">Due: </h1>
                        <h1 className={`${paymentData.dueTaka < 0 ? "text-red-600" : ""} capitalize font-bold text-end`}>{paymentData.dueTaka.toLocaleString()}</h1>
                    </div>
                    {
                        paymentData.discount &&
                        <div className="grid grid-cols-2 justify-between items-center">
                            <h1 className="capitalize">Discount: </h1>
                            <h1 className="capitalize font-bold text-end text-red-600">-{paymentData.discount.toLocaleString()}</h1>
                        </div>
                    }
                    <hr className="border border-sky-700" />
                    <div className="grid grid-cols-2 font-bold justify-between items-center mb-2">
                        <h1 className="capitalize">Pay: </h1>
                        <h1 className="capitalize text-end">{paymentData.paid.toLocaleString()}</h1>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <form method="dialog" className="">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-info btn-wide btn-sm shadow-md">OK</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>

    );
};

// <div className="collapse bg-base-200">
//   <input type="checkbox" />
//   <div className="collapse-title text-xl font-medium">
//     Click me to show/hide content
//   </div>
//   <div className="collapse-content">
//     <p>hello</p>
//   </div>
// </div>