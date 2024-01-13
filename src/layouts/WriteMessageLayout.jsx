import { Outlet } from "react-router-dom";
import StudentsNavbar from "../navBar/StudentsNavbar";
import { Toaster } from "react-hot-toast";
import Footer from "../navBar/Footer";

const WriteMessageLayout = () => {
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

export default WriteMessageLayout;