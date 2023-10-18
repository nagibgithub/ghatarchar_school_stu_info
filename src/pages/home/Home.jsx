import { Link } from "react-router-dom";

const Home = () => {

    const navOptions = [
        { path: "/", element: "Home" },
        { path: "/attendence", element: "Attendence" },
        { path: "/previous_attendence", element: "Previous" },
        { path: "/teachers", element: "Teacher List" },
        { path: "/stu_entry", element: "Student Data Entry" },
        { path: "/add_image", element: "Add Image" },
        { path: "/all_present", element: "All Present" },
        { path: "/login", element: "Login" },
        { path: "/stu_payment", element: "Student Payment" },
    ];

    return (
        <>
            <div className="mx-auto max-w-max flex flex-col justify-center items-center gap-2 my-10">
                {
                    navOptions.map((nav, index) => <Link key={index} to={nav.path}><button className="btn btn-accent text-lg font-bold w-60">{nav.element}</button></Link>)
                }
            </div>
        </>
    );
};

export default Home;