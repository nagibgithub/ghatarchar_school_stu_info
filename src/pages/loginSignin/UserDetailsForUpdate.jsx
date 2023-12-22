import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../contents/Loading";
import axios from "axios";
import PageTile from "../../contents/PageTile";
import "./login.css";
import Swal from "sweetalert2";

const UserDetailsForUpdate = () => {

    const [userInfo, setUserInfo] = useState({});
    const [userDataLoading, setUserDataLoading] = useState(true);
    // const [teacherNickName, setTeacherNickName] = useState([]);
    // const [customNickName, setCustomNickName] = useState("");
    // const [selectCustomNickName, setSelectCustomNickName] = useState(false);

    const navigate = useNavigate();
    const userId = useParams().id;

    useEffect(() => {
        setUserDataLoading(true);
        const url = `https://school-student-info-client.vercel.app/teacher_info/${userId}`;
        axios.get(url).then(res => { setUserInfo(res.data); setUserDataLoading(false); }).catch(err => { console.log(err); setUserDataLoading(err) });
    }, [userId]);

    // const handleUserName = e => setTeacherNickName(e.target.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)));

    const handleSubmitForm = e => {
        e.preventDefault();
        e.target.teacher_nickName.value === "" ?
            Swal.fire({ title: "Select a nick name" })
            :
            (e.target.teacher_nickName.value.split(" ").length !== 1 || e.target.teacher_nickName.value.split(" ")[1] === "") ?
                Swal.fire({ title: "Nick Name must be in one word" })
                :
                <>
                    {
                        Swal.fire({ title: "Are you sure?", text: "You want to update your information", icon: "question", showConfirmButton: true, confirmButtonText: "Update", showCancelButton: true }).then(res => {
                            if (res.isConfirmed) {

                                setUserDataLoading(true);

                                const teacher_name = e.target.teacher_name.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                                const teacher_nickName = e.target.teacher_nickName.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                                const teacher_father = e.target.teacher_father.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                                const teacher_mother = e.target.teacher_mother.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                                const teacher_mobile1 = e.target.teacher_mobile1.value;
                                const teacher_mobile2 = e.target.teacher_mobile2.value;
                                const teacher_pin = e.target.teacher_pin.value;

                                const update_data = { teacher_name, teacher_father, teacher_mother, teacher_mobile1, teacher_mobile2, teacher_pin, teacher_nickName };
                                console.log(update_data);
                                // const url = `http://localhost:3000/update_teacher_info/${userInfo._id}`;
                                const url = `https://school-student-info-client.vercel.app/update_teacher_info/${userInfo._id}`;
                                axios.patch(url, update_data).then(res => {
                                    console.log(res.data);
                                    if (res.data.modifiedCount === 1) {
                                        Swal.fire({ title: "Information Updated", icon: "success", timer: 1500 });
                                        navigate('/login');
                                    } else {
                                        Swal.fire({ title: "Can Not Updated", text: "হেড স্যারকে জানান যে, সমস্যা হইছে। কাজ হয় না।", icon: "error" });
                                        setUserDataLoading(false);
                                    }
                                }).catch(err => { console.log(err); setUserDataLoading(false); Swal.fire({ title: "Can Not Updated", text: err.message, icon: "error" }); });
                            }
                        })
                    }
                </>

    };

    return (
        <div className="px-2">
            {
                userDataLoading ?
                    <Loading></Loading>
                    :
                    <div>

                        <PageTile mainTitle={"Profile Update"}></PageTile>

                        <form onSubmit={(e) => handleSubmitForm(e)} className="flex flex-col gap-2">

                            {/* teacher name */}
                            <label htmlFor="teacher_name" className="login-input-div">
                                <h1 className="login-input-label">1. Name: {userInfo.teacher_name}</h1>
                                <input className="login-input capitalize" defaultValue={userInfo.teacher_name} placeholder={"Type New Name"} type="text" name="teacher_name" id="teacher_name" required />
                            </label>


                            {/* teacher nick name */}
                            <label htmlFor="teacher_nickName" className="login-input-div">
                                <h1 className="login-input-label">2. Name: {userInfo.teacher_nickName}</h1>
                                <input className="login-input capitalize" defaultValue={userInfo.teacher_nickName} placeholder={"Type Nick Name"} type="text" name="teacher_nickName" id="teacher_nickName" required />
                            </label>

                            {/* <div className="login-input-div">
                                <h1 className="login-input-label">2. Select Your Nick Name:</h1>
                                <div className="flex flex-col gap-2">
                                    {teacherNickName.map((ele, index) => ele !== "" && <label htmlFor={ele} key={index} className="flex gap-2 cursor-pointer"><input onClick={() => setSelectCustomNickName(false)} className="radio checked:bg-sky-600" type="radio" name="teacher_nickName" id={ele} value={ele} /><h1 className="login-input-label capitalize">{ele}</h1></label>)}
                                    <label htmlFor="customNickName" className="flex gap-2 cursor-pointer items-center">
                                        <input className="radio checked:bg-sky-600" type="radio" name="teacher_nickName" id="customNickName" value={customNickName} checked={selectCustomNickName ? true : false} />
                                        <input onFocus={() => setSelectCustomNickName(true)} onChange={(e) => setCustomNickName(e.target.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))} placeholder="Or type custom Name" className="login-input capitalize" type="text"></input>
                                    </label>
                                </div>
                            </div> */}

                            {/* Father name */}
                            <label htmlFor="teacher_father" className="login-input-div">
                                <h1 className="login-input-label">3. Father Name: {userInfo.teacher_father}</h1>
                                <input className="login-input capitalize" defaultValue={userInfo.teacher_father} placeholder={"Type Father Name"} type="text" name="teacher_father" id="teacher_father" required />
                            </label>

                            {/* Mother name */}
                            <label htmlFor="teacher_mother" className="login-input-div">
                                <h1 className="login-input-label">4. Mother Name: {userInfo.teacher_mother}</h1>
                                <input className="login-input capitalize" defaultValue={userInfo.teacher_mother} placeholder={"Type Mother Name"} type="text" name="teacher_mother" id="teacher_mother" required />
                            </label>

                            {/* email */}
                            {/* <label className="login-input-div" htmlFor="teacher_email">
                                <h1 className="login-input-label">5. Email: {userInfo.teacher_email}</h1>
                                <input className="login-input" defaultValue={userInfo.teacher_email} placeholder={"Type New Email"} type="email" name="teacher_email" id="teacher_email" readOnly required />
                            </label> */}

                            {/* mobile - 1 */}
                            <label className="login-input-div" htmlFor="teacher_mobile1">
                                <h1 className="login-input-label">5. Mobile 1: {userInfo.teacher_mobile1}</h1>
                                <input className="login-input" defaultValue={userInfo.teacher_mobile1} placeholder={"018********"} type="tel" name="teacher_mobile1" pattern="[0]{1}[1]{1}[3-9]{1}[0-9]{8}" min={11} max={11} id="teacher_mobile1" required />
                            </label>

                            {/* mobile - 2 */}
                            <label className="login-input-div" htmlFor="teacher_mobile2">
                                <h1 className="login-input-label">6. Mobile 2: {userInfo.teacher_mobile2} (Optional)</h1>
                                <input className="login-input" defaultValue={userInfo.teacher_mobile2} placeholder={"018********"} type="tel" name="teacher_mobile2" pattern="[0]{1}[1]{1}[3-9]{1}[0-9]{8}" min={11} max={11} id="teacher_mobile2" />
                            </label>

                            {/* pin */}
                            <label className="login-input-div" htmlFor="teacher_pin">
                                <h1 className="login-input-label">7. Pin: Number</h1>
                                <input className="login-input" defaultValue={userInfo.teacher_pin} placeholder={"Min 5 Digit Number"} type="number" pattern="[0-9]{5,}" name="teacher_pin" id="teacher_pin" required />
                            </label>

                            <div>
                                <input className="btn btn-block btn-success font-bold" type="submit" value="Update" />
                            </div>

                        </form>
                    </div>
            }
        </div>
    );
};

export default UserDetailsForUpdate;