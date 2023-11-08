import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "../contents/Loading";

const PrivateRoute = ({ children }) => {

    const { loggedUser, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <>
                <Loading></Loading>
            </>
        )
    }

    if (loggedUser) {
        return children;
    }

    return (
        <Navigate to={'/login'} replace></Navigate>
    );
};

export default PrivateRoute;