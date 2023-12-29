
import { Link, NavLink } from "react-router-dom";
import './NavBar.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faListCheck, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

const StudentsNavbar = () => {

    const schoolLogo = "https://raw.githubusercontent.com/nagibgithub/ghatarchar_school_stu_info/main/public/123.png";
    const { loggedUser, loading } = useContext(AuthContext);
    const [userName, setUserName] = useState("User");

    useEffect(() => {
        if (loggedUser) {
            setUserName(loggedUser.displayName.split(" ").reverse()[0]);
        }
    }, [loggedUser]);

    const navOptions = [
        { path: "/", title: "Home", element: <FontAwesomeIcon icon={faHome} />, },
        { path: "/students/search", title: "Search", element: <FontAwesomeIcon icon={faSearch} />, },
        { path: "/attendence", title: "Attendence", element: <FontAwesomeIcon icon={faListCheck} />, },
        { path: "/login", title: userName, element: <FontAwesomeIcon icon={faUser} />, },
    ];

    const nav = navOptions.map((nav, index) => <NavLink key={index} to={nav.path} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : "inactive"}><h1>{nav.element}</h1><h1 className="text-sm">{nav.title}</h1></NavLink>);




    return (
        <div>

            <div className="nav-container shadow-md mb-2">

                <div className="school-title">
                    <Link to={'/'}><img src={schoolLogo} alt="school logo" /></Link>
                    <h1>Ghatarchar Secondary School</h1>
                </div>

                <div className="text-center">
                    {
                        loading ?
                            <>
                                <div className="flex justify-center items-center mt-5">
                                    <h1 className="common-button"><span className="loading loading-ring loading-sm"></span></h1>
                                    <h1 className="common-button"><span className="loading loading-ring loading-sm"></span></h1>
                                    <h1 className="common-button"><span className="loading loading-ring loading-sm"></span></h1>
                                    <h1 className="common-button"><span className="loading loading-ring loading-sm"></span></h1>
                                </div>
                            </>
                            :
                            loggedUser ?
                                <>
                                    <div className="flex items-center justify-center font-semibold mt-1">
                                        {nav}
                                    </div>
                                </>
                                :
                                <>
                                    <h1 className="text-lg font-bold pb-2 text-red-600 my-5">Please Login First</h1>
                                </>
                    }
                </div>
            </div>
        </div>
    );
};

export default StudentsNavbar;


