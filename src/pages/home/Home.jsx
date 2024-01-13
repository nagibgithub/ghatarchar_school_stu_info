import useAdmin from "../../hooks/useAdmin";
import MainButton from "../../contents/MainButton";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { MdAdminPanelSettings, MdMessage } from "react-icons/md";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Home = () => {

    const { adminLoading, adminStatus } = useAdmin();

    const linkButtons = [
        { path: "/login", btn_name: <FontAwesomeIcon icon={faUser} />, color: "bg-orange-200 border-orange-800 text-orange-800", title: "My Profile", adminPannel: false },
        { path: "/message", btn_name: <MdMessage />, color: "bg-green-200 border-green-800 text-green-800", title: "Messages", adminPannel: false },
        { path: "/students", btn_name: <PiStudentFill />, color: null, title: "Students", adminPannel: false },
        { path: "/users", btn_name: <FaChalkboardTeacher />, color: "bg-blue-200 border-blue-800 text-blue-800", title: "Teachers", adminPannel: false },
        { path: "/payment_home", btn_name: <FaSackDollar />, color: "bg-emerald-200 border-emerald-800 text-emerald-800", title: "Payments", adminPannel: false },
        { path: "/admin_use_only", btn_name: <MdAdminPanelSettings />, color: "bg-yellow-200 border-yellow-800 text-yellow-800", title: "Admin", adminPannel: true },
    ];

    return (
        <div className="flex flex-col justify-center items-center gap-1 mb-5">
            <h1 className="my-2 text-center font-bold text-xl text-sky-800">Home Page</h1>
            {
                adminLoading ?
                    <div className="grid grid-cols-2 justify-center items-center gap-2">
                        {
                            linkButtons.filter(ele => !ele.adminPannel).map((ele, index) => <MainButton key={index} backgroundColorCode={ele.color} btn_name={<span className="loading loading-spinner loading-lg"></span>} title={"Loading..."}></MainButton>)
                        }
                    </div>
                    :
                    adminStatus ?
                        <div className="grid grid-cols-2 justify-center items-center gap-2">
                            {
                                linkButtons.map((ele, index) => <Link to={ele.path} key={index}><MainButton backgroundColorCode={ele.color} title={ele.title} btn_name={ele.btn_name}></MainButton></Link>)
                            }
                        </div>
                        :
                        <div className="grid grid-cols-2 justify-center items-center gap-2">
                            {
                                linkButtons.filter(ele => !ele.adminPannel).map((ele, index) => <Link to={ele.path} key={index}><MainButton backgroundColorCode={ele.color} title={ele.title} btn_name={ele.btn_name}></MainButton></Link>)
                            }
                        </div>
            }
        </div >
    );
};

export default Home;

