import Loading from "../../contents/Loading";
import useAdmin from "../../hooks/useAdmin";
import MainButton from "../../contents/MainButton";
import { FaHome } from "react-icons/fa";
import PageTile from "../../contents/PageTile";
import UserList from "./UserList";
import { Link } from "react-router-dom";

const UsersHome = () => {

    const { adminLoading, adminStatus } = useAdmin();

    return (
        <div className="mx-2 mb-4">
            {
                adminLoading ?
                    <>
                        <PageTile mainTitle={"Loading"}></PageTile>
                        <Loading></Loading>
                    </>
                    :
                    !adminStatus ?
                        <div className="flex justify-center items-center text-center flex-col">
                            <PageTile mainTitle={"Warning...!"} subTitle={""} color="sky"></PageTile>
                            <img className="w-24" src="https://img.freepik.com/free-vector/warning-sign-gradient-shine_78370-1774.jpg" alt="" />
                            <img className="w-40" src="https://img.freepik.com/free-vector/two-red-stop-signs-set_78370-1291.jpg" alt="" />
                            <div className="px-5 flex flex-col gap-5 py-5 m-5 bg-yellow-200 font-bold">
                                <h1 className="text-red-600">Admin use only</h1>
                                <h1 className="text-red-600">Entry Restricted</h1>
                            </div>
                            <Link to={'/'}><MainButton btn_name={<FaHome />} title={"Return Home"}></MainButton></Link>
                        </div>
                        :
                        <>
                            <PageTile mainTitle={"User List"} link="/admin_use_only"></PageTile>
                            <UserList></UserList>
                        </>
            }
        </div >
    );
};

export default UsersHome;

