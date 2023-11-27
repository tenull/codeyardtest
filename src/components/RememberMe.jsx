import { useState } from "react";


const RememberMe = () => {
    const [rememberMe, setRememberMe] = useState(false);

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
    };

    return ( 
        <div className="d-flex align-items-center mt-3">
        <input
        style={{cursor:'pointer'}}
            type="checkbox"
            name="rememberMeCheckbox"
            id="rememberMeCheckbox"
            checked={rememberMe}
            onChange={handleCheckboxChange}
        />
        <label style={{cursor:'pointer'}} htmlFor="rememberMeCheckbox" className="m-0 ms-3">
            Remember me.
        </label>
    </div>

     );
}
 
export default RememberMe;