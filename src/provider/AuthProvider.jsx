import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, getAuth, getRedirectResult, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [loggedUser, setLoggedUser] = useState(null);

    // Authentication Auth
    const auth = getAuth(app);

    // google login
    const googleLogin = () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithRedirect(auth, googleProvider);
        getRedirectResult(auth).then(res => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(res);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = res.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log(token, user);
        }).catch(err => {
            // Handle Errors here.
            const errorCode = err.code;
            const errorMessage = err.message;
            // The email of the user's account used.
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(err);
            console.log(errorCode, errorMessage, credential);
            // ...
        });
    }


    // Get the currently signed-in user
    useEffect(() => {
        setLoading(true);
        const unSub = onAuthStateChanged(auth, user => {
            setLoading(true);
            if (user) {
                setLoggedUser(user);
            }
            setLoading(false);
        });
        return () => {
            unSub();
        }
    }, [auth]);

    // SignOut
    const logOut = () => {
        signOut(auth).then(() => {
            setLoggedUser(null);
        }).catch(err => {
            // An error happened.
            console.log(err);
        });
    }

    // return value
    const authInfo = { auth, logOut, loggedUser, setLoading, loading, googleLogin };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;