import { Link } from "react-router-dom";

const Home = () => {

    const linkButtons = [
        { path: "/add_student/select_class", element: "Add New Student", status: true },
        { path: "/exam", element: "Exam" },
        { path: "/all_teachers", element: "All Users" },
        { path: "/attendence", element: "Attendence" },
        { path: "/all_student_info", element: "All Students" },
        { path: "/all_days", element: "All Days" },
        { path: "/login", element: "Login" },
        { path: "/example", element: "Demo" },
    ];


    return (
        <div className="flex flex-col justify-center items-center gap-1 mb-5">
            {
                linkButtons.map((btn, index) => <Link key={index} to={btn.path}><button className={`${btn.status ? "btn-error" : "btn-info"} btn w-48 font-bold text-sky-950`}>{btn.element}</button></Link>)
            }
        </div>
    );
};

export default Home;