import React, { ReactNode } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import localStorageServices from "../services/local-storage-service";
import tokenService from "../services/token-service";

const LoginAuthGuard = ({ children }) => {
  const token = localStorageServices.getToken();

  if (token) {
    const isExpired = tokenService.isAccessTokenExpired(token);
    if (!isExpired) {
      return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
};

export default LoginAuthGuard;
