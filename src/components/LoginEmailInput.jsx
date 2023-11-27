import { useState } from "react";


const LoginEmailInput = ({email,setEmail }) => {

    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [isEmailInputFocused, setEmailInputFocused] = useState(false);


    const handleInputFocus2 = () => {
        setEmailInputFocused(true);
    };

    const handleInputBlur2 = () => {
        setEmailInputFocused(false);
    };

    const emailRegex = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );


    const isValid = () => {
        if (!emailRegex.test(email)) {
            setEmailIsInvalid(true);
        } else {
            setEmailIsInvalid(false);
        }
    }





    return (


        <div>
            <div className="login-email-container col-lg-12">
                <label>Email </label>
                <div className="email-input-container">
                    <input
                        className="login-email-input "
                        type="email"
                        onFocus={handleInputFocus2}
                        onBlur={() => {
                            handleInputBlur2();
                            isValid();
                        }}
                        value={email}
                        onChange={
                            (e) => {
                                setEmail(e.target.value)
                                isValid();
                            }}
                    />
                </div>
                {emailIsInvalid && (
                    <div className="d-flex align-items-center ">
                        <div className="point4 me-2 "></div>
                        <p className="error-message text-danger m-0 ">Invalid e-mail format</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginEmailInput;