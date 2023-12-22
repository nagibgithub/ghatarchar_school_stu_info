import { useState, useRef } from 'react';

const Example = () => {
    const [customOption, setCustomOption] = useState("");
    const customOptionInputRef = useRef(null);

    const handleCustomOptionFocus = () => {
        console.log("focus");
        // Select the content of the input when it receives focus
        customOptionInputRef.current.select();
    };

    return (
        <form >
            <label htmlFor={"option-1"} className="flex gap-2 cursor-pointer">
                <input className="radio checked:bg-sky-600" type="radio" name="chooseOption" id={"option-1"} value={"option-1"} />
                <h1 className="login-input-label capitalize">{"option-1"}</h1>
            </label>
            <label htmlFor={"option-2"} className="flex gap-2 cursor-pointer">
                <input className="radio checked:bg-sky-600" type="radio" name="chooseOption" id={"option-2"} value={"option-2"} />
                <h1 className="login-input-label capitalize">{"option-2"}</h1>
            </label>
            <label htmlFor="customOption" className="flex gap-2 cursor-pointer items-center">
                <input
                    ref={customOptionInputRef}
                    className="radio checked:bg-sky-600"
                    type="radio"
                    name="chooseOption"
                    id="customOption"
                    value={customOption}
                />
                <input
                    onChange={(e) => setCustomOption(e.target.value.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "))}
                    onFocus={handleCustomOptionFocus}
                    placeholder="Or type custom option"
                    className="login-input capitalize"
                    type="text"
                />
            </label>
            <div>
                <input className='btn btn-success' type="submit" value="Submit" />
            </div>
        </form>
    );
}

export default Example;
