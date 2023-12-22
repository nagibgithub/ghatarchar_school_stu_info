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
import StudentsAttendence from "../pages/students/StudentsAttendence";
import BatchStudentListAttendence from "../pages/students/BatchStudentListAttendence";
import TeacherRoute from "./TeacherRoute";
import UpdateUser from "../pages/loginSignin/UpdateUser";
import StudentsSearch from "../pages/students/StudentsSearch";
import StudentDetailsInfo from "../pages/students/StudentDetailsInfo";
import TodoHome from "../pages/todoList/TodoHome";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [

            { path: "/", element: <PrivateRoute><Home></Home></PrivateRoute> },

            { path: "/login", element: <Login></Login> },

            // Students 
            { path: "/students", element: <PrivateRoute><TeacherRoute><StudentsHome></StudentsHome></TeacherRoute></PrivateRoute> },
            { path: "/students/details/:id", element: <PrivateRoute><TeacherRoute><StudentDetailsInfo></StudentDetailsInfo></TeacherRoute></PrivateRoute> },
            { path: "/students/search", element: <PrivateRoute><TeacherRoute><StudentsSearch></StudentsSearch></TeacherRoute></PrivateRoute> },
            { path: "/students/all_students", element: <PrivateRoute><TeacherRoute><StudentStatus></StudentStatus></TeacherRoute></PrivateRoute> },
            { path: "/students/attendence_info", element: <PrivateRoute><TeacherRoute><StudentsAttendence></StudentsAttendence></TeacherRoute></PrivateRoute> },
            { path: "/students/attendence_info/:batchId", element: <PrivateRoute><TeacherRoute><BatchStudentListAttendence></BatchStudentListAttendence></TeacherRoute></PrivateRoute> },

            // add New Students
            { path: "/students/add_student", element: <PrivateRoute><TeacherRoute><AddStuHome></AddStuHome></TeacherRoute></PrivateRoute> },
            { path: "/students/add_student/batch/:batch", element: <PrivateRoute><TeacherRoute><AddStudent></AddStudent></TeacherRoute></PrivateRoute> },

            // exam numbers
            { path: "/exam", element: <PrivateRoute><ExamHome></ExamHome></PrivateRoute> },
            { path: "/exam/batch/:batchId", element: <PrivateRoute><ExamBatch></ExamBatch></PrivateRoute> },

            // users
            { path: "/users", element: <PrivateRoute><UsersHome></UsersHome></PrivateRoute> },
            { path: "/users/:id", element: <PrivateRoute><UserDetails></UserDetails></PrivateRoute> },
            { path: "/users_update/:id", element: <PrivateRoute><UpdateUser></UpdateUser></PrivateRoute> },

            // attendence
            { path: "/attendence", element: <PrivateRoute><Attendence></Attendence></PrivateRoute> },
            { path: "/attendence/batch_info/:batchId", element: <PrivateRoute><BatchDetails></BatchDetails></PrivateRoute> },
            { path: "/attendence/attendence_list/:batchId", element: <PrivateRoute><BatchAttList></BatchAttList></PrivateRoute> },
            { path: "/batch/:batch", element: <PrivateRoute><BatchAttendence></BatchAttendence></PrivateRoute> },
            { path: "/attendence_today/:batchId", element: <PrivateRoute><PresentToday></PresentToday></PrivateRoute> },
            { path: "/attendence/day_details/:id", element: <PrivateRoute><DayDetails></DayDetails></PrivateRoute> },

            // students information
            { path: "/student_info/:id", element: <PrivateRoute><TeacherRoute><StudentDetails></StudentDetails></TeacherRoute></PrivateRoute> },
            { path: "/all_student_info_batch/:batchId", element: <PrivateRoute><TeacherRoute><BatchAllStuInfo></BatchAllStuInfo></TeacherRoute></PrivateRoute> },

            // all days information
            { path: "/all_days", element: <PrivateRoute><AllDay></AllDay></PrivateRoute> },

            // todo list
            { path: "/todo", element: <PrivateRoute><TeacherRoute><TodoHome></TodoHome></TeacherRoute></PrivateRoute> },


            { path: "/example", element: <ExamplePage></ExamplePage> },
        ]
    }
]);

export default router;