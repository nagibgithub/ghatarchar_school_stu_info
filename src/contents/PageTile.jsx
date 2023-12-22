import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const PageTile = ({ link = "/", mainTitle, subTitle, color = "sky" }) => {

    return (
        <div className={`grid grid-cols-6 gap-3 items-center my-3 bg-${color}-200 p-4 rounded-xl shadow-md container mx-auto`}>
            <div className="col-span-1">
                <Link to={link}><button className="btn btn-info"><FontAwesomeIcon icon={faArrowLeft} /></button></Link>
            </div>
            <div className={`col-span-4 text-center flex flex-col gap-1 font-bold text-${color}-800`}>
                <h1 className="text-xl">{mainTitle}</h1>
                <h1 className="text-base">{subTitle}</h1>
            </div>
            <div className="col-span-1"></div>
        </div>
    );
};

export default PageTile;