import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../contents/Loading";
import BatchClassName from "../../contents/BatchClassName";
import UserPermissionButton from "./UserPermissionButton";

const UserList = () => {

    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        setLoading(true);
        const url = "https://school-student-info-client.vercel.app/teachers";
        axios.get(url).then(data => { setUsersData(data.data); setLoading(false); }).catch(err => console.log(err));
    }, []);

    return (
        <div>
            {
                loading ?
                    <Loading></Loading>
                    :
                    usersData.length !== 0 ?
                        <div className="flex flex-col gap-2">
                            {
                                usersData.map((user, index) => <Teacher usersData={usersData} setUsersData={setUsersData} key={index} teacher={user}></Teacher>)
                            }
                        </div>
                        :
                        <h1>Maybe there is no data in database</h1>
            }
        </div>
    );
};

export default UserList;

const Teacher = ({ teacher }) => {



    const { teacher_photo, teacher_name, _id, permissions, teacher_uid } = teacher;



    return (
        <div className="rounded-lg shadow-md bg-sky-100 px-4 py-2">
            <div className="grid grid-cols-7 items-center gap-2">
                <img className="col-span-1 rounded-full" src={teacher_photo} alt={teacher_name} />
                <h1 className="font-semibold col-span-5 capitalize">{teacher_name}</h1>
                <div className="flex justify-center items-center col-span-1">
                    <Link to={`/users/${_id}`}><button className="btn btn-circle shadow-md btn-success"><FontAwesomeIcon icon={faArrowRight} /></button></Link>
                </div>
            </div>
            <hr className="border border-sky-600 my-2 rounded-full" />
            <div className="flex gap-3 justify-center items-center">
                <UserPermissionButton btnName={"https://raw.githubusercontent.com/nagibgithub/nagibgithub/main/teacher.png"} permissions={permissions.is_teacher} teacher_uid={teacher_uid} permissionStatus={"teacher"}></UserPermissionButton>
                <UserPermissionButton btnName={"https://raw.githubusercontent.com/nagibgithub/nagibgithub/main/editor.png"} permissions={permissions.is_editor} teacher_uid={teacher_uid} permissionStatus={"editor"}></UserPermissionButton>
                <UserPermissionButton btnName={"https://raw.githubusercontent.com/nagibgithub/nagibgithub/main/visitor.png"} permissions={permissions.is_visitor} teacher_uid={teacher_uid} permissionStatus={"visitor"}></UserPermissionButton>
            </div>
            <hr className="border border-sky-600 my-2 rounded-full" />
            <div>
                {
                    permissions.class_teacher.map((ele, index) => <h1 key={index}>{<BatchClassName batchNo={ele}></BatchClassName>}</h1>)
                }
            </div>
        </div>
    );
};