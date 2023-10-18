
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";

const LoginPage = () => {

    const { auth, userInfo, loading } = useContext(AuthContext);

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                // IdP data available using getAdditionalUserInfo(result)
                console.log(token, user);
                // location.reload();
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode, errorMessage, email, credential);
                // ...
            });
    };







    const callSignOut = () => {

        Swal.fire({
            text: `Are You Sure?`,
            title: `Sign Out...?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Sign Out',
            denyButtonText: `Not Sign Out`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                signOut(auth).then(() => {
                    Swal.fire('You are logged out', ``, 'success');
                    location.reload();
                }).catch(err => {
                    Swal.fire('Something is going wrong', ``, 'error');
                    console.log(err);
                });
            } else if (result.isDenied) {
                Swal.fire('You are not log Out', '', 'info')
            }
        })

    };

    return (
        <div className="flex justify-center items-center flex-col gap-3 my-5">
            {
                loading ?
                    <h1>Loading...!</h1>
                    :
                    userInfo == null ?

                        <>
                            <h1>Login with Google</h1>
                            <button onClick={handleGoogleLogin} className="btn btn-circle w-32 h-32"><img className="w-28 h-28" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" /></button>
                        </>
                        :
                        <>
                            <img className="border-4 border-white shadow-lg shadow-sky-900" src={userInfo?.photoURL} alt="" />
                            <h1 className="text-lg font-serif font-semibold text-blue-900">{userInfo?.displayName}</h1>
                            <h1 className="font-serif font-semibold text-blue-900">{userInfo?.email}</h1>
                            <button onClick={callSignOut} className="btn btn-error font-bold text-red-950 shadow-md">Sign Out</button>
                        </>
            }
        </div>
    );
};

export default LoginPage;