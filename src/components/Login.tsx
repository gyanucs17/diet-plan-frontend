import React, { useState } from "react";
import { LoginPageState } from './../types/login';
import { login } from "../services/auth.service";
import LoginForm from "./forms/LoginForm";
import { handleApiError } from "../common/ApiResponseHandler";


const Login: React.FC = () => {
  
  const [state, setState] = useState<LoginPageState>({
    username: '',
    password: '',
    loading: false,
  });

  const [message, setMessage] = useState<string>('');
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, username: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, password: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    login(state.username, state.password).then((response) => {
        console.log(response);
        if (response.status === 200 && response.data.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          window.location.reload()
          return response.data;
        }
        else{
          setMessage("Invalid credential!!");
        }
        setState({ username: '', password: '', loading: false });
      },
      (error) => {
          handleApiError(error, 'Unable to login.', setMessage);
          setState({ ...state, loading: false });
      }
    );
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <LoginForm
        username={state.username}
        password={state.password}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onSubmit={handleSubmit}
        errorMessage={message}
        loading={state.loading}
      />
      </div>
    </div>
  );
};

export default Login;