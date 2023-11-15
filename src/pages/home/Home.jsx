import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import Loading from "../../contents/Loading";

const Home = () => {

    const { loading, adminStatus } = useAdmin();

    const linkButtons = [
        { path: "/add_student/select_class", element: "Add New Student", status: true, privateButton: false },
        { path: "/exam", element: "Exam", privateButton: false },
        { path: "/users", element: "All Users", privateButton: true },
        { path: "/attendence", element: "Attendence", privateButton: false },
        { path: "/all_student_info", element: "All Students", status: true, privateButton: false },
        { path: "/all_days", element: "All Days", privateButton: false },
        { path: "/login", element: "Login", privateButton: false },
        { path: "/example", element: "Demo", privateButton: false },
    ];

    return (
        <div className="flex flex-col justify-center items-center gap-1 mb-5">
            {
                loading ?
                    <Loading></Loading>
                    :
                    linkButtons.map((btn, index) => <Link key={index} to={btn.privateButton === true ? adminStatus === true ? btn.path : "/" : btn.path}><button className={`${btn.status ? "btn-error" : "btn-info"} btn w-48 font-bold text-sky-950`}>{btn.element}</button></Link>)
            }
        </div >
    );
};

export default Home;