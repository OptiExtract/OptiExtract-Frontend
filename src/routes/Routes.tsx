import React from "react";
import { Routes, Route } from "react-router-dom";

// Public pages
import LoginPage from "@/pages/auth/Login";
// import RegisterPage from "@/pages/auth/SignUp";

export default function AppRoutes(): React.ReactElement {
  return (
    <Routes>
      {/* Public Authentication Routes */}
      <Route path="/auth/login" element={<LoginPage />} />
      {/* <Route path="/auth/register" element={<RegisterPage />} /> */}

      {/* Protected Routes */}
    </Routes>
  );
}
