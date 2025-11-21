import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../components/signup-form";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-light font-lexend">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/optiextract-logo.png"
            alt="optiextract Logo"
            className="h-16 object-contain"
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center">Create an account</h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Enter your information below to create your account.
        </p>

        {/* Form */}
        <SignupForm />

        {/* Login redirect */}
        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-[#A855F7] hover:underline">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}
