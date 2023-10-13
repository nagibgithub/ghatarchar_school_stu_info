// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjr18VVAt-5AfpEK9q8hCYGHswH80AG_g",
    authDomain: "school-student-info.firebaseapp.com",
    projectId: "school-student-info",
    storageBucket: "school-student-info.appspot.com",
    messagingSenderId: "710207135004",
    appId: "1:710207135004:web:ee259ec293aef3cad3eed9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;