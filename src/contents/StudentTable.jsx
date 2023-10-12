import { Link } from "react-router-dom";

const StudentTable = ({ student }) => {

    const { school_id, Name } = student;
    

    const batchToClass = {
        '17': 'SSC-22',
        '18': 'SSC-23',
        '19': 'Ten',
        '20': 'Nine',
        '21': 'Eight',
        '22': 'Seven',
        '23': 'Six'
    };

    const result = batchToClass[school_id.toString().split('')[0] + school_id.toString().split('')[1]];

    return (
        <tr className="hover:bg-slate-400">
            <td><Link to={`/stu_payment/${school_id}`}>{school_id}</Link></td>
            <td><Link to={`/stu_payment/${school_id}`}>{Name}</Link></td>
            <td><Link to={`/stu_payment/${school_id}`}>{result}</Link></td>
        </tr>
    );
};

export default StudentTable;