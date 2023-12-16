import App from "@/App";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import LoginPage from "@/pages/LoginPage/LoginPage";
import RegisterPage from "@/pages/RegisterPage/RegisterPage";
import TileGrid from "@/components/tile/tileGrid";
import Dashboard from "@/pages/Dashboard/Dashboard";
import AddNewHome from "@/pages/AddNewHome/AddNewHome";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [ 
          // { path: "/dashboard", element: <Dashboard /> },
          // { path: "/home-grid", element: <TileGrid /> },
        ],
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/home-grid", element: <TileGrid /> },
      { path: "/home-add", element: <AddNewHome /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
