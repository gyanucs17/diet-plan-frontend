import React from "react";
import { LoginFormProps } from './../../types/login';


const LoginForm: React.FC<LoginFormProps> = ({ username, password, onEmailChange, onPasswordChange, onSubmit, errorMessage, loading }) => {
    const loginButtontext = loading ? 'Loading...' : 'Login';
    return(
        <>

            <form onSubmit={onSubmit}>
                <div className="form-input">
                    <label>Username</label>
                    <input type="text" value={username} onChange={onEmailChange} required />
                </div>
                <div className="form-input">
                    <label>Password</label>
                    <input type="password" value={password} onChange={onPasswordChange} required />
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button type="submit" disabled={loading}>
                    {loginButtontext}
                </button>
            </form>
        </>
    )
};

export default LoginForm