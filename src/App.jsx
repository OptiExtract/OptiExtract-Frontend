import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

// Public pages
import HomePage from "./pages/home";
import LoginPage from "./pages/login_page";
import SignupPage from "./pages/signup";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import ResetPassword from "./pages/ResetPassword";


// Dashboard layout
import DashboardLayout from "./layouts/DashboardLayout";

// Dashboard pages
import DashboardHome from "./pages/dashboard/DashboardHome";
import UploadPage from "./pages/dashboard/UploadPage";
import AddTypePage from "./pages/dashboard/AddTypePage";
import DocumentsPage from "./pages/dashboard/DocumentsPage";
import InsightsPage from "./pages/dashboard/InsightsPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import ReviewDashboard from "./pages/dashboard/ReviewDashboard";

export default function App() {
  return (
    <>
      {/* Global toast notifications */}
      <Toaster position="top-center" richColors closeButton />

      <Routes>

        {/* 🔥 Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Optional Home Page */}
        <Route path="/home" element={<HomePage />} />

        {/* Auth routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />


        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="add-type" element={<AddTypePage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="review/:documentId" element={<ReviewDashboard />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </>
  );
}
