import App from "@/App";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import LoginPage from "@/pages/LoginPage/LoginPage";
import RegisterPage from "@/pages/RegisterPage/RegisterPage";
import HomePage from "@/pages/HomePage/HomePage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { element: <RequireAuth />, children: [
        { path: "/nesto", element: <HomePage /> },
      ] },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
