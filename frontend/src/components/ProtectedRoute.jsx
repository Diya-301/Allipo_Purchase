import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.info("Please Login");
    return <Navigate to="/" replace />; // Redirect to the login page
  }

  return children;
};

export default ProtectedRoute;
