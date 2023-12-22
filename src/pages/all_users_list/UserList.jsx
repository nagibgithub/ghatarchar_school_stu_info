import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../contents/Loading";
import { batchName } from "../../contents/batchAndClass";

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

    const { teacher_photo, teacher_name, _id, permissions } = teacher;

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
                {
                    permissions.is_admin ?
                        <PermissionButton btnName={"https://img.freepik.com/free-vector/illustration-customer-service-concept_53876-5883.jpg"} status={true}></PermissionButton>
                        :
                        <PermissionButton btnName={"https://img.freepik.com/free-vector/illustration-customer-service-concept_53876-5883.jpg"} status={false}></PermissionButton>
                }
                {
                    permissions.is_editor ?
                        <PermissionButton btnName={"https://img.freepik.com/free-vector/illustration-customer-service-concept_53876-5883.jpg"} status={true}></PermissionButton>
                        :
                        <PermissionButton btnName={"https://img.freepik.com/free-vector/illustration-customer-service-concept_53876-5883.jpg"} status={false}></PermissionButton>
                }
                {
                    permissions.is_teacher ?
                        <PermissionButton btnName={"https://img.freepik.com/free-vector/illustration-customer-service-concept_53876-5883.jpg"} status={true}></PermissionButton>
                        :
                        <PermissionButton btnName={"https://img.freepik.com/free-vector/illustration-customer-service-concept_53876-5883.jpg"} status={false}></PermissionButton>
                }
                {
                    permissions.is_visitor ?
                        <PermissionButton btnName={"https://img.freepik.com/free-vector/illustration-customer-service-concept_53876-5883.jpg"} status={true}></PermissionButton>
                        :
                        <PermissionButton btnName={"https://img.freepik.com/free-vector/illustration-customer-service-concept_53876-5883.jpg"} status={false}></PermissionButton>
                }
            </div>
            <hr className="border border-sky-600 my-2 rounded-full" />
            <div>
                {
                    permissions.class_teacher.map((ele, index) => <h1 key={index}>{batchName[ele]}</h1>)
                }
            </div>
        </div>
    );
};

const PermissionButton = ({ btnName, status }) => {

    return (
        <div className={`cursor-pointer shadow-md border-2 ${status ? "border-sky-600" : "border-gray-200"} rounded-full w-max`}>
            <img className={`w-8 rounded-full`} src={btnName} alt="" />
        </div>
    )
}