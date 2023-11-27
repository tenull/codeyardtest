import { useState } from "react";
import RememberMe from "./RememberMe";
import RegisterEmailInput from "./RegisterEmailInput";
import RegisterPasswordInput from "./RegisterPasswordInput";
const Register = () => {


    const [password, setPassword] = useState('');
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [email, setEmail] = useState("");
    const [strength, setStrength] = useState(0);
    const [isRegistered, setIsRegistered] = useState(false);

    const handleRegistration = () => {
        setIsRegistered(true);
    };

    return (
        <div className="">
            <div className="mt-5 p-5 bg-white    col-lg-10 border rounded shadow">
                <h1>Welcome to Acme.</h1>
                <h6>Create your account by filling the form bellow.</h6>
                {!isRegistered ? (
                    <form >
                        <RegisterEmailInput
                            email={email}
                            setEmail={setEmail}
                            emailIsInvalid={emailIsInvalid}
                            setEmailIsInvalid={setEmailIsInvalid}
                        />
                        <RegisterPasswordInput
                            password={password}
                            setPassword={setPassword}
                            strength={strength}
                            setStrength={setStrength}
                        />
                        <RememberMe />
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
