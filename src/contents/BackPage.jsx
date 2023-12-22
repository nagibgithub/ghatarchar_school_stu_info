import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BackPage = () => {

    return (
        <div className="flex items-center">
            <button onClick={() => history.back()} className="btn btn-info"><FontAwesomeIcon icon={faArrowLeft} /></button>
        </div>
    );
};

export default BackPage;