import React, { ReactNode, useState } from "react";
import { Navigate } from "react-router";
import localStorageServices from "../services/local-storage-service";
import tokenService from "../services/token-service";
import { Box, CircularProgress } from "@mui/material";

const AuthGuard = ({ children }) => {
  const token = localStorageServices.getToken();
  const isExpired = tokenService.isAccessTokenExpired(token);

  if (token && !isExpired) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthGuard;
