import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";
import app from "../firebase/firebase.config";


export const AuthContext = createContext();


const AuthProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);


    const auth = getAuth(app);


    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            setUserInfo(user);
            setLoading(false)
            // ...
        } else {
            // User is signed out
            setLoading(false)
            // ...
        }
    });






    const authInfo = {
        userInfo,
        loading,
        auth
    };



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;