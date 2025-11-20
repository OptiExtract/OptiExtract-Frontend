import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/login_page";
import SignupPage from "./pages/signup";

export default function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<div className="p-6">Page not found</div>} />
    </Routes>
  );
}
