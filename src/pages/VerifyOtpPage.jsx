import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";
import api from "@/lib/api";
import { toast } from "sonner";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [params] = useSearchParams();
  const email = params.get("email");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/v1/auth/email/verify", { email, otp });

      toast.success("OTP verified!");

      // Redirect to reset password WITH token coming later from email
      window.location.href = `/auth/reset-password?email=${email}`;
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold text-center mb-4">Verify OTP</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the OTP sent to <b>{email}</b>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <Input
            type="text"
            maxLength="6"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#A855F7] text-white rounded-lg hover:bg-[#9333EA]"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
