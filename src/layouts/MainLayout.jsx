import { Link, Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import { Toaster } from "react-hot-toast";
import Footer from "../navBar/Footer";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="">
                <NavBar></NavBar>
                <Outlet></Outlet>
                <Toaster />
            </div>
            <div className="fixed bottom-4 right-4">
                <Link to={"/write_message"}>
                    <button className="btn btn-info btn-circle shadow-lg shadow-sky-600"><FontAwesomeIcon icon={faPlus} beatFade /></button>
                </Link>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;