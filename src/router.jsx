// /router.tsx
import React from 'react';

import { createBrowserRouter } from "react-router-dom";

// layout
import MainLayout from "./layouts/MainLayout";

// pages
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignInPage";
import SignUp from "./pages/Auth/SignUpPage";
import './App.css'


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);