import { Link } from "react-router-dom";
import Loading from "../contents/Loading";
import PageTile from "../contents/PageTile";
import useAdmin from "../hooks/useAdmin";
import MainButton from "../contents/MainButton";
import { FaHome } from "react-icons/fa";

const AdminRoute = ({ children }) => {

    const { adminLoading, adminStatus } = useAdmin();

    if (adminLoading) {
        return <Loading></Loading>;
    } else if (adminStatus) {
        return children;
    } else {
        return (
            <div className="flex justify-center items-center text-center flex-col my-2">
                <PageTile mainTitle={"Warning...!"} subTitle={""} color="red"></PageTile>
                <img className="w-24" src="https://img.freepik.com/free-vector/warning-sign-gradient-shine_78370-1774.jpg" alt="" />
                <img className="w-40" src="https://img.freepik.com/free-vector/two-red-stop-signs-set_78370-1291.jpg" alt="" />
                <div className="px-5 flex flex-col gap-5 py-5 m-5 bg-yellow-200 font-bold">
                    <h1 className="text-red-600">Please contact with HeadTeacher</h1>
                    <h1 className="text-red-600">Entry Restricted</h1>
                </div>
                <Link to={'/'}><MainButton btn_name={<FaHome />} title={"Return Home"}></MainButton></Link>
            </div>
        )
    }




};

export default AdminRoute;