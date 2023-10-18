
const AddImage = () => {



    const handleTeacherInfoForm = e => {
        e.preventDefault();
        const form = e.target;
        const teacher_name = form.name.value;
        const teacher_email = form.email.value;
        const teacher_mobile = form.mobile.value;
        const teacher_position = form.position.value;
        const teacher_data = { teacher_name, teacher_email, teacher_mobile, teacher_position };

        const url = `https://school-student-info-client.vercel.app/teacher-info`;
        fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(teacher_data) }).then(res => res.json()).then(data => console.log(data));


    };



    return (
        <div>
            <form className="p-2" onSubmit={handleTeacherInfoForm}>

                <label className="label" htmlFor="name">Teacher Name: </label>
                <input className="input input-bordered w-full max-w-xs capitalize" type="text" name="name" id="name" placeholder="Type Full Name" required />
                <br />
                <label className="label" htmlFor="email">Teacher Email: </label>
                <input className="input input-bordered w-full max-w-xs" type="email" name="email" id="email" placeholder="example@gmail.com" required />
                <br />
                <label className="label" htmlFor="mobile">Teacher Mobile: </label>
                <input className="input input-bordered w-full max-w-xs" type="tel" name="mobile" id="mobile" placeholder="01*********" required minLength={11} maxLength={11} />
                <br />
                <div className="my-3">

                    <h1>Teacher Role</h1>
                    <div className="flex gap-2 my-3">
                        <div className="border rounded-xl px-1 shadow-lg flex justify-center items-center">
                            <label className="pr-2" htmlFor="position-admin">Admin</label>
                            <input type="radio" value="admin" name="position" id="position-admin" />
                        </div>
                        <div className="border rounded-xl px-1 shadow-lg flex justify-center items-center">
                            <label className="pr-2" htmlFor="position-assistant">Assistant</label>
                            <input type="radio" value="assistant" name="position" id="position-assistant" />
                        </div>
                        <div className="border rounded-xl px-1 shadow-lg flex justify-center items-center">
                            <label className="pr-2" htmlFor="position-teacher">Teacher</label>
                            <input type="radio" value="teacher" name="position" id="position-teacher" />
                        </div>
                        <div className="border rounded-xl px-1 shadow-lg flex justify-center items-center">
                            <label className="pr-2" htmlFor="position-others">Others</label>
                            <input type="radio" value="others" name="position" id="position-others" />
                        </div>
                    </div>
                </div>
                <br />


                <div className="flex justify-center items-center">
                    <input className="btn btn-block btn-info" type="submit" value="Submit Data" />
                </div>


            </form>
        </div>
    );
};

export default AddImage;