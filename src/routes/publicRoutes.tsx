import { Navigate, RouteObject } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Layout from "../Layout";



export const publicRoutes = (): RouteObject[] => [{
  element: <Layout />,
  children: [
    { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <Navigate to="/login" replace /> },
  ],
}];

