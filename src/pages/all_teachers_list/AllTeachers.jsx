import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../contents/Loading";

const AllTeachers = () => {

    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        setLoading(true);
        const url = "https://school-student-info-client.vercel.app/teachers";
        axios.get(url).then(data => { setUsersData(data.data); setLoading(false); }).catch(err => console.log(err));
    }, []);

    return (
        <div className="mx-2">
            {
                loading ?
                    <Loading></Loading>
                    :
                    usersData.length !== 0 ?
                        <div className="flex flex-col gap-2">{usersData.map((user, index) => <Teacher key={index} teacher={user}></Teacher>)}</div>
                        :
                        <h1>Maybe there is no data in database</h1>
            }
        </div >
    );
};

export default AllTeachers;

const Teacher = ({ teacher }) => {
    // const [teacherRol, setTeacherRol] = useState("others");
    const { teacher_photo, teacher_name, teacher_roll } = teacher;

    return (
        <div className="grid grid-cols-7 items-center gap-2 p-4 rounded-lg shadow-md bg-sky-100">
            <img className="col-span-1 rounded-full" src={teacher_photo} alt={teacher_name} />
            <h1 className="font-semibold col-span-4 capitalize">{teacher_name}</h1>
            <h1 className={`font-bold col-span-2 text-center capitalize ${teacher_roll === "admin" ? "text-red-600" : teacher_roll === "teacher" ? "text-green-600" : "text-yellow-600"}`}>{teacher_roll}</h1>
        </div>
    );
};