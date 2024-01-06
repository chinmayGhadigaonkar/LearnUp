import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isAuthenticate }) => {
  if (!isAuthenticate) {
    return <Navigate to={"/sign-in"} />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
