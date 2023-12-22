
const StudentCardLoading = () => {
    return (
        <div className="flex flex-col px-4 py-2 rounded-lg shadow-md bg-sky-100 border-2 border-sky-700 text-sky-700 font-semibold">
            <div className="flex gap-2">
                <h1 className="font-mono"><span className="loading loading-bars loading-sm"></span></h1>
                <h1><span className="loading loading-bars loading-sm"></span> <span className="loading loading-bars loading-sm"></span></h1>
            </div>
            <hr className="border border-sky-700 my-1" />
        </div>
    );
};

export default StudentCardLoading;