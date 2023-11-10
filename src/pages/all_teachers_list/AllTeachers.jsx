import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../contents/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const AllTeachers = () => {

    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        setLoading(true);
        const url = "https://school-student-info-client.vercel.app/teachers";
        axios.get(url).then(data => { setUsersData(data.data); setLoading(false); }).catch(err => console.log(err));
    }, []);

    return (
        <div className="mx-2 mb-4">
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
        </div >
    );
};

export default AllTeachers;

const Teacher = ({ teacher, usersData, setUsersData }) => {

    const { teacher_photo, teacher_name, _id } = teacher;

    const handleDeleteUser = id => {
        Swal.fire({
            title: `Delete <br/> ${teacher_name}?`,
            imageUrl: teacher_photo,
            text: "Are you sure?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#ff0000"
        }).then(res => {
            if (res.isConfirmed) {
                Swal.fire({
                    title: "Enter your password",
                    input: "password",
                    inputLabel: "Password",
                    inputPlaceholder: "Enter your password",
                    inputAttributes: {
                        maxlength: "10",
                        autocapitalize: "off",
                        autocorrect: "off"
                    }
                }).then(res => {
                    if (res.isConfirmed) {
                        if (res.value === "7317279") {
                            axios.delete(`https://school-student-info-client.vercel.app/teacher/${id}`).then(res => {
                                if (res.data.deletedCount === 1) {
                                    Swal.fire({ title: "Successfully removed", icon: "success", timer: 1500 })
                                    const newUserData = [];
                                    usersData.forEach(element => {
                                        if (element._id !== id) {
                                            newUserData.push(element);
                                        }
                                    });
                                    setUsersData(newUserData);
                                } else {
                                    Swal.fire({ title: "Somethig is going wrong" })
                                }

                            }).catch(err => console.log(err));
                        } else {
                            Swal.fire({ title: "Your Password is not matched", timer: 1500 })
                        }
                    }
                })
            }
        })
    }

    return (
        <div className="grid grid-cols-7 px-4 py-2 items-center gap-2 rounded-lg shadow-md bg-sky-100">
            <img className="col-span-1 rounded-full" src={teacher_photo} alt={teacher_name} />
            <h1 className="font-semibold col-span-5 capitalize">{teacher_name}</h1>
            <div className="flex justify-center items-center col-span-1">
                <button onClick={() => handleDeleteUser(_id)} className="btn btn-circle btn-outline shadow-md btn-error"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>
    );
};