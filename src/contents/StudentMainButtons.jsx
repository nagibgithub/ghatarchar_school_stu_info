import { FaList, FaUserEdit } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

const StudentMainButtons = ({ studentButtonLoading }) => {
    return (
        <div className="flex justify-center items-center gap-2 shadow-md p-2">
            {
                studentButtonLoading ?
                    <>
                        <button className="w-24 flex flex-col justify-center items-center h-20 bg-gray-300 shadow-md rounded-xl gap-1"><h1 className="text-2xl"><IoPersonAdd /></h1><h1 className="text-xs font-semibold">Loading...!</h1></button>
                        <button className="w-24 flex flex-col justify-center items-center h-20 bg-gray-300 shadow-md rounded-xl gap-1"><h1 className="text-2xl"><FaUserEdit /></h1><h1 className="text-xs font-semibold">Loading...!</h1></button>
                        <button className="w-24 flex flex-col justify-center items-center h-20 bg-gray-300 shadow-md rounded-xl gap-1"><h1 className="text-2xl"><FaList /></h1><h1 className="text-xs font-semibold">Loading...!</h1></button>
                    </>
                    :
                    <>
                        <Link to={"/students/add_student/"}><button className="w-24 flex flex-col justify-center items-center h-20 bg-red-300 shadow-md rounded-xl gap-1"><h1 className="text-2xl"><IoPersonAdd /></h1><h1 className="text-xs font-semibold">Add New</h1></button></Link>
                        <Link to={`/students/all_students/`}><button className="w-24 flex flex-col justify-center items-center h-20 bg-sky-300 shadow-md rounded-xl gap-1"><h1 className="text-2xl"><FaUserEdit /></h1><h1 className="text-xs font-semibold">Update List</h1></button></Link>
                        <Link to={`/students/details_list/`}><button className="w-24 flex flex-col justify-center items-center h-20 bg-green-300 shadow-md rounded-xl gap-1"><h1 className="text-2xl"><FaList /></h1><h1 className="text-xs font-semibold">All Students</h1></button></Link>
                    </>
            }
        </div>
    );
};

export default StudentMainButtons;