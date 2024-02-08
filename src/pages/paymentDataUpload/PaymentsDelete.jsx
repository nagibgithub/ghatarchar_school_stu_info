import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const PaymentsDelete = () => {

    const [paymentCount, setPaymentCount] = useState(0);
    const [paymentCountLoading, setPaymentCountLoading] = useState(true);
    useEffect(() => { setPaymentCountLoading(true), axios.get("https://school-student-info-client.vercel.app/student_payment_count").then(res => { setPaymentCount(res.data.result); setPaymentCountLoading(false) }).catch(err => { toast.error(err.message) }) }, []);

    const handleDeleteAllPayments = () => {
        Swal.fire({ title: "Delete All Payments", text: "Are you Sure...?", icon: "warning", showConfirmButton: true, confirmButtonText: "Confirm Delete", showCancelButton: true }).then(res => {
            if (res.isConfirmed) {
                Swal.fire({ title: "Enter your password", input: "password", inputLabel: "Password", inputPlaceholder: "Enter your password", inputAttributes: { maxlength: "10", autocapitalize: "off", autocorrect: "off" } }).then(pass => {
                    if (pass.isConfirmed) {
                        if (pass.value === "7317279") {
                            setPaymentCountLoading(true);
                            const url = `https://school-student-info-client.vercel.app/student_payment`;
                            axios.delete(url).then(res => {
                                if (res.data.deletedCount === paymentCount) {
                                    setPaymentCountLoading(false);
                                    toast.success(`All ${paymentCount} payments deleted successfully`);
                                    setPaymentCount(0);
                                }
                            });
                        } else {
                            Swal.fire({ title: "Wrong Pass", icon: "error", timer: 1000 });
                        }
                    }
                });
            }
        });
    };

    return (
        <div>
            {
                paymentCountLoading ?
                    <button disabled className="btn btn-accent btn-lg">Counting Payments</button>
                    :
                    paymentCount === 0 ?
                        <button disabled className="btn btn-neutral btn-lg">No Payments is there</button>
                        :
                        <button onClick={handleDeleteAllPayments} className="btn btn-warning btn-lg">Delete {paymentCount} Payments</button>
            }
        </div>
    );
};

export default PaymentsDelete;