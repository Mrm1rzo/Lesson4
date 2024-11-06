import React, { useEffect } from "react";
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
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
import { useGlobalContex } from "./hook/useGlobalContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { toast } from "react-toastify";

const App = () => {
  const abb = {};
  // console.log(eval("10*10-2"));


  const { user, dispatch, auth_ready } = useGlobalContex();
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
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      } else {
        // toast.warn("User already sign out");
      }
      dispatch({ type: "AUTH_READY" });
    });
  }, []);
  return <>{auth_ready && <RouterProvider router={routes} />}</>;
};

export default App;
