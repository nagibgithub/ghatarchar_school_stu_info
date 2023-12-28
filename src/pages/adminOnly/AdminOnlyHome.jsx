import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../contents/Loading";
import useAdmin from "../../hooks/useAdmin";
import Home from "../home/Home";
import { faEdit, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import PageTile from "../../contents/PageTile";
import MainButton from "../../contents/MainButton";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";

const AdminOnlyHome = () => {

    const adminButtons = [
        { path: '/editBatchName', icon: <FontAwesomeIcon icon={faEdit} />, title: "Batch Name" },
        { path: "/users", icon: <FaChalkboardTeacher />, title: "Teachers" },
        { path: "/payment_data_upload", icon: <FontAwesomeIcon icon={faMoneyBillTransfer}/>, title: "Tution Upload" },
    ];

    const { adminLoading, adminStatus } = useAdmin();
    if (adminLoading) {
        return (
            <Loading></Loading>
        )
    } else if (adminStatus === true) {
        return (
            <div className="flex flex-col justify-center items-center gap-1 mb-5">
                <PageTile mainTitle={"Admin Use Only"} subTitle={"Nagib Mahfuz Fuad"}></PageTile>
                <div className="grid grid-cols-2 justify-center items-center gap-2">
                    {
                        adminButtons.map((ele, index) => <Link key={index} to={ele.path}><MainButton btn_name={ele.icon} title={ele.title} ></MainButton></Link>)
                    }
                </div>
            </div>
        )
    } else {
        return (
            <Home></Home>
        )
    }


};

export default AdminOnlyHome;