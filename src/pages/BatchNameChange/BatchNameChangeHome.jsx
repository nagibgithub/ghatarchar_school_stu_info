import Loading from "../../contents/Loading";
import useAdmin from "../../hooks/useAdmin";
import Home from "../home/Home";
import BatchChangeForm from "./BatchChangeForm";

const BatchNameChangeHome = () => {

    const { adminLoading, adminStatus } = useAdmin();
    if (adminLoading) {
        return (
            <Loading></Loading>
        )
    } else if (adminStatus === true) {
        return (
            <BatchChangeForm></BatchChangeForm>
        )
    } else {
        return (
            <Home></Home>
        )
    }


};

export default BatchNameChangeHome;