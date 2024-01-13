import { Link, Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MessageLayout = () => {
    return (
        <div className="min-h-screen flex flex-col container mx-auto">
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Toaster />
            <div className="fixed bottom-4 right-4">
                <Link to={"/write_message"}>
                    <button className="btn btn-info btn-circle shadow-lg shadow-sky-600"><FontAwesomeIcon icon={faPlus} beatFade /></button>
                </Link>
            </div>
        </div>
    );
};

export default MessageLayout;