import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, getAuth, getRedirectResult, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
import axios from "axios";
import toast from "react-hot-toast";

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
                axios.get(`http://localhost:3000/teacher_uid_check/${user.uid}`).then(res => {
                    if (res.data.message === false) {
                        axios.post("http://localhost:3000/teacher-info", { teacher_name: user.displayName, teacher_email: user.email, teacher_uid: user.uid, teacher_photo: user.photoURL, teacher_idCreation_at: user.metadata.createdAt, teacher_lastLogin_at: [user.metadata.lastLoginAt] }).then(res => res.data.insertedId ? toast.success("New Id Created") : toast.error("Something is going wrong")).catch(err => { console.log(err); toast.error(err.message); });
                    } else if (res.data.lastLogin !== user.metadata.lastLoginAt) {
                        const lastLoginAtTime = user.metadata.lastLoginAt;
                        axios.patch(`http://localhost:3000/teacher_lastlogin/${user.uid}`, { lastLoginAtTime }).then(res => res.data.modifiedCount === 1 ? toast.success("Logged information updated") : toast.error("Something is wrong")).catch(err => { console.log(err); toast.error(err.message) });
                    }
                })
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