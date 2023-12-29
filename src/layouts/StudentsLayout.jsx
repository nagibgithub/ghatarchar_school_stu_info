import { Outlet } from "react-router-dom";
import Footer from "../navBar/Footer";
import StudentsNavbar from "../navBar/StudentsNavbar";

const StudentsLayout = () => {

    return (
        <>
            <StudentsNavbar></StudentsNavbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default StudentsLayout;