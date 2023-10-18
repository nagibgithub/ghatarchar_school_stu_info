import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";


export const AuthContext = createContext();


const AuthProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);


    const logOut = () => {
        return signOut(auth);
    };




    useEffect(() => {

        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const loggedUser = { userUid: user.uid };
                fetch("https://school-student-info-client.vercel.app/jwt", { method: "POST", headers: { 'content-type': 'application/json' }, body: JSON.stringify(loggedUser) }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));
                setUserInfo(user);
                // console.log(user.uid);
                // const url =
                const teacherUidUrl = `https://school-student-info-client.vercel.app/teachers_uid/${user.uid}`
                fetch(teacherUidUrl).then(res => res.json()).then(data => {
                    const loggedData = data.teacher_lastLogin_at;
                    if (data.message === "error") {
                        const teacher_name = user.displayName;
                        const teacher_email = user.email;
                        const teacher_uid = user.uid;
                        const teacher_photo = user.photoURL;
                        const teacher_idCreation_at = user.metadata.createdAt;
                        const teacher_lastLogin_at = [];
                        teacher_lastLogin_at.push(user.metadata.lastLoginAt);
                        const teacher_data = { teacher_name, teacher_email, teacher_uid, teacher_photo, teacher_idCreation_at, teacher_lastLogin_at };

                        const url = `https://school-student-info-client.vercel.app/teacher-info`;
                        fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(teacher_data) }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));
                    } else if (loggedData.includes(user.metadata.lastLoginAt) === false) {
                        const lastLoggedData = data.teacher_lastLogin_at;
                        lastLoggedData.push(user.metadata.lastLoginAt);
                        const logDataUrl = `https://school-student-info-client.vercel.app/teacher_lastlogin/${data._id}`
                        fetch(logDataUrl, { method: "PATCH", headers: { 'content-type': 'application/json' }, body: JSON.stringify(lastLoggedData) }).then(res => res.json()).then(data => console.log(data));
                    }
                }).catch(err => console.log(err));




                setLoading(false);
                // ...
            } else {
                // User is signed out
                setLoading(false);
                // ...
            }
        });
        return () => {
            unSubscribe();
        };
    }, [auth]);




    const authInfo = {
        userInfo,
        loading,
        auth,
        logOut
    };



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;