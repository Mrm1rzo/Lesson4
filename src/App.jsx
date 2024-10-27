import React from "react";
import { ProtectedRoutes } from "./components";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { MainLayout } from "./layouts";
import {
  About,
  Contact,
  DownloadedImages,
  Home,
  ImageInfo,
  LikedImages,
  Login,
  Register,
  User,
} from "./pages";
import { action as HomeAction } from "./pages/Home";

const App = () => {
  const user = true;
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        { index: true, element: <Home />, action: HomeAction },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/user", element: <User /> },
        { path: "/imageInfo/:id", element: <ImageInfo /> },
        { path: "/likedImage", element: <LikedImages /> },
        { path: "/downloadedImages", element: <DownloadedImages /> },
      ],
    },
    { path: "/login", element: user ? <Navigate to="/" /> : <Login /> },
    { path: "/register", element: user ? <Navigate to="/" /> : <Register /> },
  ]);
  return <RouterProvider router={routes} />;
};

export default App;
