import { useState } from "react";

const LoginPasswordInput = ({password,setPassword}) => {


    return ( 
        <div>
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
        </div>
     );
}
 
export default LoginPasswordInput;