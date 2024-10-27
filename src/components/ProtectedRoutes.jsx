import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, user }) => {
  if (user) {
    return children;
  } else {
    return <Navigate to="/register" />;
  }
};

export default ProtectedRoutes;
