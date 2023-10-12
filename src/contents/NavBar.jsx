import { NavLink } from "react-router-dom";
import "./navBar.css"

const NavBar = () => {

    const navOptions = [
        { path: "/", element: "Home" },
        { path: "/attendence", element: "Attendence" },
    ];


    return (
        <div className="w-full">
            <img src="https://drive.google.com/file/d/12JZ161jloy27J2Xl1a82I6SzxJVNnuwa/view" alt="" />
            <h1 className="text-center py-2 mb-2 text-lg font-serif font-semibold text-blue-800">Ghatarchar Secondary School</h1>
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