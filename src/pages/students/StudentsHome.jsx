import { IoPersonAdd } from "react-icons/io5";
import PageTile from "../../contents/PageTile";
import { FaSearch, FaUserEdit } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import MainButton from "../../contents/MainButton";
import { Link } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { BiSpreadsheet } from "react-icons/bi";

const StudentsHome = () => {

    const linkButtons = [
        { path: "/attendence", btn_name: <BiSpreadsheet />, title: "Attendence", color: "bg-purple-200 border-purple-800 text-purple-800" },
        { path: "/students/student_payment_search", btn_name: <FcMoneyTransfer />, title: "Payment Info", color: "bg-blue-200 border-blue-800 text-blue-800" },
        { path: "/students/search", btn_name: <FaSearch />, title: "Stu Search", color: "bg-yellow-200 border-yellow-800 text-yellow-800" },
        { path: "/students/all_students", btn_name: <FaUserEdit />, title: "Update Info", color: "bg-sky-200 border-sky-800 text-sky-800" },
        { path: "/students/add_student", btn_name: <IoPersonAdd />, title: "Add New", color: "bg-red-200 border-red-800 text-red-800" },
        { path: "/students/details_list", btn_name: <FaList />, title: "All Student", color: "bg-green-200 border-green-800 text-green-800" },
    ];

    return (
        <div className="flex flex-col justify-center items-center">
            <PageTile mainTitle={"Student's Section"}></PageTile>
            <div className="grid grid-cols-2 gap-2 justify-center items-center mb-5">
                {
                    linkButtons.map((ele, index) => <Link key={index} to={ele.path}><MainButton backgroundColorCode={ele.color} title={ele.title} btn_name={ele.btn_name}></MainButton></Link>)
                }
            </div>
        </div>
    );
};

export default StudentsHome;