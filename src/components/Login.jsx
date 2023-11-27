import { useState } from "react";
import LoginPasswordInput from "./LoginPasswordInput";
import LoginEmailInput from "./LoginEmailInput";


const Login = () => {

    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginClicked, setIsLoginClicked] = useState(false);
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [email, setEmail] = useState("");


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

    return (
        <div className="p-5 text-white" >
            <form onSubmit={handleLogin}>
                <div className="login-container">
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
  
                            <LoginEmailInput
                            email={email}
                            setEmail={setEmail}
                            />
                              <LoginPasswordInput
                              password={password}
                              setPassword={setPassword}
                              />
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