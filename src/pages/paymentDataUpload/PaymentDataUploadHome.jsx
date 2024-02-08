import Loading from "../../contents/Loading";
import PageTile from "../../contents/PageTile";
import useAdmin from "../../hooks/useAdmin";
import Home from "../home/Home";
import PaymentDataUpload from "./PaymentDataUpload";
import PaymentsDelete from "./PaymentsDelete";

const PaymentDataUploadHome = () => {

    const { adminLoading, adminStatus } = useAdmin();

    if (adminLoading) {
        return (
            <Loading></Loading>
        );
    } else if (adminStatus === true) {
        return (
            <div className="flex flex-col justify-center items-center gap-1 mb-5">
                <PageTile mainTitle={"Upload Payment Data"} subTitle={"JSON formate"}></PageTile>
                <PaymentDataUpload></PaymentDataUpload>
                <PaymentsDelete></PaymentsDelete>
            </div>
        );
    } else {
        return (
            <Home></Home>
        );
    }
};

export default PaymentDataUploadHome;