import { useEffect, useState } from "react";
import PageTile from "../../contents/PageTile";
import axios from "axios";
import Loading from "../../contents/Loading";
import Swal from "sweetalert2";

const BatchChangeForm = () => {

    const [batchNameLoading, setBatchNameLoading] = useState(true);
    const [batchNameData, setBatchNameData] = useState({});
    useEffect(() => {
        setBatchNameLoading(true);
        const url = 'https://school-student-info-client.vercel.app/studetns_class_name';
        axios.get(url).then(res => { setBatchNameData(res.data[0]); setBatchNameLoading(false); }).catch(err => { setBatchNameLoading(false); console.log(err); Swal.fire({ title: err.message }) });
    }, []);

    return (
        <div>
            <PageTile mainTitle={"Change Batch Class"}></PageTile>
            <form>
                {
                    batchNameLoading ?
                        <Loading></Loading>
                        :
                        <div className="flex flex-col gap-2">
                            {
                                Object.keys(batchNameData).reverse().map((ele, index) => <FormInputField key={index} batchData={batchNameData} batchNo={ele}></FormInputField>)
                            }
                        </div>
                }
            </form>

        </div>
    );
};

export default BatchChangeForm;


const FormInputField = ({ batchData, batchNo }) => {
    return (
        <div className="flex justify-center items-center gap-2">
            <label htmlFor="17" className="p-4 shadow-md bg-sky-200 rounded-2xl">
                <h1>Batch No: {batchNo}</h1>
                <input type="text" name="17" id="17" maxLength={12} className="rounded-xl p-3 capitalize font-bold" defaultValue={batchData[batchNo]} />
            </label>
        </div>
    )
}