import { FaMessage } from "react-icons/fa6";
import MainButton from "../../contents/MainButton";
import { TbMessagePlus } from "react-icons/tb";
import PageTile from "../../contents/PageTile";
import { Link } from "react-router-dom";

const MessageHome = () => {

    const navPath = [
        { path: "/write_message", icon: <TbMessagePlus />, title: "Write" },
        { path: "/message/todo", icon: <FaMessage />, title: "Todo" },
        { path: "/message/student", icon: <FaMessage />, title: "Students" },
        { path: "/message/teacher", icon: <FaMessage />, title: "Teachers" }
    ];

    return (
        <>
            <PageTile mainTitle={"Message Section"}></PageTile>
            <div className="flex justify-center items-center flex-col">
                {/* <h1 className="text-center my-4 font-bold text-sky-800 text-2xl">Message Section</h1> */}
                <div className={`grid grid-cols-2 font-bold justify-center items-center text-sky-800 gap-3`}>
                    {
                        navPath.map((ele, index) => <Link key={index} to={ele.path}><MainButton btn_name={ele.icon} title={ele.title}></MainButton></Link>)
                    }
                </div>
            </div>
        </>
    );
};

export default MessageHome;