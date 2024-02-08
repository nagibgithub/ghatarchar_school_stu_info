import { Link, Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Footer from "../navBar/Footer";

const MessageLayout = () => {
    return (
        <div className="min-h-screen flex flex-col container mx-auto justify-between">
            <div>
                <NavBar></NavBar>
                <div className="my-2">
                <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
            <div className="fixed bottom-4 right-4">
                <Link to={"/write_message"}>
                    <button className="btn btn-info btn-circle btn-active shadow-lg shadow-sky-600"><FontAwesomeIcon icon={faPen} rotate={180} shake color="blue" /></button>
                </Link>
            </div>
            <Toaster />
        </div>
    );
};

export default MessageLayout;