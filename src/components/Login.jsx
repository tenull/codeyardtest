import { useState } from "react";


const Login = () => {

    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginClicked, setIsLoginClicked] = useState(false);
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [email, setEmail] = useState("");
    const [isEmailInputFocused, setEmailInputFocused] = useState(false);

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

    const handleLoginClick = () => {
        setIsLoginClicked(true);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null);

        const endpoint = "https://us-central1-ria-server-b1103.cloudfunctions.net/authenticate";

        const requestData = {
            method: "POST",
            headers: {
                "Accept-Encoding": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    email: email,
                    password: password,
                },
            }),
        };

        fetch(endpoint, requestData)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setResponseData(data);
            })
            .catch((error) => {
                setError(error.message);
                console.error("Error:", error);
            });
    };
    const handleInputFocus2 = () => {
        setEmailInputFocused(true);
    };

    const handleInputBlur2 = () => {
        setEmailInputFocused(false);
    };


    return (
        <div className="bg-success p-5 text-white">
            <form onSubmit={handleLogin}>
                <div className="ps-5 pe-5">
                    <img className="mb-4" src="../acme.png" alt="" />
                    <h2>Do you already have an account?</h2>

                    <h4>That's awesome! You can login by clicking on the button below. To skip this next time, you can aks us to remember your login credentials.</h4>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {responseData && <p className="fs-3 text-warning">{responseData.result.error}</p>}
                    {responseData && responseData.result && responseData.result.name ? (
                        <p className="fs-2 pt-3 pb-5 text-white">Welcome, {responseData.result.name}!</p>
                    ) : (
                        isLoginClicked ? (
                            <div className="border rounded ps-5 pt-3 pb-3 pe-5">
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
                                <div className="passwordlogin-container mt-2 col-lg-12">
                                    <label>Password </label>
                                    <div className="passwordlogin-input-container">
                                        <input
                                            className="passwordlogin-input"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <button
                                        style={{ fontSize: '14px', color: '#FFFFFF' }}
                                        className="mt-3 btn ps-4 pe-4 pt-2 pb-2 border-white text-white" onClick={handleLogin}
                                        disabled={emailIsInvalid}
                                        type="submit"
                                    >Login</button>

                                </div>
                            </div>
                        ) : (
                            <button style={{ fontSize: '14px', color: '#FFFFFF' }} className=" mt-3 mb-5 btn ps-4 pe-4 pt-2 pb-2 border-white text-white" onClick={handleLoginClick}>Login</button>
                        )
                    )}
                </div>
            </form>
        </div>
    );
}

export default Login;