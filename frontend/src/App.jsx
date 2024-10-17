import React from "react";
import HomeStreaming from "./screens/HomeStreaming";
import AdminLogin from "./screens/AdminLogin";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminDashboard from "./screens/AdminDashboard";
import NotFound from "./screens/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: '/streaming',
      element: <HomeStreaming />
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