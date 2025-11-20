import React from "react";
import SignupForm from "../components/signup-form";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-light font-lexend">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-2xl">
        
        {/* Logo + Brand Name */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <img
              src="/optiextract-logo.png"
              alt="logo"
              className="h-14 object-contain"
            />
  
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Create an account
        </h2>

        <p className="text-sm text-gray-500 mt-1 mb-6 text-center">
          Enter your information below to create your account.
        </p>

        <SignupForm />
      </div>
    </div>
  );
}
