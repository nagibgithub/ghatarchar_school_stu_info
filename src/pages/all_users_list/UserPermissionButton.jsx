import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UserPermissionButton = ({ permissionStatus, permissions, teacher_uid, btnName }) => {

    const [changeEditorLoading, setEditorLoading] = useState(false);
    const [editorStatus, setEditorStatus] = useState(false);
    useEffect(() => setEditorStatus(permissions), [permissions]);

    const handleChangeEditor = uid => {
        Swal.fire({ title: `Change ${permissionStatus}`, text: `${editorStatus ? `Remove ${permissionStatus} Permission` : `Give ${permissionStatus} Permission`}`, showConfirmButton: true, showCancelButton: true, confirmButtonText: `${editorStatus ? `Remove ${permissionStatus}` : `Make ${permissionStatus}`}`, confirmButtonColor: `${editorStatus ? "red" : "green"}`, }).then(res => {
            if (res.isConfirmed) {
                setEditorLoading(true);
                const url = `https://school-student-info-client.vercel.app/user_is_${permissionStatus}/${uid}`;
                axios.patch(url, { is_editor: !editorStatus }).then(res => {
                    if (res.data.modifiedCount === 1) {
                        toast.success(`Successfully changed ${permissionStatus} status`);
                        setEditorStatus(!editorStatus);
                        setEditorLoading(false);
                    } else {
                        Swal.fire({ title: "Something is going wrong...!", icon: "error", timer: 2000 });
                        setEditorLoading(false);
                    }
                });
            }
        });
    };



    return (
        <div>
            {
                changeEditorLoading ?
                    <button>
                        <div className={`cursor-pointer shadow-md border-4 border-sky-400 rounded-full w-max`}>
                            <div className="h-6 w-6 m-3 flex justify-center items-center">
                                <span className="loading loading-ring loading-lg"></span>
                            </div>
                        </div>
                    </button>
                    :
                    editorStatus ?
                        <button onClick={() => handleChangeEditor(teacher_uid)}><PermissionButton btnName={btnName} status={true}></PermissionButton></button>
                        :
                        <button onClick={() => handleChangeEditor(teacher_uid)}><PermissionButton btnName={btnName} status={false}></PermissionButton></button>
            }
        </div>
    );
};

export default UserPermissionButton;

const PermissionButton = ({ btnName, status }) => {

    return (
        <div className={`cursor-pointer shadow-md border-4 ${status ? "border-green-500" : "border-red-500"} rounded-full w-max`}>
            <img className={`w-6 h-6 m-3`} src={btnName} alt="" />
        </div>
    )
}