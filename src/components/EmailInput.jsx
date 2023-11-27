import React from 'react';
import { useState,useEffect } from 'react';

const EmailInput = ({ email,
  setEmail,
  emailIsInvalid,
  setEmailIsInvalid,
isEmailInputFocused,
handleInputBlur2,
handleInputFocus2 }) => {



    const emailRegex = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/
      );
      

const [validationInProgress, setValidationInProgress] = useState(false);

const validateEmail = () => {
  if (!emailRegex.test(email)) {

    setEmailIsInvalid(true);
  } else {
    setEmailIsInvalid(false);
  }
};



useEffect(() => {
  if (validationInProgress) {
    if (!emailRegex.test(email)) {
      setEmailIsInvalid(true);
    } else {
      setEmailIsInvalid(false);
    }
    setValidationInProgress(false);
  }
}, [email, emailRegex, validationInProgress, setEmailIsInvalid]);



    return (
        <div>
        <div className={`email-container mt-5 ${isEmailInputFocused ? 'focused' : ''}`}>
        <label htmlFor="email">Email</label>
        <div className="email-input-container">
            <input
                className="email-input "
                type="email"
                onFocus={handleInputFocus2}
                onBlur={handleInputBlur2 ? () => handleInputBlur2() : undefined}
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
    
    </div>
    )

};

export default EmailInput;