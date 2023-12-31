import { Outlet } from "react-router-dom";
import Footer from "../navBar/Footer";
import StudentsNavbar from "../navBar/StudentsNavbar";
import { Toaster } from "react-hot-toast";

const StudentsLayout = () => {

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="">
                <StudentsNavbar></StudentsNavbar>
                <Outlet></Outlet>
                <Toaster />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default StudentsLayout;