import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";


import HomePage from "./pages/home";
import LoginPage from "./pages/login_page";
import SignupPage from "./pages/signup";

import ForgotPasswordPage from "./pages/ForgotPassword";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import ResetPasswordPage from "./pages/ResetPassword";


import DashboardLayout from "./layouts/DashboardLayout";


import DashboardHome from "./pages/dashboard/DashboardHome";
import UploadPage from "./pages/dashboard/UploadPage";
import AddTypePage from "./pages/dashboard/AddTypePage";
import DocumentsPage from "./pages/dashboard/DocumentsPage";
import InsightsPage from "./pages/dashboard/Insightspage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import ReviewDashboard from "./pages/dashboard/ReviewDashboard";

const App: React.FC = () => {
  return (
    <>
      <Toaster position="top-center" richColors closeButton />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />

        {/* FORGOT / OTP / RESET */}
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

        {/* DASHBOARD ROUTES */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="add-type" element={<AddTypePage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="review" element={<ReviewDashboard />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </>
  );
};

export default App;
