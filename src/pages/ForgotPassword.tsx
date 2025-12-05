// src/pages/auth/ForgotPasswordPage.jsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/v1/auth/password/reset", { email });

      toast.success("Reset email sent! Check your inbox.");

      window.location.href = `/auth/verify-otp?email=${email}`;
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email to receive a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#A855F7] text-white rounded-lg hover:bg-[#9333EA]"
          >
            Send Reset Email
          </button>
        </form>
      </div>
    </div>
  );
}
