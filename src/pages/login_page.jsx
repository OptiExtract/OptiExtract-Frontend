import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-light">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-2xl font-lexend">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
              src="/optiextract-logo.png"
              alt="logo"
              className="h-14 object-contain"/>

        </div>

        {/* Email + Password fields */}
        <LoginForm />

        {/* Forgot Password */}
        <div className="flex justify-end mt-2 mb-4">
          <Link to="/auth/forgot-password" className="text-sm text-gray-600 hover:underline">
            Forgot Password ?
          </Link>
        </div>

        {/* Sign In Button */}
        <button className="w-full py-2 bg-[#A855F7] text-white rounded-lg hover:bg-[#9333EA] transition-all">
          Sign in
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="px-3 text-xs text-gray-500">
            DON'T HAVE AN ACCOUNT?
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Create Account */}
        <Link
          to="/auth/signup"
          className="block w-full text-center py-2 border border-[#A855F7] text-[#A855F7] rounded-lg hover:bg-purple-50 transition-all"
        >
          Create An Account
        </Link>

      </div>
    </div>
  );
}
