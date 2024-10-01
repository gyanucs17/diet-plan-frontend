import { Link, Outlet, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import * as AuthService from "./services/auth.service";
import IUser from "./types/type";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Suspense fallback={"loading..."}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}

function Header() {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      let userStr = JSON.parse(user);
      setCurrentUser(userStr)
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Food App
        </Link>
        {currentUser && (
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home/resident"} className="nav-link">
                Nursing Home Resident
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/home/food"} className="nav-link">
                Food
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/home/assign-food"} className="nav-link">
                Assign Food
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/home/category"} className="nav-link">
                Category
              </Link>
            </li>
          </div>
        )}
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
    </>
  );
}

