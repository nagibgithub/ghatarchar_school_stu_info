import { Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import { Toaster } from "react-hot-toast";
import Footer from "../navBar/Footer";

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="container mx-auto px-2 ">
                <NavBar></NavBar>
                <Outlet></Outlet>
                <Toaster />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;