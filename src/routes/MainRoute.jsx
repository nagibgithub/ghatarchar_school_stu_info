import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/loginSignin/Login";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Attendence from "../pages/attendence/Attendence";
import BatchAttendence from "../pages/attendence/BatchAttendence";
import StudentStatus from "../pages/student_overall/StudentStatus";
import BatchAllStuInfo from "../pages/student_overall/BatchAllStuInfo";
import AllDay from "../pages/all_day/AllDay";
import StudentDetails from "../pages/student_overall/StudentDetails";
import PresentToday from "../pages/attendence/PresentToday";
import AddStudent from "../pages/add_student/AddStudent";
import AddStuHome from "../pages/add_student/AddStuHome";
import ExamHome from "../pages/exam/ExamHome";
import ExamBatch from "../pages/exam/ExamBatch";
import ExamplePage from "../pages/example_page/Example";
import UserDetails from "../pages/all_users_list/UserDetails";
import BatchDetails from "../pages/attendence/BatchDetails";
import BatchAttList from "../pages/attendence/BatchAttList";
import DayDetails from "../pages/attendence/DayDetails";
import StudentsHome from "../pages/students/StudentsHome";
import UsersHome from "../pages/all_users_list/UsersHome";
import BatchStudentListAttendence from "../pages/students/BatchStudentListAttendence";
import EditorRoute from "./EditorRoute";
import UpdateUser from "../pages/loginSignin/UpdateUser";
import StudentsSearch from "../pages/students/StudentsSearch";
import StudentDetailsInfo from "../pages/students/StudentDetailsInfo";
import BatchNameChangeHome from "../pages/BatchNameChange/BatchNameChangeHome";
import AdminOnlyHome from "../pages/adminOnly/AdminOnlyHome";
import PaymentDataUploadHome from "../pages/paymentDataUpload/PaymentDataUploadHome";
import StudentPaymentHome from "../pages/paymentDetails/StudentPaymentHome";
import StudentsLayout from "../layouts/StudentsLayout";
import StudentsDetailsClassList from "../pages/students/StudentsDetailsClassList";
import PaymentStudentSearch from "../pages/paymentDetails/PaymentStudentSearch";
import PaymentHome from "../pages/paymentDetails/PaymentHome";
import MessageLayout from "../layouts/MessageLayout";
import MessageHome from "../pages/message-sections/MessageHome";
import WriteMessage from "../pages/message-sections/WriteMessage";
import TodoMessage from "../pages/message-sections/TodoMessage";
import TeacherMessage from "../pages/message-sections/TeacherMessage";
import StudentMessage from "../pages/message-sections/StudentMessage";
import WriteMessageLayout from "../layouts/WriteMessageLayout";
import StudentAdmissionMessage from "../pages/message-sections/StudentAdmissionMessage";
import AllAdmissionInfo from "../pages/message-sections/AllAdmissionInfo";
import AttendenceNewHome from "../pages/NewAttendence/AttendenceHome/AttendenceNewHome";
import AdminRoute from "./AdminRoute";
import StudentMessageGeneralNew from "../pages/message-sections/StudentMessageGeneralNew";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [

            { path: "/", element: <PrivateRoute><Home></Home></PrivateRoute> },

            { path: "/login", element: <Login></Login> },

            // exam numbers
            { path: "/exam", element: <PrivateRoute><ExamHome></ExamHome></PrivateRoute> },
            { path: "/exam/batch/:batchId", element: <PrivateRoute><ExamBatch></ExamBatch></PrivateRoute> },

            // users
            { path: "/users", element: <PrivateRoute><UsersHome></UsersHome></PrivateRoute> },
            { path: "/users/:id", element: <PrivateRoute><UserDetails></UserDetails></PrivateRoute> },
            { path: "/users_update/:id", element: <PrivateRoute><UpdateUser></UpdateUser></PrivateRoute> },

            // admin use only
            { path: "/admin_use_only", element: <PrivateRoute><AdminOnlyHome></AdminOnlyHome></PrivateRoute> },

            // Payment Details
            { path: "/payment_home", element: <PrivateRoute><EditorRoute><PaymentHome></PaymentHome></EditorRoute></PrivateRoute> },

            // Payment data upload
            { path: "/payment_data_upload", element: <PrivateRoute><EditorRoute><PaymentDataUploadHome></PaymentDataUploadHome></EditorRoute></PrivateRoute> },

            // batch Name Change
            { path: "/editBatchName", element: <PrivateRoute><BatchNameChangeHome></BatchNameChangeHome></PrivateRoute> },

            // attendence
            { path: "/attendence", element: <PrivateRoute><Attendence></Attendence></PrivateRoute> },
            { path: "/attendence/batch_info/:batchId", element: <PrivateRoute><BatchDetails></BatchDetails></PrivateRoute> },
            { path: "/attendence/attendence_list/:batchId", element: <PrivateRoute><BatchAttList></BatchAttList></PrivateRoute> },
            { path: "/attendence/batch/:batch", element: <PrivateRoute><BatchAttendence></BatchAttendence></PrivateRoute> },
            { path: "/attendence_today/:batchId", element: <PrivateRoute><PresentToday></PresentToday></PrivateRoute> },
            { path: "/attendence/day_details/:id", element: <PrivateRoute><DayDetails></DayDetails></PrivateRoute> },

            // students information
            { path: "/student_info/:id", element: <PrivateRoute><EditorRoute><StudentDetails></StudentDetails></EditorRoute></PrivateRoute> },
            { path: "/all_student_info_batch/:batchId", element: <PrivateRoute><EditorRoute><BatchAllStuInfo></BatchAllStuInfo></EditorRoute></PrivateRoute> },

            // all days information
            { path: "/all_days", element: <PrivateRoute><AllDay></AllDay></PrivateRoute> },

            { path: "/example", element: <ExamplePage></ExamplePage> },
        ]
    },
    {
        path: "/students",
        element: <StudentsLayout></StudentsLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [

            // Students 
            { path: "/students", element: <PrivateRoute><EditorRoute><StudentsHome></StudentsHome></EditorRoute></PrivateRoute> },
            { path: "/students/details/:id", element: <PrivateRoute><EditorRoute><StudentDetailsInfo></StudentDetailsInfo></EditorRoute></PrivateRoute> },
            { path: "/students/search", element: <PrivateRoute><EditorRoute><StudentsSearch></StudentsSearch></EditorRoute></PrivateRoute> },
            { path: "/students/all_students", element: <PrivateRoute><EditorRoute><StudentStatus></StudentStatus></EditorRoute></PrivateRoute> },
            { path: "/students/details_list", element: <PrivateRoute><EditorRoute><StudentsDetailsClassList></StudentsDetailsClassList></EditorRoute></PrivateRoute> },
            { path: "/students/details_list/:batchId", element: <PrivateRoute><EditorRoute><BatchStudentListAttendence></BatchStudentListAttendence></EditorRoute></PrivateRoute> },

            // Payment details
            { path: "/students/student_payment_search", element: <PrivateRoute><EditorRoute><PaymentStudentSearch></PaymentStudentSearch></EditorRoute></PrivateRoute> },
            { path: "/students/student_payment/:id", element: <PrivateRoute><EditorRoute><StudentPaymentHome></StudentPaymentHome></EditorRoute></PrivateRoute> },

            // add New Students
            { path: "/students/add_student", element: <PrivateRoute><EditorRoute><AddStuHome></AddStuHome></EditorRoute></PrivateRoute> },
            { path: "/students/add_student/batch/:batch", element: <PrivateRoute><EditorRoute><AddStudent></AddStudent></EditorRoute></PrivateRoute> },

        ]
    },
    {
        path: "/message",
        element: <MessageLayout></MessageLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            // message Home
            { path: "/message", element: <PrivateRoute><EditorRoute><MessageHome></MessageHome></EditorRoute></PrivateRoute> },
            { path: "/message/student", element: <PrivateRoute><EditorRoute><StudentMessage></StudentMessage></EditorRoute></PrivateRoute> },
            { path: "/message/student/admission", element: <PrivateRoute><EditorRoute><StudentAdmissionMessage></StudentAdmissionMessage></EditorRoute></PrivateRoute> },
            { path: "/message/student/all_admission", element: <PrivateRoute><EditorRoute><AllAdmissionInfo></AllAdmissionInfo></EditorRoute></PrivateRoute> },
            { path: "/message/student/general/new", element: <PrivateRoute><EditorRoute><StudentMessageGeneralNew></StudentMessageGeneralNew></EditorRoute></PrivateRoute> },
            { path: "/message/teacher", element: <PrivateRoute><EditorRoute><TeacherMessage></TeacherMessage></EditorRoute></PrivateRoute> },
            { path: "/message/todo", element: <PrivateRoute><EditorRoute><TodoMessage></TodoMessage></EditorRoute></PrivateRoute> },

        ]
    },
    {
        path: "/write_message",
        element: <WriteMessageLayout></WriteMessageLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            // write message
            { path: "/write_message", element: <PrivateRoute><EditorRoute><WriteMessage></WriteMessage></EditorRoute></PrivateRoute> }
        ]
    },
    {
        path: "/stu_new_attendence",
        errorElement: <ErrorPage></ErrorPage>,
        element: <MainLayout></MainLayout>,
        children: [
            { path: "/stu_new_attendence", element: <PrivateRoute><AdminRoute><AttendenceNewHome></AttendenceNewHome></AdminRoute></PrivateRoute> },
        ]
    }
]);

export default router;