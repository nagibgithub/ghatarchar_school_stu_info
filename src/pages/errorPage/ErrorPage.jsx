import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {

    const err = useRouteError();

    console.log(err);

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div>
                <img className="w-40" src="/123.png" alt="" />
            </div>
            <div className="flex flex-col justify-center items-center">
                {err.status && <h1 className="text-4xl font-bold">Error Code: <span className="font-extrabold text-red-600">{err.status}</span></h1>}
                {err.statusText && <h1>{err.statusText}</h1>}
                {err.data && <h1>{err.data}</h1>}
            </div>
            <hr className="border border-sky-600 w-2/3 my-5" />
            <div className="">
                <Link to={"/"}>
                    <button className="btn btn-success"><FontAwesomeIcon icon={faHome} /> Go to Home Page</button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;