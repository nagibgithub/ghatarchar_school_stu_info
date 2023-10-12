import { Link, useLoaderData } from "react-router-dom";
import StudentTable from "../contents/StudentTable";

const StudentPayment = () => {

    const allStu = useLoaderData();

    return (
        <div className="">
            <Link to={'/'} className="btn">Home</Link>



            <h1>No of Students {allStu.length}</h1>

            <table className="mx-auto">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Class</th>
                    </tr>
                </thead>
                <tbody>
                    {allStu.map(pd => <StudentTable key={pd._id} student={pd}></StudentTable>)}
                </tbody>
            </table>



        </div>
    );
};

export default StudentPayment;