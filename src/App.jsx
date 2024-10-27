import React from "react";
import { Footer, Navbar } from "./components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts";
import {
  About,
  Contact,
  DownloadedImages,
  Home,
  ImageInfo,
  LikedImages,
  User,
} from "./pages";
import { action as HomeAction } from "./pages/Home";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
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
  ]);
  return <RouterProvider router={routes} />;
};

export default App;
