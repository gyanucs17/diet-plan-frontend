import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import * as AuthService from "./services/auth.service";
import {privateRoutes} from "./routes/privateRoutes";
import {publicRoutes} from "./routes/publicRoutes";

const App: React.FC = () => {
  const user = AuthService.isAuthenticated();
  const routes = user ? privateRoutes() : publicRoutes();

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default App;
