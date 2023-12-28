import axios from "axios";
import Swal from "sweetalert2";

const PaymentDataUpload = () => {


    const handleDataUpload = e => {
        e.preventDefault();
        Swal.fire({ title: "Are You Sure", showCancelButton: true, text: `${JSON.parse(e.target.data.value).length} Payment Data`, showConfirmButton: true, confirmButtonText: "Upload", icon: "question" }).then(res => {
            if (res.isConfirmed) {
                const url = `https://school-student-info-client.vercel.app/upload_payment_data`;
                axios.post(url, JSON.parse(e.target.data.value)).then(res => {
                    console.log(res.data);
                    if (res.data.insertedCount === JSON.parse(e.target.data.value).length) {
                        Swal.fire({ icon: "success", title: `Successfully upload ${res.data.insertedCount} Payments` })
                        e.target.reset();
                    }

                }).catch(err => {
                    Swal.fire({ title: err.message, icon: "error" });
                    console.log(err);
                });
            }
        });
    };



    return (

        <div className="">
            <form onSubmit={e => handleDataUpload(e)} className="my-2">
                <div className="mx-5 my-2">
                    <label className="bg-sky-200 px-4 py-2 rounded-xl shadow-md flex flex-col justify-center items-center" htmlFor="data">
                        <h1 className="text-xl font-bold my-2">Past Your Data</h1>
                        <textarea className="p-5 font-semibold rounded-xl" name="data" id="data" cols="20" rows="10"></textarea>
                    </label>
                    <div className="flex justify-center my-2">
                        <input className="btn btn-primary btn-wide shadow-md" type="submit" value="Upload" />
                    </div>
                </div>

            </form>
        </div>

    );




};   

export default PaymentDataUpload;