import useAdmin from "../../hooks/useAdmin";
import MainButton from "../../contents/MainButton";
import { PiStudentFill } from "react-icons/pi";
import { BiSpreadsheet } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { FcTodoList } from "react-icons/fc";
import { Link } from "react-router-dom";

const Home = () => {

    const { adminLoading, adminStatus } = useAdmin();

    const linkButtons = [
        { path: "/todo", btn_name: <FcTodoList />, title: "Todo Message", adminPannel: false },
        { path: "/attendence", btn_name: <BiSpreadsheet />, title: "Attendence", adminPannel: false },
        { path: "/students", btn_name: <PiStudentFill />, title: "Students", adminPannel: false },
        { path: "/users", btn_name: <FaChalkboardTeacher />, title: "Teachers", adminPannel: false },
        { path: "/admin_use_only", btn_name: <MdAdminPanelSettings />, title: "Admin", adminPannel: true },
    ];

    return (
        <div className="flex flex-col justify-center items-center gap-1 mb-5">
            <h1 className="my-2 text-center font-bold text-xl text-sky-800">Home Page</h1>
            {
                adminLoading ?
                    <div className="grid grid-cols-2 justify-center items-center gap-2">
                        {
                            linkButtons.filter(ele => !ele.adminPannel).map((ele, index) => <MainButton key={index} btn_name={<span className="loading loading-spinner loading-lg"></span>} title={"Loading..."}></MainButton>)
                        }
                    </div>
                    :
                    adminStatus ?
                        <div className="grid grid-cols-2 justify-center items-center gap-2">
                            {
                                linkButtons.map((ele, index) => <Link to={ele.path} key={index}><MainButton title={ele.title} btn_name={ele.btn_name}></MainButton></Link>)
                            }
                        </div>
                        :
                        <div className="grid grid-cols-2 justify-center items-center gap-2">
                            {
                                linkButtons.filter(ele => !ele.adminPannel).map((ele, index) => <Link to={ele.path} key={index}><MainButton title={ele.title} btn_name={ele.btn_name}></MainButton></Link>)
                            }
                        </div>

            }
        </div >
    );
};

export default Home;

