import useBatchName from "../hooks/useBatchName";

const BatchClassName = ({ batchNo }) => {

    const { batchNameData, batchNameLoading } = useBatchName();

    if (batchNameLoading) {
        return (
            <>
                <span className="loading loading-spinner loading-xs"></span><span> Loading...</span>
            </>
        )
    } else {
        return batchNameData[batchNo]
    }
};

export default BatchClassName;

// batchAndClass.js

// const batchName = {
//     "24": "Six",
//     "23": "Seven",
//     "22": "Eight",
//     "21": "Nine",
//     "20": "New Ten",
//     "19": "SSC - 24",
//     "18": "SSC - 23",
//     "17": "SSC - 22"
// };

// export { batchName };