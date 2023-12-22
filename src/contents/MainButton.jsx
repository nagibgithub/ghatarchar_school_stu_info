
const MainButton = ({ btn_name, title, backgroundColorCode = "bg-sky-200 border-sky-800 text-sky-800" }) => {

    return (
        <>
            <div className={`text-5xl w-32 h-32 border-4 flex-col cursor-pointer hover:bg-sky-400 active:bg-sky-100 pt-3 shadow-lg active:shadow-sky-700 hover:shadow-sky-400 ${backgroundColorCode} rounded-3xl flex justify-center items-center text-center`}>
                <h1 className={``}>{btn_name}</h1>
                <h1 className={`text-center text-sm my-1 font-bold`}>{title}</h1>
            </div>
        </>
    );
};

export default MainButton;