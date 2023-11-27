import React from 'react';
import { useState } from 'react';

const RegisterPasswordInput = ({ password, setPassword, isEmailInputFocused,strength,setStrength }) => {


    const [missingElements, setMissingElements] = useState([]);
    const [shouldShowDefaultContent, setShouldShowDefaultContent] = useState(true);
    const [isInputFocused, setInputFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);



    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };




    const checkPasswordStrength = (password) => {

        if (password.length < 3) {
            setStrength(0);
            setMissingElements(["at least 3 characters"]);
            setShouldShowDefaultContent(true);
            return;
        }
        const missing = [];

        if (!/[a-z]/.test(password)) {
            missing.push("lowercase");
        }
        if (!/[A-Z]/.test(password)) {
            missing.push("uppercase");
        }
        if (!/[!@#$%^&]/.test(password)) {
            missing.push("special character");
        }
        if (missing.length === 0) {
            setStrength(3);
            setMissingElements([]);
            setShouldShowDefaultContent(true);
        } else if (missing.length > 0) {
            setStrength(2);
            setMissingElements(missing);
            setShouldShowDefaultContent(false);
        }
    };

    const handleChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    };
    const renderMissingElements = () => {
        if (missingElements.length === 4) {
            return <div className="point5"></div>;
        } else if (missingElements.length === 3) {
            return (
                <>
                    <div className="point4"></div>
                </>
            );
        } else if (missingElements.length === 2) {
            return (
                <>
                    <div className="point3"></div>
                </>
            );
        } else if (missingElements.length === 1) {
            return (
                <>
                    <div className="point2"></div>
                </>
            );
        }

    };



    return (
        <div>
            <div className={`password-container mt-3 ${isInputFocused ? 'focused' : ''}`}>
                <label className={`label-register ${isEmailInputFocused ? 'focused' : ''}`} htmlFor="password">Password</label>
                <div className="password-input-container">
                    <input
                        className="password-input"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handleChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                    <i
                        className={`password-toggle-icon ${showPassword ? "show" : "password-toggle-icon2"}`}
                        onClick={() => setShowPassword(!showPassword)}
                    ></i>
                    <div>
                        {shouldShowDefaultContent ? (
                            <div className="nopoint ms-2"></div>
                        ) : (
                            <div className="d-flex align-items-center">
                                <div className="d-flex align-items-center pe-2">
                                    {renderMissingElements()}
                                </div>
                            </div>
                        )}
                        {shouldShowDefaultContent && password.length >= 3 ? (
                            <div className="point5 mb-2 me-1"></div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className={`password-strength level-${strength}`}></div>
            <div className="missing-elements ">
                {missingElements.length > 0 && (
                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center pe-2">{renderMissingElements()}</div>
                        <p className="m-0">Missing: {missingElements.join(", ")}</p>
                    </div>
                )}
            </div>
        </div>
    )

};

export default RegisterPasswordInput;