import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import Home from './pages/Home';
import StudentEntry from './pages/StudentEntry';
import StudentPayment from './pages/StudentPayment';
import PaymentHistory from './pages/PaymentHistory';
import AddImage from './pages/addImage';
import Attendence from './pages/Attendence';
import AttendenceClass from './pages/AttendenceClass';
import DateList from './pages/DateList';
import LoginPage from './pages/LoginPage';
import AuthProvider from './context/AuthProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/stu_entry", element: <StudentEntry></StudentEntry> },
      { path: "/login", element: <LoginPage></LoginPage> },
      { path: "/add_image", element: <AddImage></AddImage> },
      { path: "/all_present", element: <DateList></DateList> },
      { path: "/attendence", element: <Attendence></Attendence> },
      { path: "/attendence/class/:class", element: <AttendenceClass></AttendenceClass> },
      { path: "/stu_payment", element: <StudentPayment></StudentPayment>, loader: () => fetch(`https://school-student-info-client.vercel.app/students`) },
      { path: "/stu_payment/:id", element: <PaymentHistory></PaymentHistory>, loader: ({ params }) => fetch(`https://school-student-info-client.vercel.app/student_payment/${params.id}`) },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
