import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const ProtectedRoute = ({ element: Component }) => {
  const token = localStorage.getItem("token");

  // if no token → redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    // Decode and verify expiry
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return <Navigate to="/" replace />;
    }

    return <Component />;
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
