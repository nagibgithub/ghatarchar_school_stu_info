import { Link, NavLink } from "react-router-dom";
import './NavBar.css';
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../contents/Loading";

const NavBar = () => {

    const navOptions = [
        { path: "/", element: "Home" },
        { path: "/attendence", element: "Attendence" },
        // { path: "/all_days", element: "All Days" },
    ];

    const { loggedUser, loading } = useContext(AuthContext);

    const schoolLogo = "https://raw.githubusercontent.com/nagibgithub/ghatarchar_school_stu_info/main/public/123.png";
    const nav = navOptions.map((nav, index) => <NavLink key={index} to={nav.path} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : "inactive"}>{nav.element}</NavLink>);

    return (
        <div className="nav-container">
            <hr className="border border-blue-600 my-3 w-full" />
            <div className="school-title">
                <img src={schoolLogo} alt="school logo" />
                <h1>Ghatarchar Secondary School</h1>
            </div>
            <hr className="border border-blue-600 my-3 w-full" />

            <div>
                {
                    loading ?
                        <>
                            <Loading></Loading>
                        </>
                        :
                        loggedUser ?
                            <div className="flex justify-center items-center gap-2">
                                <h1 className="font-bold text-lg w-32 sm:w-max text-center">{loggedUser.displayName}</h1>
                                <Link to={'/login'}><img className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2" src={loggedUser.photoURL} alt="" /></Link>
                            </div>
                            :
                            <>
                                <h1 className="text-lg font-bold text-red-600">You are not logged in</h1>
                            </>

                }
            </div>
            <hr className="border border-blue-600 my-3 w-full" />
            <div className="my-5 font-semibold">
                {nav}
            </div>
        </div>
    );
};

export default NavBar;