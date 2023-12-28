import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useBatchName = () => {

    const [batchNameLoading, setBatchNameLoading] = useState(true);
    const [batchNameData, setBatchNameData] = useState({});
    useEffect(() => {
        setBatchNameLoading(true);
        const url = 'https://school-student-info-client.vercel.app/studetns_class_name';
        axios.get(url).then(res => { setBatchNameData(res.data[0]); setBatchNameLoading(false); }).catch(err => { setBatchNameLoading(false); console.log(err); Swal.fire({ title: err.message }) });
    }, []);

    return {
        batchNameLoading,
        batchNameData
    };
};

export default useBatchName;