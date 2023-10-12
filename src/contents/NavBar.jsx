import { NavLink } from "react-router-dom";
import "./navBar.css"

const NavBar = () => {

    const navOptions = [
        { path: "/", element: "Home" },
        { path: "/attendence", element: "Attendence" },
    ];


    return (
        <div className="w-full">
            <div className="flex flex-col items-center justify-center gap-2 pt-5">
                <img className="w-20" src="https://raw.githubusercontent.com/nagibgithub/ghatarchar_school_stu_info/main/src/assets/132.jpg" alt="" />
                <h1 className="text-center py-2 mb-2 text-lg font-serif font-semibold text-blue-800">Ghatarchar Secondary School</h1>
            </div>
            <div className="flex justify-center">
                {
                    navOptions.map((nav, index) => <NavLink onClick={() => sessionStorage.clear()} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : "inactive"} key={index} to={nav.path}>{nav.element}</NavLink>)
                }
            </div>
            <hr />
        </div>
    );
};

export default NavBar;