import { useState } from "react";

const PasswordInput = ({
    password,
    setPassword,
    isEmailInputFocused,
    handleInputBlur,
    handleInputFocus,
    isInputFocused,
    isCurrentInput,
    setStrength,
    strength
}) => {

    const [missingElements, setMissingElements] = useState([]);
    const [shouldShowDefaultContent, setShouldShowDefaultContent] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const checkPasswordStrength = newPassword => {
        if (newPassword.length < 3) {
            setStrength(0);
            setMissingElements(["at least 3 characters"]);
            setShouldShowDefaultContent(true);
            return;
        }
        const missing = [];

        if (!/[a-z]/.test(newPassword)) {
            missing.push("lowercase");
        }
        if (!/[A-Z]/.test(newPassword)) {
            missing.push("uppercase");
        }
        if (!/[!@#$%^&]/.test(newPassword)) {
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

    const handleChange = e => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    };

    const renderMissingElements = () => {
        if (missingElements.length && isCurrentInput === 4) {
            return <div className="point5"></div>;
        } else if (missingElements.length === 3 && isCurrentInput) {
            return <div className="point4"></div>;
        } else if (missingElements.length === 2 && isCurrentInput) {
            return <div className="point3"></div>;
        } else if (missingElements.length === 1 && isCurrentInput) {
            return <div className="point2"></div>;
        }
    };

    const inputClassName = isCurrentInput ? "password-input" : "passwordlogin-input";
    const containerClassName = isCurrentInput ? "password-container" : "passwordlogin-container";
    const inputContainer = isCurrentInput ? "password-input-container" : "email-input-container";

    return (
        <div>
            <div className={`${containerClassName} mt-3 ${isInputFocused ? "focused" : ""}`}>
                <label className={`label-register ${isEmailInputFocused ? "focused" : ""}`} htmlFor="password">
                    Password
                </label>
                <div className={inputContainer}>
                    <input
                        className={inputClassName}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handleChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                    {isCurrentInput && (
                        <i
                            className={`password-toggle-icon ${showPassword ? "show" : "password-toggle-icon2"}`}
                            onClick={() => setShowPassword(!showPassword)}
                        ></i>
                    )}

                    <div>
                        {isCurrentInput && shouldShowDefaultContent ? (
                            <div className="nopoint ms-2"></div>
                        ) : (
                            <div className="d-flex align-items-center">
                                <div className="d-flex align-items-center pe-2">{renderMissingElements()}</div>
                            </div>
                        )}
                        {shouldShowDefaultContent && password.length >= 3 && isCurrentInput ? (
                            <div className="point5 mb-2 me-1"></div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className={`password-strength level-${strength}`}></div>
            <div className="missing-elements ">
                {missingElements.length > 0 && isCurrentInput && (
                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center pe-2">{renderMissingElements()}</div>
                        <p className="m-0">Missing: {missingElements.join(", ")}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordInput;
