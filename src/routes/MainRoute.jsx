import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/loginSignin/Login";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/errorPage/ErrorPage";
import AllTeachers from "../pages/all_teachers_list/AllTeachers";
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

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            { path: "/", element: <PrivateRoute><Home></Home></PrivateRoute> },


            { path: "/login", element: <Login></Login> },


            { path: "/add_student/select_class", element: <PrivateRoute><AddStuHome></AddStuHome></PrivateRoute> },
            { path: "/add_student/batch/:batch", element: <PrivateRoute><AddStudent></AddStudent></PrivateRoute> },


            { path: "/exam", element: <PrivateRoute><ExamHome></ExamHome></PrivateRoute> },
            { path: "/exam/batch/:batchId", element: <PrivateRoute><ExamBatch></ExamBatch></PrivateRoute> },

            
            { path: "/all_teachers", element: <PrivateRoute><AllTeachers></AllTeachers></PrivateRoute> },


            { path: "/attendence", element: <PrivateRoute><Attendence></Attendence></PrivateRoute> },
            { path: "/attendence_today/:batchId", element: <PrivateRoute><PresentToday></PresentToday></PrivateRoute> },
           
           
            { path: "/all_student_info", element: <PrivateRoute><StudentStatus></StudentStatus></PrivateRoute> },
            { path: "/student_info/:id", element: <PrivateRoute><StudentDetails></StudentDetails></PrivateRoute> },
            { path: "/all_student_info_batch/:batchId", element: <PrivateRoute><BatchAllStuInfo></BatchAllStuInfo></PrivateRoute> },
           
           
            { path: "/all_days", element: <PrivateRoute><AllDay></AllDay></PrivateRoute> },
            { path: "/batch/:batch", element: <PrivateRoute><BatchAttendence></BatchAttendence></PrivateRoute> },
            
            
            { path: "/example", element: <ExamplePage></ExamplePage> },
        ]
    }
]);

export default router;