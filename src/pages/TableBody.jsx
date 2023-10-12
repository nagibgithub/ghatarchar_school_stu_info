
const TableBody = ({ tableHeadRow, data }) => {

    const newHeadObject = {};



    const excelStartDate = new Date(1900, 0, 1);
    const miliSeconds = (data.Date - 1) * 24 * 60 * 60 * 1000;
    const resultDate = new Date(excelStartDate.getTime() + miliSeconds);
    const formattedDate = resultDate.toDateString();

    
    
    tableHeadRow.forEach(fuad => {
        if (data[fuad]) {
            newHeadObject[fuad] = data[fuad];
        } else {
            newHeadObject[fuad] = 0;
        }
    });
    
    newHeadObject.Date = formattedDate;
    const dataValues = Object.values(newHeadObject);

    return (
        <tr className="border-2 text-center">
            {
                dataValues.map((pd, index) => <td key={index}>{pd}</td>)
            }
        </tr>
    );
};

export default TableBody;