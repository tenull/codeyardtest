import { useState } from "react";

const Register = () => {


    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isInputFocused, setInputFocused] = useState(false);
    const [isEmailInputFocused, setEmailInputFocused] = useState(false);
    const [strength, setStrength] = useState(0);
    const [missingElements, setMissingElements] = useState([]);
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [email, setEmail] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [shouldShowDefaultContent, setShouldShowDefaultContent] = useState(true);


    const emailRegex = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    const validateEmail = () => {
        if (!emailRegex.test(email)) {
            setEmailIsInvalid(true);
        } else {
            setEmailIsInvalid(false);
        }
    }

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


    const handleRegistration = () => {
        setIsRegistered(true);
    };



    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };

    const handleInputFocus2 = () => {
        setEmailInputFocused(true);
    };

    const handleInputBlur2 = () => {
        setEmailInputFocused(false);
    };

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
    };


    return (
        <div className="">
            <div className="mt-5 p-5 bg-white    col-lg-10 border rounded shadow">
                <h1>Welcome to Acme.</h1>
                <h6>Create your account by filling the form bellow.</h6>
                {!isRegistered ? (
                    <form >
                        <div className={`email-container mt-5 ${isEmailInputFocused ? 'focused' : ''}`}>
                            <label htmlFor="email">Email</label>
                            <div className="email-input-container">
                                <input
                                    className="email-input "
                                    type="email"
                                    onFocus={handleInputFocus2}
                                    onBlur={() => {
                                        handleInputBlur2();

                                    }}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        validateEmail();
                                    }}
                                />
                            </div>
                        </div>
                        {emailIsInvalid && (
                            <div className="d-flex align-items-center ">
                                <div className="point4 me-2 "></div>
                                <p className="error-message text-danger m-0 ">Invalid e-mail format</p>
                            </div>
                        )}
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
                        <div className="d-flex align-items-center mt-3">
                            <input
                                type="checkbox"
                                name="rememberMeCheckbox"
                                id="rememberMeCheckbox"
                                checked={rememberMe}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="rememberMeCheckbox" className="m-0 ms-3">
                                Remember me.
                            </label>
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                            <button
                                className="btn button-register pt-1 pb-1 ps-4 pe-4"
                                disabled={emailIsInvalid || strength !== 3}
                                onClick={handleRegistration}
                            >
                                Sign up
                            </button>
                        </div>
                    </form>) : (

                    <div className="mt-5 mb-5 success-message d-flex justify-content-center">
                        Registration is successful!
                    </div>
                )}
            </div>
            <div className="mt-5 d-flex">
                <p className="me-3">©2015 Acme, Inc.</p>
                <div className="d-flex align-items-center">
                    <div>
                        <p className="terms-text">Terms Privacy </p>
                    </div>
                    <div className="d-flex">
                        <div className="point2 mb-3 ms-1 me-1"></div>
                        <div className="point2 me-1"></div>
                        <div className="point2"></div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Register;
