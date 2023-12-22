import { useState } from "react";

const InputCheckBox = () => {

    const [selectedClasses, setSelectedClasses] = useState([]);

    const handleCheckboxChange = (event) => {
        const checkboxValue = event.target.value;

        // Check if the checkbox is checked or unchecked
        if (event.target.checked) {
            // If checked, add the value to the selectedClasses array
            setSelectedClasses(prevSelectedClasses => [...prevSelectedClasses, checkboxValue]);
        } else {
            // If unchecked, remove the value from the selectedClasses array
            setSelectedClasses(prevSelectedClasses => prevSelectedClasses.filter(value => value !== checkboxValue));
        }
    };

    return (
        <div>
            <label htmlFor="17">17</label>
            <input value="17" type="checkbox" name="classSelected" id="17" onChange={handleCheckboxChange} checked={selectedClasses.includes('17')} />

            <label htmlFor="18">18</label>
            <input value="18" type="checkbox" name="classSelected" id="18" onChange={handleCheckboxChange} checked={selectedClasses.includes('18')} />

            <label htmlFor="19">19</label>
            <input value="19" type="checkbox" name="classSelected" id="19" onChange={handleCheckboxChange} checked={selectedClasses.includes('19')} />

            {/* You can display or use the selectedClasses array as needed */}
            <p>Selected Classes: {selectedClasses.join(', ')}</p>
        </div>
    );
}











export default InputCheckBox;