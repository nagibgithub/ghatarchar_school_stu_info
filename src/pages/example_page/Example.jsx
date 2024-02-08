import { faCamera, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Webcam from "react-webcam";

const Example = () => {

    const [imageSrc, setImageSrs] = useState(null);

    const webcamRef = React.useRef(null);
    const [facingMode, setFacingMode] = useState('user');
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrs(imageSrc);
    };

    const switchCamera = () => {
        setFacingMode((prevFacingMode) =>
            prevFacingMode === 'user' ? 'environment' : 'user'
        );
    };

    const videoConstraints = {
        facingMode: facingMode,
    };

    return (
        <div>
            <Webcam audio={false} ref={webcamRef} videoConstraints={videoConstraints}></Webcam>
            <div className="flex gap-2 justify-center items-center my-2">
                <button className="btn btn-circle btn-info shadow-md shadow-sky-700" onClick={capture}><FontAwesomeIcon icon={faCamera} /></button>
                <button className="btn btn-circle btn-info shadow-md shadow-sky-700" onClick={switchCamera}><FontAwesomeIcon icon={faRotate} /></button>
            </div>
            <div>
                <img src={imageSrc} alt="" />
            </div>
        </div>
    );

};

export default Example;