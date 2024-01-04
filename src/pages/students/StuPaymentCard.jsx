import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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
                    <div className="border-2 bg-yellow-200 border-yellow-700 rounded-2xl px-4 py-2 text-xl font-bold text-center">
                        <h1 className="text-sky-700">Due Amount: <span className="loading loading-bars loading-sm text-red-600"></span></h1>
                    </div>
                    :
                    paymentData.length !== 0 ?
                        <>
                            {
                                paymentData[paymentData.length - 1]?.preDue !== 0 ?
                                    paymentData[paymentData.length - 1]?.preDue > 0 ?
                                        <div className="border-2 bg-green-200 border-green-700 rounded-2xl px-4 py-2 text-xl font-bold text-center">
                                            <h1 className="text-green-700">Advance Amount: {paymentData[paymentData.length - 1]?.preDue}</h1>
                                        </div>
                                        :
                                        <div className="border-2 bg-yellow-200 border-yellow-700 rounded-2xl px-4 py-2 text-xl font-bold text-center">
                                            <h1 className="text-red-700">Due Amount: {paymentData[paymentData.length - 1]?.preDue * -1}</h1>
                                        </div>
                                    :
                                    <div></div>
                            }
                            <div className="flex justify-center items-center my-2">
                                <Link to={`/students/student_payment/${stuId}`}>
                                    <button className="btn btn-info">Show payment details <FontAwesomeIcon icon={faArrowRight} /></button>
                                </Link>
                            </div>
                        </>
                        :
                        <div className="border-2 bg-gray-200 border-gray-700 rounded-2xl px-4 py-2 text-xl font-bold text-center">
                            <h1 className="text-gray-700">No Payment Data</h1>
                        </div>
            }
        </div>
    );
};

export default StuPaymentCard;