import { Link, useLoaderData } from "react-router-dom";
import TableBody from "./TableBody";

const PaymentHistory = () => {

    const studentData = useLoaderData();
    const keysArr = [];
    let totalPaid = 0;
    let totalTution = 0;
    studentData.forEach(element => {
        totalPaid += element.Paid;
        element.Tution ? totalTution += element.Tution : totalTution += 0;
        const eachDaysKeysArr = Object.keys(element);
        eachDaysKeysArr.forEach(element => {
            if (keysArr.includes(element) === false) {
                keysArr.push(element)
            }
        });
    });

    const tutionFees = {
        6: 400,
        7: 400,
        8: 450,
        9: 500,
        10: 500
    };

    const itemsRemoved = ["_id", "Roll", "Name", "Class"];

    itemsRemoved.forEach(item => {
        const index = keysArr.indexOf(item);
        if (index !== -1) {
            keysArr.splice(index, 1)
        }
    });

    const tableHeadRow = keysArr.map((pd, index) => <th className="border-2 px-2" key={index}>{pd}</th>)

    return (
        <div className="mx-auto flex justify-center items-center flex-col">
            <div>
                <Link className="btn m-5" to={'/'}>Home</Link>
                <Link className="btn m-5" to={'/stu_payment'}>Back to all Student List</Link>
            </div>

            <div className="flex">
                <h1 className="border-2">Id: {studentData[0].Roll}</h1>
                <h1 className="border-2">Name: {studentData[0].Name}</h1>
                <h1 className="border-2">Class: {studentData[0].Class}</h1>
            </div>

            <table>
                <thead>
                    <tr>{tableHeadRow}</tr>
                </thead>
                <tbody>
                    {
                        studentData.map(pd => <TableBody key={pd._id} data={pd} tableHeadRow={keysArr}></TableBody>)
                    }
                </tbody>
            </table>


            <div className="p-5 border-2 my-2">
                <h1 className="text-xl font-bold text-blue-700">Total Paid: {totalPaid}/=</h1>
                <h1 className="text-xl font-bold text-blue-700">Tution: {totalTution}/=</h1>
                <h1 className="text-xl font-bold text-blue-700">Tution Complete: {totalTution / tutionFees[studentData[0].Class]} Months</h1>
            </div>


        </div>
    );
};

export default PaymentHistory;