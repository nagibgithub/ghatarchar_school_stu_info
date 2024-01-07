
const ExcelToJsDate = ({ excelDate, weekday = false }) => {

    const dateFormatterWithWeek = new Intl.DateTimeFormat('en-US', { weekday: "short", day: '2-digit', month: 'short', year: "2-digit" });
    const dateFormatterWithOutWeek = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short', year: "2-digit" });

    const formattedDateWeek = dateFormatterWithWeek.format(new Date((new Date('1900-01-01')).getTime() + (excelDate - 2) * 24 * 60 * 60 * 1000));
    const formattedDateWithOutWeek = dateFormatterWithOutWeek.format(new Date((new Date('1900-01-01')).getTime() + (excelDate - 2) * 24 * 60 * 60 * 1000));

    if (weekday) {
        return formattedDateWeek;
    } else {
        return formattedDateWithOutWeek;

    }

};

export default ExcelToJsDate;

