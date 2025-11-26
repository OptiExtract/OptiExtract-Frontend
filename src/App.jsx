import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

// Pages
import LoginPage from "./pages/login_page";
import SignupPage from "./pages/signup";

export default function App() {
  return (
    <>
      {/* Global Toast Notifications */}
      <Toaster position="top-center" richColors closeButton />

      {/* App Routes */}
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={<div className="p-6 text-center text-lg">Page not found</div>}
        />
      </Routes>
    </>
  );
}
