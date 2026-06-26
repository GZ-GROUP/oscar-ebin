// /router.tsx
import React from 'react';

import { createBrowserRouter } from "react-router-dom";


// layout
import ScrollToTop from "./components/ScrollToTop";
import MainLayout from "./layouts/MainLayout";

// pages
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignInPage";
import SignUp from "./pages/Auth/SignUpPage";
import AboutUs from './pages/AboutUs';
import Shop from './pages/Shop/Shop';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Panel from './pages/Panel';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'


export const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollToTop />
        <MainLayout />
      </>
    ),
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
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "panel",
        element: <Panel />,
      },
    ],
  },
]);