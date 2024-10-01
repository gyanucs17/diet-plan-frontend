import React, { useState } from "react";
import { register } from "../services/auth.service";
import { handleApiError } from "../common/ApiResponseHandler";
import { useNavigate } from 'react-router-dom';

interface IUser {
  id?: any | null;
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<IUser>({
    username: "",
    email: "",
    password: "",
  });
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const { username, email, password } = formData;
    if (username.length < 3 || username.length > 20) {
      return "The username must be between 3 and 20 characters.";
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "This is not a valid email.";
    }
    if (password.length < 6 || password.length > 40) {
      return "The password must be between 6 and 40 characters.";
    }
    return null;
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setMessage(error);
      setSuccessful(false);
      return;
    }

    const { username, email, password } = formData;
    register(username, email, password).then(
      (response) => {
        if(response.data.status === 'success'){
          setMessage("User register successfully.");
          setSuccessful(true);
          navigate('/login');
        } else {
          setMessage("User register failed.");
          setSuccessful(false);
        }
        
      },
      (error) => {
        handleApiError(error, 'Unable to Register.', setMessage);
        setSuccessful(false);
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
        <form onSubmit={handleRegister}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username"> Username </label>
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email"> Email </label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password"> Password </label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
