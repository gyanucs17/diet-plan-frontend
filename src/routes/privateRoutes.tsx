import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import Layout from "../Layout";
const HomeResident = lazy(
  () => import("../components/NursingHomeResident")
);
const Food = lazy(
  () => import("../components/Food")
);
const AssignFood = lazy(
  () => import("../components/AssignFood")
);

const Category = lazy(
  () => import("../components/Category")
);

export const privateRoutes = (): RouteObject[] => [{
  element: <Layout />,
  children: [
    { path: "/home/resident", element: <HomeResident /> },
    { path: "/home/food", element: <Food /> },
    { path: "/home/assign-food", element: <AssignFood /> },
    { path: "/home/category", element: <Category /> },
    { path: "*", element: <Navigate to="/home/resident" replace /> },
  ],
}];