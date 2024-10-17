import React from "react";
import HomeStreaming from "./screens/HomeStreaming";
import AdminLogin from "./screens/AdminLogin";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminDashboard from "./screens/AdminDashboard";
import NotFound from "./screens/NotFound";
import UserLoginRegister from "./screens/UserLoginRegister";

function App() {
  const router = createBrowserRouter([
    {
      path: '/streaming',
      element: <HomeStreaming />
    },
    {
      path: '/user/login',
      element: <UserLoginRegister />
    },
    {
      path: '/admin/login',
      element: <AdminLogin />
    },
    {
      path: '/admin/dashboard',
      element: <AdminDashboard />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;