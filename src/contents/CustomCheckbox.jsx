import { useState } from "react";

const CustomCheckbox = () => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked((prev) => !prev);
    };

    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="hidden" checked={isChecked} onChange={toggleCheckbox} />
            <div className="w-6 h-6 border border-gray-500 rounded bg-white flex items-center justify-center">
                {isChecked && (<svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>)}
            </div>
            <span>Custom Checkbox</span>
        </label>
    );
};

export default CustomCheckbox;
